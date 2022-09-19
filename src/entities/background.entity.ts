import {
  AvatarSprite,
  LogicComponent,
  RectEntity,
  Sound,
} from "react-simple-game-engine";

import {
  Avatar,
  EntityPrepare,
} from "react-simple-game-engine/lib/export-types";

type Props = {
  backgroundSprite: Avatar;
  backgroundMusic: Sound;
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

  onActive() {
    this.props.backgroundMusic.play();
    this.scene.onSoundBackgroundOptionsChange(({ canPlay }) => {
      if (canPlay) {
        this.props.backgroundMusic.play();
      } else {
        this.props.backgroundMusic.stop();
      }
    });
  }
}
