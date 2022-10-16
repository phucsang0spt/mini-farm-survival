import {
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
  sprite: Avatar;
};

export class FishingRodEntity extends RectEntity<Props> {
  protected onPrepare(): EntityPrepare<this> {
    return {
      isVisible: false,
      sprite: new LogicComponent([
        AvatarSprite,
        {
          source: this.props.sprite,
          animation: new LogicComponent([
            AvatarAnimationSprite,
            {
              isRunning: false,
              width: 26,
              height: 31,
              x: 0,
              y: 0,
              timePerFrame: 50,
            },
          ]),
        },
      ]),
      transform: {
        width: 26,
        height: 31,
      },
      enabledPhysicBody: false,
    };
  }
}
