import { itemHash } from "data/item-list";
import { ToolShape } from "enums";
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
import { AxeEntity } from "./axe.entity";
import { BackgroundEntity } from "./background.entity";
import { ChickenGeneratorEntity } from "./chicken.generator.entity";
import { FishingRodEntity } from "./fishing-rod.entity";
import { ItemEntity } from "./item.entity";
import { PickaxeEntity } from "./pickaxe.entity";
import { FarmerAction, ToolEntity } from "./tool.entity";
import { TreeEntity } from "./tree.entity";

type ActionType = "chop-tree" | "crush-stone" | "pick";

type Props = {
  farmerSprite: Avatar;
};

enum MovementState {
  STAND_DOWN,
  STAND_UP,
  STAND_LEFT,
  STAND_RIGHT,
  DOWN,
  UP,
  LEFT,
  RIGHT,
}

const COIN_VALUE = 100;
export class FarmerEntity extends RectEntity<Props> {
  private direction: MovementState;
  private lastMove?: { vector: Vector; direction: JoystickDirection };

  private _ownItems: OwnItem[] = [];
  private _groupOwnItems: Record<OwnItem["code"], OwnItem[]> = {};
  private _activeSword: ActiveItem = Saver.get("active-sword");
  private _activeShield: ActiveItem = Saver.get("active-shield");
  private _activeTools: Record<ToolShape, ActiveItem> = Saver.getWithDefault(
    "active-tools",
    {}
  );
  private _cash: number = Saver.getWithDefault("cash", 5);
  private _chickenGenerator: ChickenGeneratorEntity;

  private background: BackgroundEntity;

  private axe: AxeEntity;
  private pickaxe: PickaxeEntity;
  private fishingRod: FishingRodEntity;
  private pickTarget: ItemEntity;
  private actionStacks: {
    type: ActionType;
    tool: ToolEntity | { action: FarmerAction };
  }[] = [];

  get cash() {
    return this._cash;
  }

  get chickenGenerator() {
    return this._chickenGenerator;
  }

  set cash(_cash: number) {
    this._cash = _cash;
    Saver.set("cash", _cash);
    this.scene.emitEntityPropsChange("cash", _cash);
  }

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

  set activeTools(_activeTools: Record<ToolShape, ActiveItem>) {
    this._activeTools = _activeTools;
    this.scene.emitEntityPropsChange("active-tools", _activeTools);
    Saver.set("active-tools", _activeTools);
  }

  get activeSword() {
    return this._activeSword;
  }

  get activeShield() {
    return this._activeShield;
  }

  get activeTools() {
    return this._activeTools;
  }

  get ownItems() {
    return this._ownItems;
  }

  get woodQty() {
    return (
      this._groupOwnItems.wood?.reduce((s, ownItem) => s + ownItem.qty, 0) || 0
    );
  }

  get ownFoodItems() {
    return this._ownItems.filter((item) => itemHash[item.code].type === "food");
  }

  get groupOwnItems() {
    return this._groupOwnItems;
  }

  protected onPrepare(): EntityPrepare<this> {
    const initialOwnItems = Saver.getWithDefault("own-items", [
      {
        code: "wood",
        qty: 10,
      },
      {
        code: "stone",
        qty: 5,
      },
      {
        code: "metal-ore",
        qty: 1,
      },
    ]) as OwnItem[];
    for (const item of initialOwnItems) {
      this.addItem(item.code, item.qty, { id: item.id, emit: false });
    }

    return {
      sprite: new LogicComponent([
        AvatarSprite,
        {
          source: this.props.farmerSprite,
          animation: new LogicComponent([
            Animator,
            {
              activeKey: MovementState.STAND_DOWN,
              states: {
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
                [MovementState.STAND_DOWN]: new LogicComponent([
                  AvatarAnimationSprite,
                  {
                    x: 0,
                    y: 0,
                    width: 16,
                    height: 16,
                    maxFrame: 1,
                  },
                ]).output(),
                //
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
                [MovementState.STAND_UP]: new LogicComponent([
                  AvatarAnimationSprite,
                  {
                    x: 0,
                    y: (16 + 32) * 1,
                    width: 16,
                    height: 16,
                    maxFrame: 1,
                  },
                ]).output(),
                //
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
                [MovementState.STAND_LEFT]: new LogicComponent([
                  AvatarAnimationSprite,
                  {
                    x: 0,
                    y: (16 + 32) * 2,
                    width: 16,
                    height: 16,
                    maxFrame: 1,
                  },
                ]).output(),
                //
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
                [MovementState.STAND_RIGHT]: new LogicComponent([
                  AvatarAnimationSprite,
                  {
                    x: 0,
                    y: (16 + 32) * 3,
                    width: 16,
                    height: 16,
                    maxFrame: 1,
                  },
                ]).output(),
              },
            },
          ]),
        },
      ]),
      transform: {
        x: 177,
        y: -812,
        width: 32,
        height: 32,
      },
      enabledGravity: false,
    };
  }

