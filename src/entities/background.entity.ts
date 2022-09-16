import {
  AvatarSprite,
  LogicComponent,
  RectEntity,
} from "react-simple-game-engine";
import { JoystickActionType } from "react-simple-game-engine/lib/export-enums";

import {
  Avatar,
  EntityPrepare,
  Vector,
} from "react-simple-game-engine/lib/export-types";

type Props = {
  backgroundSprite: Avatar;
};
export class Background extends RectEntity<Props> {
  private lastMove?: Vector;
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

  onUpdate() {
    if (this.lastMove) {
      const left = this.position.x - this.width / 2;
      const right = this.position.x + this.width / 2;
      const top = this.position.y - this.height / 2;
      const bottom = this.position.y + this.height / 2;

      this.simpleCamera.x = Renderer.constrain(
        this.simpleCamera.x + this.lastMove.x,
        left + Renderer.scaler.viewport.width / 2,
        right - Renderer.scaler.viewport.width / 2
      );
      this.simpleCamera.y = Renderer.constrain(
        this.simpleCamera.y - this.lastMove.y,
        top + Renderer.scaler.viewport.height / 2,
        bottom - Renderer.scaler.viewport.height / 2
      );
    }
  }

  onActive() {
    this.scene.onJoystickAction((data) => {
      if (data.type === JoystickActionType.MOVE) {
        this.lastMove = data.vector.mult(10 * data.weight);
      } else {
        this.lastMove = undefined;
      }
    });
  }
}
