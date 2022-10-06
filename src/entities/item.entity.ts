import {
  AvatarAnimationSprite,
  AvatarSprite,
  LogicComponent,
  Prefab,
  RectEntity,
} from "react-simple-game-engine/lib";
import {
  Avatar,
  Configation,
  EntityPrepare,
} from "react-simple-game-engine/lib/export-types";
import { FarmerEntity } from "./farmer.entity";

type Props = {
  sprite: Avatar;
  code: Item["code"];
  highlight?: boolean;
  highlightSprite: Avatar;
};

export class ItemEntity extends RectEntity<Props> {
  private highlightAnimation: AvatarAnimationSprite;
  protected onPrepare(): EntityPrepare<this> {
    this.highlightAnimation = new LogicComponent([
      AvatarAnimationSprite,
      {
        source: this.props.highlightSprite,
        size: {
          width: 19,
          height: 20,
        },
        width: 23,
        height: 24,
        x: 0,
        y: 0,
      },
    ]).output();
    return {
      sprite: new LogicComponent([
        AvatarSprite,
        {
          source: this.props.sprite,
        },
      ]),
      bodyOptions: {
        isSensor: true,
        isStatic: true,
      },
      transform: {
        width: 22,
        height: 22,
      },
    };
  }

  onDraw() {
    if (this.props.highlight) {
      const highlightSprite = this.props.highlightSprite;
      this.renderer.drawHandle(
        {
          x: this.position.x,
          y: this.position.y - highlightSprite.height / 2 - this.height / 2,
        },
        () => {
          this.highlightAnimation.draw();
        }
      );
    }
  }

  onCollision(target: any) {
    if (target instanceof FarmerEntity) {
      target.pickItem(this.props.code, 1);
      // destroy item after pick
      this.terminate();
    }
  }
}

export class ItemPrefab extends Prefab<ItemEntity> {
  constructor(config: Configation<ItemEntity>) {
    super([ItemEntity, config]);
  }
}
