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
  forgroundSprite: Avatar;
};
export class Forground extends RectEntity<Props> {
  protected onPrepare(): EntityPrepare<this> {
    return {
      sprite: new LogicComponent([
        AvatarSprite,
        {
          source: this.props.forgroundSprite,
        },
      ]),
      transform: {
        x: 0,
        y: 0,
        width: this.props.forgroundSprite.width,
        height: this.props.forgroundSprite.height,
      },
      enabledPhysicBody: false,
    };
  }
}
