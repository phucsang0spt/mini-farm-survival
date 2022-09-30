import { Prefab, RectEntity, Saver } from "react-simple-game-engine/lib";
import { InvisibleWallPrefab } from "./invisible-wall.entity";
import { Background } from "./background.entity";
import { Chicken, ChickenPrefab } from "./chicken.entity";
import {
  EntityPrepare,
  Point,
} from "react-simple-game-engine/lib/export-types";
import { genId } from "utils";

type Props = {
  boundaryOffsets: (0 | 1)[];
  breadPlaceOffsets: (0 | 1)[];
};

const MAP_TILED_SIZE = {
  width: 100,
  height: 70,
};

const TILE_SIZE = 32;

export class Generator extends RectEntity<Props> {
  private chickens: Chicken[] = [];
  private chickenPlaceOffsets: (Point & { width: number; height: number })[] =
    [];

  protected onPrepare(): EntityPrepare<this> {
    return {
      enabledPhysicBody: false,
    };
  }

  private generate2DOffset(
    tileOffsets: number[],
    pivot: { x: number; y: number }
  ) {
    const offsets: {
      x: number;
      y: number;
      width: number;
      height: number;
    }[] = [];

    let rowIndex = 0;
    for (let i = 0; i < tileOffsets.length; i += MAP_TILED_SIZE.width) {
      const columns = tileOffsets.slice(i, MAP_TILED_SIZE.width + i);

      for (let j = 0; j < columns.length; j++) {
        const value = columns[j];
        if (value) {
          const mapX = TILE_SIZE * j;
          const mapY = TILE_SIZE * rowIndex;

          const canvasX = mapX + TILE_SIZE / 2 - pivot.x;
          const canvasY = mapY + TILE_SIZE / 2 - pivot.y;

          offsets.push({
            x: canvasX,
            y: canvasY,
            width: TILE_SIZE,
            height: TILE_SIZE,
          });
        }
      }
      rowIndex++;
    }

    return offsets;
  }

  private generateTile<E extends RectEntity<any>>(
    prefabClass: { new (...args: any[]): Prefab<E> },
    tileOffsets: number[],
    pivot: { x: number; y: number }
  ) {
    for (const offset of this.generate2DOffset(tileOffsets, pivot)) {
      const wall = this.scene.getPrefab(prefabClass).output({
        transform: {
          x: offset.x,
          y: offset.y,
          width: offset.width,
          height: offset.height,
        },
      });
      this.addChild(wall);
    }
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

  private restoreExistChickens() {
    const chickenStorage = Saver.getWithDefault("chicken-storage", []) as {
      name: string;
      index: number;
    }[];
    for (const { name, index } of chickenStorage) {
      this.addChicken(name, index);
    }
  }

  addChickens(qty: number) {
    const chickenStorage = Saver.getWithDefault("chicken-storage", []) as {
      name: string;
      index: number;
    }[];
    Array.from({ length: qty }).forEach(() => {
      const name = genId();
      const index = this.chickens.length;
      this.addChicken(name, index);
      chickenStorage.push({ name, index });
    });
    Saver.set("chicken-storage", chickenStorage);
  }

  onBootstrapCompleted() {
    const background = this.worldManagement.getEntity(Background);
    const { boundaryOffsets, breadPlaceOffsets } = this.props;

    const pivot = {
      x: background.sprite.width / 2,
      y: background.sprite.height / 2,
    };

    this.generateTile(InvisibleWallPrefab, boundaryOffsets, pivot);

    this.chickenPlaceOffsets = this.generate2DOffset(breadPlaceOffsets, pivot);
    this.restoreExistChickens();

    // (window as any).test = this.addChickens.bind(this);
  }
}
