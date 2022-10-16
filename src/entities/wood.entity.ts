import {
  AvatarSprite,
  LogicComponent,
  Prefab,
} from "react-simple-game-engine/lib";
import {
  Avatar,
  Configuration,
  EntityPrepare,
} from "react-simple-game-engine/lib/export-types";
import { ToolEntity } from "./tool.entity";

type Props = {
  sprite: Avatar;
  spriteX5: Avatar;
  type: "x3" | "x5";
};

export class WoodEntity extends ToolEntity<Props> {
  protected onPrepare(): EntityPrepare<this> {
    return {
      sprite: new LogicComponent([
        AvatarSprite,
        {
          source:
            this.props.type === "x3" ? this.props.sprite : this.props.spriteX5,
        },
      ]),
      transform: {
        width: this.props.type === "x3" ? 41 : 50,
        height: 26,
      },
      bodyOptions: {
        isSensor: true,
        isStatic: true,
      },
    };
  }
}

export class WoodPrefab extends Prefab<WoodEntity> {
  constructor(config: Configuration<WoodEntity>) {
    super([WoodEntity, config]);
  }
}
