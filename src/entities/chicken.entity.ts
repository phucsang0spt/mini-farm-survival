import {
  Animator,
  AvatarAnimationSprite,
  AvatarSprite,
  LogicComponent,
  RectEntity,
} from "react-simple-game-engine/lib";
import {
  Avatar,
  EntityPrepare,
} from "react-simple-game-engine/lib/export-types";

type Props = {
  chickSprite: Avatar;
};

enum ChickenState {
  BABY,
  MATURE,
}

export class Chicken extends RectEntity<Props> {
  private growTime = 10;
  protected onPrepare(): EntityPrepare<this> {
    return {
      sprite: new LogicComponent([
        AvatarSprite,
        {
          source: this.props.chickSprite,
          animation: new LogicComponent([
            Animator,
            {
              activeKey: ChickenState.BABY,
              states: {
                [ChickenState.BABY]: new LogicComponent([
                  AvatarAnimationSprite,
                  {
                    x: 0,
                    y: 30 + 3,
                    width: 27,
                    height: 27,
                    maxFrame: 3,
                    distancePerFrame: 1,
                  },
                ]).output(),
                [ChickenState.MATURE]: new LogicComponent([
                  AvatarAnimationSprite,
                  {
                    x: 0,
                    y: 0,
                    width: 30,
                    height: 30,
                  },
                ]).output(),
              },
            },
          ]),
        },
      ]),
      transform: {
        x: 803,
        y: -961,
        width: 32,
        height: 32,
      },
      enabledGravity: false,
    };
  }

  onBootstrapCompleted() {
    this.onTimer(this.growTime, () => {
      this.sprite.animator.state = ChickenState.MATURE;
    });
  }
}
