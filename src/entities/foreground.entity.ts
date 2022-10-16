import {
  AvatarSprite,
  LogicComponent,
  RectEntity,
} from "react-simple-game-engine";

import {
  Avatar,
  EntityPrepare,
} from "react-simple-game-engine/lib/export-types";

type Props = {
  foregroundSprite: Avatar;
};
export class ForegroundEntity extends RectEntity<Props> {
  protected onPrepare(): EntityPrepare<this> {
    return {
      sprite: new LogicComponent([
        AvatarSprite,
        {
          source: this.props.foregroundSprite,
        },
      ]),
      transform: {
        x: 0,
        y: 0,
        width: this.props.foregroundSprite.width,
        height: this.props.foregroundSprite.height,
      },
      enabledPhysicBody: false,
    };
  }
}
