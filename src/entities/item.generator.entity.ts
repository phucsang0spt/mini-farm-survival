import { Saver } from "react-simple-game-engine/lib";
import { Avatar } from "react-simple-game-engine/lib/export-types";
import { Generator } from "./generator.entity";
import { ItemPrefab } from "./item.entity";

type Props = {
  coinSprite: Avatar;
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

  onBootstrapCompleted() {
    super.onBootstrapCompleted();

    this.generateDailyCoin();
  }
}
