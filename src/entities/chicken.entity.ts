import {
  Animator,
  AvatarAnimationSprite,
  AvatarSprite,
  LogicComponent,
  Prefab,
  RectEntity,
  Saver,
} from "react-simple-game-engine/lib";
import {
  Avatar,
  Configation,
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
  private growTime = 10 * 60;
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
      bodyOptions: {
        isStatic: true,
      },
    };
  }

  onActive() {
    this.onTimer(
      this.growTime,
      () => {
        this.sprite.animator.state = ChickenState.MATURE;
      },
      {
        once: true,
        startFrom: Saver.get(`chicken::${this.name}-born-time`),
        onRegisterDone: (time) => {
          Saver.set(`chicken::${this.name}-born-time`, time);
        },
      }
    );
  }
}

export class ChickenPrefab extends Prefab<Chicken> {
  constructor(config: Configation<Chicken>) {
    super([Chicken, config]);
  }
}
