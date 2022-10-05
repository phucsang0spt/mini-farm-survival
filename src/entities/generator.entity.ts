import { Prefab, RectEntity } from "react-simple-game-engine/lib";
import {
  EntityPrepare,
  Point,
} from "react-simple-game-engine/lib/export-types";
import { BackgroundEntity } from "./background.entity";

const MAP_TILED_SIZE = {
  width: 100,
  height: 70,
};

const TILE_SIZE = 32;

export class Generator<Props> extends RectEntity<Props> {
  private pivot: Point;
  protected onPrepare(): EntityPrepare<this> {
    return {
      enabledPhysicBody: false,
    };
  }

  generate2DOffset(tileOffsets: number[]) {
    const offsets: {
      x: number;
      y: number;
      width: number;
      height: number;
    }[] = [];

    let rowIndex = 0;
    for (let i = 0; i < tileOffsets.length; i += MAP_TILED_SIZE.width) {
      const columns = tileOffsets.slice(i, MAP_TILED_SIZE.width + i);

      for (let j = 0; j < columns.length; j++) {
        const value = columns[j];
        if (value) {
          const mapX = TILE_SIZE * j;
          const mapY = TILE_SIZE * rowIndex;

          const canvasX = mapX + TILE_SIZE / 2 - this.pivot.x;
          const canvasY = mapY + TILE_SIZE / 2 - this.pivot.y;

          offsets.push({
            x: canvasX,
            y: canvasY,
            width: TILE_SIZE,
            height: TILE_SIZE,
          });
        }
      }
      rowIndex++;
    }

    return offsets;
  }

  generateTile<E extends RectEntity<any>>(
    prefabClass: { new (...args: any[]): Prefab<E> },
    tileOffsets: number[]
  ) {
    for (const offset of this.generate2DOffset(tileOffsets)) {
      const entity = this.scene.getPrefab(prefabClass).output({
        transform: {
          x: offset.x,
          y: offset.y,
          width: offset.width,
          height: offset.height,
        },
      });
      this.addChild(entity);
    }
  }

  onBootstrapCompleted() {
    const background = this.worldManagement.getEntity(BackgroundEntity);
    const pivot = {
      x: background.sprite.width / 2,
      y: background.sprite.height / 2,
    };

    this.pivot = pivot;
  }
}
