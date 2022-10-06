import {
  ColorSprite,
  LogicComponent,
  Prefab,
  RectEntity,
} from "react-simple-game-engine/lib";
import { Sensor } from "react-simple-game-engine/lib/classes/sensor";
import {
  Avatar,
  Configation,
  EntityPrepare,
} from "react-simple-game-engine/lib/export-types";
import { FarmerEntity } from "./farmer.entity";
import { TILE_SIZE } from "./generator.entity";

type Props = {
  sprite: Avatar;
  bigSprite: Avatar;
  type?: "big";
};

export class TreeEntity extends RectEntity<Props> {
  protected onPrepare(): EntityPrepare<this> {
    return {
      sprite: new LogicComponent([
        ColorSprite,
        {
          source: [0, 0, 0, 0],
        },
      ]),
      bodyOptions: {
        isStatic: true,
      },
      transform: {
        width: TILE_SIZE + 30,
        height: TILE_SIZE + 5,
      },
    };
  }

  onDraw() {
    const point = { ...this.position };
    const sprite =
      this.props.type === "big" ? this.props.bigSprite : this.props.sprite;

    const { width: spriteW, height: spriteH } = sprite;
    point.y -= spriteH / 2;
    point.y += TILE_SIZE / 2;
    this.renderer.drawHandle(point, (renderer) => {
      renderer.image(sprite, 0, 0, spriteW, spriteH);
    });
  }

  onActive() {
    // this.debugSensor = true;
    this.addSensor({ width: 100, height: 80 });
  }

  onSensorCollisionEnd(sensor: Sensor, target: any) {
    if (target instanceof FarmerEntity) {
      console.log("detect farmer out");
    }
  }

  onSensorCollision(sensor: Sensor, target: any) {
    if (target instanceof FarmerEntity) {
      console.log("detect farmer");
    }
  }
}

export class TreePrefab extends Prefab<TreeEntity> {
  constructor(config: Configation<TreeEntity>) {
    super([TreeEntity, config]);
  }
}
