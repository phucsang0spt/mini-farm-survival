import { itemHash } from "data/item-list";
import {
  Animator,
  AvatarAnimationSprite,
  AvatarSprite,
  LogicComponent,
  Matter,
  RectEntity,
  Saver,
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
import { genId } from "utils";
import { Background } from "./background.entity";

type Props = {
  farmerSprite: Avatar;
};

enum MovementState {
  STAND,
  DOWN,
  UP,
  LEFT,
  RIGHT,
}

export class Farmer extends RectEntity<Props> {
  private lastMove?: { vector: Vector; direction: JoystickDirection };
  private _ownItems: OwnItem[] = [];
  private _groupOwnItems: Record<OwnItem["code"], OwnItem[]> = {};
  private _activeSword: ActiveItem = Saver.get("active-sword");
  private _activeShield: ActiveItem = Saver.get("active-shield");

  set activeShield(_activeShield: ActiveItem) {
    this._activeShield = _activeShield;
    this.scene.emitEntityPropsChange("active-shield", _activeShield);
    Saver.set("active-shield", _activeShield);
  }

  set activeSword(_activeSword: ActiveItem) {
    this._activeSword = _activeSword;
    this.scene.emitEntityPropsChange("active-sword", _activeSword);
    Saver.set("active-sword", _activeSword);
  }

  get activeSword() {
    return this._activeSword;
  }

  get activeShield() {
    return this._activeShield;
  }

  get ownItems() {
    return this._ownItems;
  }

  get groupOwnItems() {
    return this._groupOwnItems;
  }

  private addItem(code: Item["code"], qty: number, id?: OwnItem["id"]) {
    const itemClass = itemHash[code];
    if (itemClass.type === "equipment") {
      Array.from({ length: qty }).forEach(() => {
        this._ownItems.push({
          code,
          qty: 1,
          id: id ?? genId(),
        });
      });
    } else {
      const item = this._groupOwnItems[code]?.[0];
      if (item) {
        item.qty += qty;
      } else {
        this._ownItems.push({
          code,
          qty,
          id: id ?? genId(),
        });
      }
    }
    this._groupOwnItems = this._ownItems.reduce(
      (obj: Record<OwnItem["code"], OwnItem[]>, item) => {
        obj[item.code] = obj[item.code] || [];
        obj[item.code].push(item);
        return obj;
      },
      {}
    );
  }

  getItemQuantity(code: Item["code"]) {
    const items = this._groupOwnItems[code] || [];
    return items.reduce((s, item) => s + item.qty, 0);
  }

  craftItem(
    target: { code: Item["code"]; qty: number },
    materials: { code: Item["code"]; usedQty: number }[]
  ) {
    for (const material of materials) {
      const delIndexes = [];
      const items = this._groupOwnItems[material.code] || [];
      for (const item of items) {
        let remainMaterialQty = material.usedQty - item.qty;
        item.qty -= material.usedQty;
        if (remainMaterialQty < 0) {
          material.usedQty = 0;
        } else {
          material.usedQty = remainMaterialQty;
        }
        if (item.qty <= 0) {
          delIndexes.push(
            this._ownItems.findIndex((_item) => _item.id === item.id)
          );
        }
      }
      for (const delIndex of delIndexes) {
        this._ownItems.splice(delIndex, 1);
      }
    }
    this.addItem(target.code, target.qty);
    Saver.set("own-items", this.ownItems);
    this.scene.emitEntityPropsChange("own-items", {
      list: this._ownItems,
      group: this._groupOwnItems,
    });
  }

  protected onPrepare(): EntityPrepare<this> {
    const initialOwnItems = Saver.getWithDefault("own-items", [
      {
        code: "wood",
        qty: 100,
      },
      {
        code: "stone",
        qty: 10,
      },
    ]) as OwnItem[];
    for (const item of initialOwnItems) {
      this.addItem(item.code, item.qty, item.id);
    }

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
                [MovementState.RIGHT]: new LogicComponent([
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
      enabledGravity: false,
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

    // when the farmer move right
    if (this.lastMove.vector.x > 0) {
      if (this.simpleCamera.x < this.position.x) {
        this.simpleCamera.x = this.renderer.constrainMax(
          nextX,
          this.position.x
        );
      }
    }
    // when the farmer move left
    else if (this.lastMove.vector.x < 0) {
      if (this.simpleCamera.x > this.position.x) {
        this.simpleCamera.x = this.renderer.constrainMin(
          nextX,
          this.position.x
        );
      }
    }

    // when the farmer move down
    if (this.lastMove.vector.y > 0) {
      if (this.simpleCamera.y < this.position.y) {
        this.simpleCamera.y = this.renderer.constrainMax(
          nextY,
          this.position.y
        );
      }
    }
    // when the farmer move up
    else if (this.lastMove.vector.y < 0) {
      if (this.simpleCamera.y > this.position.y) {
        this.simpleCamera.y = this.renderer.constrainMin(
          nextY,
          this.position.y
        );
      }
    }

    this.simpleCamera.x = this.renderer.constrain(
      this.simpleCamera.x,
      edge.left + this.renderer.scaler.viewport.width / 2,
      edge.right - this.renderer.scaler.viewport.width / 2
    );
    this.simpleCamera.y = this.renderer.constrain(
      this.simpleCamera.y,
      edge.top + this.renderer.scaler.viewport.height / 2,
      edge.bottom - this.renderer.scaler.viewport.height / 2
    );
  }

  private moveFarmer(edge: EntityEdge) {
    const nextPosition = {
      x: this.position.x + this.lastMove!.vector.x,
      y: this.position.y + this.lastMove!.vector.y,
    };
    nextPosition.x = this.renderer.constrain(
      nextPosition.x,
      edge.left + this.width / 2,
      edge.right - this.width / 2
    );
    nextPosition.y = this.renderer.constrain(
      nextPosition.y,
      edge.top + this.height / 2,
      edge.bottom - this.height / 2
    );
    Matter.Body.setPosition(this.body, {
      x: nextPosition.x,
      y: nextPosition.y,
    });
  }

  private movement() {
    if (this.lastMove) {
      if (this.lastMove.direction === JoystickDirection.BACKWARD) {
        (this.sprite.animation as Animator).state = MovementState.DOWN;
      } else if (this.lastMove.direction === JoystickDirection.LEFT) {
        (this.sprite.animation as Animator).state = MovementState.LEFT;
      } else if (this.lastMove.direction === JoystickDirection.RIGHT) {
        (this.sprite.animation as Animator).state = MovementState.RIGHT;
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
          vector: data.vector.mult(0.9 * (data.length / 35)),
          direction: data.direction,
        };
      } else {
        this.lastMove = undefined;
      }
    });
  }
}
