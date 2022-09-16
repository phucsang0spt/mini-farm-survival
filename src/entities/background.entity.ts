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
  backgroundSprite: Avatar;
};
export class Background extends RectEntity<Props> {
  protected onPrepare(): EntityPrepare<this> {
    return {
      sprite: new LogicComponent([
        AvatarSprite,
        {
          source: this.props.backgroundSprite,
        },
      ]),
      transform: {
        x: 0,
        y: 0,
        width: this.props.backgroundSprite.width,
        height: this.props.backgroundSprite.height,
      },
      bodyOptions: {
        isSensor: true,
        isStatic: true,
      },
    };
  }
}
