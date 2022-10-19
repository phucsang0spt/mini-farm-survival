import {
  ColorSprite,
  LogicComponent,
  Prefab,
  RectEntity,
} from "react-simple-game-engine/lib";
import {
  Avatar,
  Configuration,
  EntityPrepare,
} from "react-simple-game-engine/lib/export-types";
import { TILE_SIZE } from "./generator.entity";
import { ItemGeneratorEntity } from "./item.generator.entity";

type Props = {
  sprite: Avatar;
  bigSprite: Avatar;
  type?: "big";
};

const HEALTH_BAR_WIDTH = 50;
const HEALTH_BAR_HEIGHT = 8;

export class TreeEntity extends RectEntity<Props> {
  private hp = {
    max: 3,
    current: 3,
  };
  private showHpTimer?: ReturnType<TreeEntity["onTimer"]>;

  protected onPrepare(): EntityPrepare<this> {
    if (this.props.type === "big") {
      this.hp.max = 5;
      this.hp.current = this.hp.max;
    }
    return {
      sprite: new LogicComponent([
        ColorSprite,
        {
          source: [0, 0, 0, 0],
        },
      ]),
      bodyOptions: {
        isStatic: true,
      },
      transform: {
        width: TILE_SIZE + 30,
        height: TILE_SIZE + 5,
      },
    };
  }

  private drawAvatar(sprite: Avatar) {
    const point = { ...this.position };
    const { width: spriteW, height: spriteH } = sprite;
    point.y -= spriteH / 2;
    point.y += TILE_SIZE / 2;
    this.renderer.drawHandle(point, (renderer) => {
      renderer.image(sprite, 0, 0, spriteW, spriteH);
    });
  }

  private drawHealthBar(sprite: Avatar) {
    const point = {
      x: this.position.x,
      y:
        this.position.y +
        TILE_SIZE / 2 -
        sprite.height -
        HEALTH_BAR_HEIGHT / 2 -
        5,
    };

    const hpPercent = this.hp.current / this.hp.max;
    const hpFillWidth = hpPercent * HEALTH_BAR_WIDTH;

    this.renderer.drawHandle(point, (renderer) => {
      renderer.fill(203, 52, 42);
      renderer.rect(0, 0, HEALTH_BAR_WIDTH, HEALTH_BAR_HEIGHT);

      renderer.fill(44, 156, 70);
      renderer.rect(
        -(HEALTH_BAR_WIDTH - hpFillWidth) / 2,
        0,
        hpFillWidth,
        HEALTH_BAR_HEIGHT
      );
    });
  }

  getChop() {
    if (this.isTerminate) {
      return;
    }

    if (!this.showHpTimer) {
      this.showHpTimer = this.onTimer(
        1000,
        () => {
          this.showHpTimer = undefined;
        },
        { once: true }
      );
    } else {
      this.showHpTimer.reset(); // reset counter
    }
    const hp = --this.hp.current;
    if (hp < 1) {
      this.terminate({ duration: 200, keepVisible: true });
      this.worldManagement
        .getEntity(ItemGeneratorEntity)
        .generateWood(this.props.type === "big" ? "x9" : "x6", {
          x: this.position.x,
          y: this.position.y,
        });
    }
  }

  onDraw() {
    const sprite =
      this.props.type === "big" ? this.props.bigSprite : this.props.sprite;
    this.drawAvatar(sprite);

    if (this.showHpTimer) {
      this.drawHealthBar(sprite);
    }
  }
}

export class TreePrefab extends Prefab<TreeEntity> {
  constructor(config: Configuration<TreeEntity>) {
    super([TreeEntity, config]);
  }
}
