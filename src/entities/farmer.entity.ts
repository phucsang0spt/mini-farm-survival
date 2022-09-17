import {
  Animator,
  AvatarAnimationSprite,
  AvatarSprite,
  LogicComponent,
  RectEntity,
} from "react-simple-game-engine";
import {
  JoystickActionType,
  JoystickDirection,
} from "react-simple-game-engine/lib/export-enums";

import {
  Avatar,
  EntityEdge,
  EntityPrepare,
  Vector,
} from "react-simple-game-engine/lib/export-types";
import { Background } from "./background.entity";

type Props = {
  farmerSprite: Avatar;
};

enum MovementState {
  STAND,
  DOWN,
  UP,
  LEFT,
  RGIHT,
}

export class Farmer extends RectEntity<Props> {
  private lastMove?: { vector: Vector; direction: JoystickDirection };
  protected onPrepare(): EntityPrepare<this> {
    return {
      sprite: new LogicComponent([
        AvatarSprite,
        {
          source: this.props.farmerSprite,
          animation: new LogicComponent([
            Animator,
            {
              activeKey: MovementState.STAND,
              states: {
                [MovementState.STAND]: new LogicComponent([
                  AvatarAnimationSprite,
                  {
                    x: 0,
                    y: 0,
                    width: 16,
                    height: 16,
                    maxFrame: 1,
                  },
                ]).output(),
                [MovementState.DOWN]: new LogicComponent([
                  AvatarAnimationSprite,
                  {
                    x: 0,
                    y: 0,
                    width: 16,
                    height: 16,
                    distancePerFrame: 32,
                    timePerFrame: 100,
                  },
                ]).output(),
                [MovementState.UP]: new LogicComponent([
                  AvatarAnimationSprite,
                  {
                    x: 0,
                    y: (16 + 32) * 1,
                    width: 16,
                    height: 16,
                    distancePerFrame: 32,
                    timePerFrame: 100,
                  },
                ]).output(),
                [MovementState.LEFT]: new LogicComponent([
                  AvatarAnimationSprite,
                  {
                    x: 0,
                    y: (16 + 32) * 2,
                    width: 16,
                    height: 16,
                    distancePerFrame: 32,
                    timePerFrame: 100,
                  },
                ]).output(),
                [MovementState.RGIHT]: new LogicComponent([
                  AvatarAnimationSprite,
                  {
                    x: 0,
                    y: (16 + 32) * 3,
                    width: 16,
                    height: 16,
                    distancePerFrame: 32,
                    timePerFrame: 100,
                  },
                ]).output(),
              },
            },
          ]),
        },
      ]),
      transform: {
        x: 0,
        y: 0,
        width: 32,
        height: 32,
      },
      bodyOptions: {
        isSensor: true,
        isStatic: true,
      },
    };
  }

  private moveCamera(edge: EntityEdge) {
    const CAMERA_BOOT = 0.9;
    const nextX =
      this.simpleCamera.x +
      (this.lastMove!.vector.x + CAMERA_BOOT * this.lastMove!.vector.x);

    const nextY =
      this.simpleCamera.y +
      (this.lastMove!.vector.y + CAMERA_BOOT * this.lastMove!.vector.y);

    if (this.lastMove.vector.x > 0) {
      if (this.simpleCamera.x < this.position.x) {
        this.simpleCamera.x = Renderer.constrainMax(nextX, this.position.x);
      }
    } else if (this.lastMove.vector.x < 0) {
      if (this.simpleCamera.x > this.position.x) {
        this.simpleCamera.x = Renderer.constrainMin(this.position.x, nextX);
      }
    }

    if (this.lastMove.vector.y > 0) {
      if (this.simpleCamera.y < this.position.y) {
        this.simpleCamera.y = Renderer.constrainMax(nextY, this.position.y);
      }
    } else if (this.lastMove.vector.y < 0) {
      if (this.simpleCamera.y > this.position.y) {
        this.simpleCamera.y = Renderer.constrainMin(this.position.y, nextY);
      }
    }

    this.simpleCamera.x = Renderer.constrain(
      this.simpleCamera.x,
      edge.left + Renderer.scaler.viewport.width / 2,
      edge.right - Renderer.scaler.viewport.width / 2
    );
    this.simpleCamera.y = Renderer.constrain(
      this.simpleCamera.y,
      edge.top + Renderer.scaler.viewport.height / 2,
      edge.bottom - Renderer.scaler.viewport.height / 2
    );
  }

  private moveFarmer(edge: EntityEdge) {
    this.position.x = Renderer.constrain(
      this.position.x + this.lastMove!.vector.x,
      edge.left + this.width / 2,
      edge.right - this.width / 2
    );
    this.position.y = Renderer.constrain(
      this.position.y + this.lastMove!.vector.y,
      edge.top + this.height / 2,
      edge.bottom - this.height / 2
    );
  }

  private movement() {
    if (this.lastMove) {
      if (this.lastMove.direction === JoystickDirection.BACKWARD) {
        (this.sprite.animation as Animator).state = MovementState.DOWN;
      } else if (this.lastMove.direction === JoystickDirection.LEFT) {
        (this.sprite.animation as Animator).state = MovementState.LEFT;
      } else if (this.lastMove.direction === JoystickDirection.RIGHT) {
        (this.sprite.animation as Animator).state = MovementState.RGIHT;
      } else if (this.lastMove.direction === JoystickDirection.FORWARD) {
        (this.sprite.animation as Animator).state = MovementState.UP;
      }
      const edge = this.worldManagement.getEntity(Background).edge;

      this.moveCamera(edge);
      this.moveFarmer(edge);
    } else {
      (this.sprite.animation as Animator).state = MovementState.STAND;
    }
  }

  onUpdate() {
    this.movement();
  }

  onActive() {
    this.scene.onJoystickAction((data) => {
      if (data.type === JoystickActionType.MOVE) {
        this.lastMove = {
          vector: data.vector.mult(6 * data.weight),
          direction: data.direction,
        };
      } else {
        this.lastMove = undefined;
      }
    });
  }
}
