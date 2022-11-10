import {
  LogicComponent,
  RectEntity,
  Prefab,
  ColorSprite,
} from "react-simple-game-engine";

import {
  Avatar,
  Configuration,
  EntityPrepare,
} from "react-simple-game-engine/lib/export-types";

export type StaticTreeProps = {
  sprite: Avatar;
};

export class StaticTreeEntity extends RectEntity<StaticTreeProps> {
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
    };
  }

  private drawAvatar() {
    const sprite = this.props.sprite;
    const { width: spriteW, height: spriteH } = sprite;
    const point = { ...this.position };
    point.y -= spriteH / 2; //change pivot of sprite
    point.y += this.height / 2;
    this.renderer.drawHandle(point, (renderer) => {
      renderer.image(sprite, 0, 0, spriteW, spriteH);
    });
  }

  onDraw() {
    this.drawAvatar();
  }
}

export class StaticTreePrefab extends Prefab<StaticTreeEntity> {
  constructor(config: Configuration<StaticTreeEntity>) {
    super([StaticTreeEntity, config]);
  }
}
