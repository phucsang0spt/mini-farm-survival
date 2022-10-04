import { Saver } from "react-simple-game-engine/lib";
import { Chicken, ChickenPrefab } from "./chicken.entity";
import { Point } from "react-simple-game-engine/lib/export-types";
import { genId } from "utils";
import { Generator } from "./generator.entity";

type Props = {
  breadPlaceOffsets: (0 | 1)[];
};

type ChickenStorageItem = {
  name: string;
  index: number;
};

export class ChickenGenerator extends Generator<Props> {
  private chickens: Chicken[] = [];
  private chickenPlaceOffsets: (Point & { width: number; height: number })[] =
    [];

  isOverloadChickenPlace(commingQty: number) {
    const chickenStorage = Saver.getWithDefault(
      "chicken-storage",
      []
    ) as ChickenStorageItem[];
    return chickenStorage.length + commingQty > this.chickenPlaceOffsets.length;
  }

  private addChicken(name: string, index: number) {
    const offset = this.chickenPlaceOffsets[index];
    const chicken = this.scene.getPrefab(ChickenPrefab).output({
      name,
      transform: {
        ...offset,
      },
    });
    this.chickens.push(chicken);
    this.addChild(chicken);
    return name;
  }

  removeChicken(name: string) {
    const chickenStorage = Saver.get("chicken-storage") as ChickenStorageItem[];
    Saver.remove(`chicken::${name}-born-time`);
    Saver.set(
      "chicken-storage",
      chickenStorage.filter((chick) => chick.name !== name)
    );
    const chick = this.chickens.find((c) => c.name === name);
    if (chick) {
      this.removeChild(chick);
    }
  }

  private restoreExistChickens() {
    let chickenStorage = Saver.get("chicken-storage") as ChickenStorageItem[];
    if (!chickenStorage) {
      // bố thí
      const firstChicken = {
        name: genId(),
        index: 0,
      };
      Saver.set(
        `chicken::${firstChicken.name}-born-time`,
        new Date().getTime() - 4 * 60 * 1000
      );
      chickenStorage = [firstChicken];
      Saver.set("chicken-storage", chickenStorage);
    }
    for (const { name, index } of chickenStorage) {
      this.addChicken(name, index);
    }
  }

  addChickens(qty: number) {
    const chickenStorage = Saver.getWithDefault(
      "chicken-storage",
      []
    ) as ChickenStorageItem[];
    Array.from({ length: qty }).forEach(() => {
      const name = genId();
      const index = this.chickens.length;
      this.addChicken(name, index);
      chickenStorage.push({ name, index });
    });
    Saver.set("chicken-storage", chickenStorage);
  }

  onBootstrapCompleted() {
    super.onBootstrapCompleted();
    const { breadPlaceOffsets } = this.props;

    this.chickenPlaceOffsets = this.generate2DOffset(breadPlaceOffsets);
    this.restoreExistChickens();
  }
}