  private updateGroupOwnItems() {
    this._groupOwnItems = this._ownItems.reduce(
      (obj: Record<OwnItem["code"], OwnItem[]>, item) => {
        obj[item.code] = obj[item.code] || [];
        obj[item.code].push(item);
        return obj;
      },
      {}
    );
  }

  private cleanActiveItems() {
    // sword no-exist anymore
    if (this._activeSword && !this.getItemQuantity(this._activeSword.code)) {
      this.activeSword = null;
    }

    // shield no-exist anymore
    if (this._activeShield && !this.getItemQuantity(this._activeShield.code)) {
      this.activeShield = null;
    }

    for (const shape in this._activeTools) {
      if (this._activeTools.hasOwnProperty(shape)) {
        const { code } = this._activeTools[shape as ToolShape];
        if (!this.getItemQuantity(code)) {
          delete this._activeTools[shape as ToolShape];
        }
      }
    }
    this.activeTools = { ...this._activeTools };
  }

  private reduceItem(code: Item["code"], qty: number) {
    const delIndexes = [];
    const items = this._groupOwnItems[code] || [];
    let remainQty = qty;
    for (const item of items) {
      let remainMaterialQty = remainQty - item.qty;
      item.qty -= remainQty;
      if (remainMaterialQty < 0) {
        remainQty = 0;
      } else {
        remainQty = remainMaterialQty;
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

    return remainQty;
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

  private handleMovement() {
    if (this.lastMove) {
      if (this.lastMove.direction === JoystickDirection.BACKWARD) {
        this.sprite.animator.state = MovementState.DOWN;
        this.direction = MovementState.DOWN;
      } else if (this.lastMove.direction === JoystickDirection.LEFT) {
        this.sprite.animator.state = MovementState.LEFT;
        this.direction = MovementState.LEFT;
      } else if (this.lastMove.direction === JoystickDirection.RIGHT) {
        this.sprite.animator.state = MovementState.RIGHT;
        this.direction = MovementState.RIGHT;
      } else if (this.lastMove.direction === JoystickDirection.FORWARD) {
        this.sprite.animator.state = MovementState.UP;
        this.direction = MovementState.UP;
      }
      const edge = this.background.edge;
      this.moveCamera(edge);
      this.moveFarmer(edge);
    } else {
      if (this.sprite.animator.state === MovementState.DOWN) {
        this.sprite.animator.state = MovementState.STAND_DOWN;
        this.direction = MovementState.DOWN;
      } else if (this.sprite.animator.state === MovementState.UP) {
        this.sprite.animator.state = MovementState.STAND_UP;
        this.direction = MovementState.UP;
      } else if (this.sprite.animator.state === MovementState.LEFT) {
        this.sprite.animator.state = MovementState.STAND_LEFT;
        this.direction = MovementState.LEFT;
      } else if (this.sprite.animator.state === MovementState.RIGHT) {
        this.sprite.animator.state = MovementState.STAND_RIGHT;
        this.direction = MovementState.RIGHT;
      }
    }
  }

  get activeAction() {
    return this.actionStacks[0];
  }

  private pickItem() {
    const activeTool = this.activeAction.tool;
    const target = activeTool.action.latestTarget as ItemEntity;
    const { code, qty = 1 } = target.props;
    if (code === "coin") {
      this.cash = this._cash + COIN_VALUE;
      return;
    }
    this.addItem(code, qty);
    target.terminate();
  }

  private chopTree() {
    const activeTool = this.activeAction.tool as AxeEntity;
    const animation = activeTool.sprite.animation;
    if (!animation.isRunning) {
      animation.onCompletedCycle = () => {
        (activeTool.action.latestTarget as TreeEntity).getChop();
      };
    }
    animation.isRunning = true;
  }

  private handleActiveTool() {
    const activeTool = this.activeAction?.tool;
    if (activeTool instanceof ToolEntity) {
      activeTool.position.x = this.position.x;
      activeTool.position.y =
        this.position.y - this.height / 2 - activeTool.height / 2;
      if (this.direction === MovementState.LEFT) {
        activeTool.scaleX = -1;
      } else if (this.direction === MovementState.RIGHT) {
        activeTool.scaleX = 1;
      } else if (this.direction === MovementState.UP) {
      } else {
        // todo
      }
    }
  }

  private reduceAction(type: ActionType, target: RectEntity) {
    const exist = this.getAction(type);
    if (exist) {
      // go away from target
      exist.tool.action.removeTarget(target);
      if (exist.tool instanceof ToolEntity) {
        exist.tool.sprite.animation.isRunning = false;
      }

      // if any target nearby then remove action
      if (!exist.tool.action.targets.length) {
        if (exist.tool instanceof ToolEntity) {
          exist.tool.isVisible = false;
        }
        this.actionStacks.splice(this.actionStacks.indexOf(exist), 1);
      }
    }
    this.scene.emitEntityPropsChange("active-action", this.activeAction);
  }

  private addAction(
    type: ActionType,
    tool: typeof this.actionStacks[0]["tool"],
    target: RectEntity
  ) {
    let exist = this.getAction(type);
    if (!exist) {
      exist = { type, tool };
      if (tool instanceof ToolEntity) {
        tool.isVisible = true;
      }

      //add action
      this.actionStacks.push(exist);
    }
    // detected target nearby
    exist.tool.action.addTarget(target);
    this.scene.emitEntityPropsChange("active-action", this.activeAction);
  }

  private getAction(type: ActionType) {
    return this.actionStacks.find((act) => act.type === type);
  }

  doAction() {
    const activeTool = this.activeAction?.tool;
    if (activeTool) {
      const xDir = activeTool.action.latestTarget.position.x - this.position.x;

      // snap farmer to target direction
      if (xDir > 0) {
        this.sprite.animator.state = MovementState.STAND_RIGHT;
        this.direction = MovementState.RIGHT;
      } else if (xDir < 0) {
        this.sprite.animator.state = MovementState.STAND_LEFT;
        this.direction = MovementState.LEFT;
      }

      if (activeTool instanceof ToolEntity) {
        if (activeTool instanceof AxeEntity) {
          this.chopTree();
        }
      } else {
        this.pickItem();
      }
    }
  }

  addItem(
    code: Item["code"],
    qty: number,
    { id, emit = true }: { id?: OwnItem["id"]; emit?: boolean } = {}
  ) {
    const itemClass = itemHash[code];
    if (itemClass.type === "equipment" || itemClass.type === "tool") {
      Array.from({ length: qty }).forEach(() => {
        const _id = id ?? genId();
        this._ownItems.push({
          code,
          qty: 1,
          id: _id,
        });
        if (itemClass.type === "tool") {
          if (!this._activeTools[itemClass.format.shape]) {
            this.activeTools = {
              ...this._activeTools,
              [itemClass.format.shape]: { code, id: _id },
            };
          }
        }
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
    this.updateGroupOwnItems();

    if (emit) {
      Saver.set("own-items", this.ownItems);
      this.scene.emitEntityPropsChange("own-items", {
        list: this._ownItems,
        group: this._groupOwnItems,
      });
    }
  }

  isUsing(id: string) {
    if (this._activeShield) {
      if (id === this._activeShield.id || id === this._activeSword.id) {
        return true;
      }
    }

    for (const shape in this._activeTools) {
      if (this._activeTools.hasOwnProperty(shape)) {
        if (this._activeTools[shape as ToolShape].id === id) {
          return true;
        }
      }
    }
    return false;
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
      material.usedQty = this.reduceItem(material.code, material.usedQty);
    }

    this.updateGroupOwnItems();
    this.cleanActiveItems();

    this.addItem(target.code, target.qty);
  }

  sellItem(
    code: Item["code"],
    { qty, totalIncome }: { qty: number; totalIncome: number }
  ) {
    this.reduceItem(code, qty);
    this.cash = this._cash + totalIncome;
    this.updateGroupOwnItems();
    this.cleanActiveItems();
    Saver.set("own-items", this.ownItems);
    this.scene.emitEntityPropsChange("own-items", {
      list: this._ownItems,
      group: this._groupOwnItems,
    });
  }

  buyItem(
    item: Item,
    { qty, totalPrice }: { qty: number; totalPrice: number }
  ) {
    if (item.type === "stuff") {
      if (item.code === "chicken") {
        this.chickenGenerator.addChickens(qty);
        this.cash = this._cash - totalPrice;
        return;
      }
    }
    this.addItem(item.code, qty);
    this.cash = this._cash - totalPrice;
  }

  eatFood(code: Item["code"]) {
    this.reduceItem(code, 1);
    this.updateGroupOwnItems();
    this.cleanActiveItems();
    Saver.set("own-items", this.ownItems);
    this.scene.emitEntityPropsChange("own-items", {
      list: this._ownItems,
      group: this._groupOwnItems,
    });
    // todo: up health, up water
  }

  onUpdate() {
    this.handleMovement();
    this.handleActiveTool();
  }

  onActive() {
    this.debugSensor = false;
    this.addSensor({ width: 60, height: 60 }, true);
  }

  onBootstrapCompleted() {
    this._chickenGenerator = this.worldManagement.getEntity(
      ChickenGeneratorEntity
    );
    this.background = this.worldManagement.getEntity(BackgroundEntity);
    this.axe = this.worldManagement.getEntity(AxeEntity);
    this.pickaxe = this.worldManagement.getEntity(PickaxeEntity);
    this.fishingRod = this.worldManagement.getEntity(FishingRodEntity);

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

  onSensorCollision(_: any, target: any) {
    if (target instanceof TreeEntity) {
      this.addAction("chop-tree", this.axe, target);
    } else if (target instanceof ItemEntity) {
      this.addAction("pick", { action: new FarmerAction() }, target);
    }
  }

  onSensorCollisionEnd(_: any, target: any) {
    if (target instanceof TreeEntity) {
      this.reduceAction("chop-tree", target);
    } else if (target instanceof ItemEntity) {
      this.reduceAction("pick", target);
    }
  }
}
