import { Saver } from "react-simple-game-engine/lib";
import { Avatar, Point } from "react-simple-game-engine/lib/export-types";
import { Generator } from "./generator.entity";
import { ItemPrefab } from "./item.entity";

type Props = {
  coinSprite: Avatar;
  woodSprite: {
    x6: Avatar;
    x9: Avatar;
  };
};

export class ItemGeneratorEntity extends Generator<Props> {
  private generateDailyCoin() {
    const dailyCoin = Saver.getWithDefault("daily-coin", {}) as {
      lastDateUnix?: number;
      name: string;
    };
    const currentDate = Math.floor(new Date().getTime() / 1000 / 60 / 60 / 24); // date unix
    if (!dailyCoin.lastDateUnix || currentDate > dailyCoin.lastDateUnix) {
      const entity = this.scene.getPrefab(ItemPrefab).output({
        props: {
          code: "coin",
          sprite: this.props.coinSprite,
          highlight: true,
        },
        transform: {
          x: 323,
          y: -928,
        },
      });

      // listen when the coin got picked
      entity.onTerminate = () => {
        const currentDate = Math.floor(
          new Date().getTime() / 1000 / 60 / 60 / 24
        ); // date unix
        const dailyCoin = Saver.getWithDefault("daily-coin", {}) as {
          lastDateUnix?: number;
          name: string;
        };
        Saver.set("daily-coin", { ...dailyCoin, lastDateUnix: currentDate });
      };
      this.addChild(entity);

      dailyCoin.name = entity.name;

      Saver.set("daily-coin", dailyCoin);
    }
  }

  generateWood(size: "x6" | "x9", position: Point) {
    this.worldManagement.addEntity(
      this.scene.getPrefab(ItemPrefab).output({
        props: {
          code: "wood",
          sprite: this.props.woodSprite[size],
          qty: size === "x6" ? 6 : 9,
        },
        transform: {
          x: position.x,
          y: position.y,
        },
      })
    );
  }

  onBootstrapCompleted() {
    super.onBootstrapCompleted();

    this.generateDailyCoin();
  }
}
