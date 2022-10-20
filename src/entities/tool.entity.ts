import { RectEntity } from "react-simple-game-engine/lib";

export class FarmerAction {
  targets: RectEntity[] = [];

  get latestTarget() {
    return this.targets[0];
  }

  addTarget(target: RectEntity) {
    this.targets.push(target);
  }

  removeTarget(target: RectEntity) {
    this.targets.splice(this.targets.indexOf(target), 1);
  }
}

export class ToolEntity<Props = any> extends RectEntity<Props> {
  action = new FarmerAction();
}
