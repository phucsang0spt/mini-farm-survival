import {
  AvatarAnimationSprite,
  AvatarSprite,
  LogicComponent,
} from "react-simple-game-engine/lib";
import {
  Avatar,
  EntityPrepare,
} from "react-simple-game-engine/lib/export-types";
import { ToolEntity } from "./tool.entity";

type Props = {
  sprite: Avatar;
};

export class AxeEntity extends ToolEntity<Props> {
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
              maxCycle: 1,
              width: 33,
              height: 27,
              x: 0,
              y: 0,
              timePerFrame: 80,
            },
          ]),
        },
      ]),
      transform: {
        width: 33,
        height: 27,
      },
      enabledPhysicBody: false,
    };
  }
}
