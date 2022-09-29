import { RectEntity } from "react-simple-game-engine/lib";
import { InvisibleWallPrefab } from "./invisible-wall.entity";
import { Background } from "./background.entity";

type Props = {
  invisibleWallOffsets: (0 | 1)[];
};

const MAP_TILED_SIZE = {
  width: 100,
  height: 70,
};

const TILE_SIZE = 32;

export class Generator extends RectEntity<Props> {
  protected onPrepare() {
    return {
      bodyOptions: {
        isSensor: true,
        isStatic: true,
      },
    };
  }

  onBootstrapCompleted() {
    const background = this.worldManagement.getEntity(Background);
    const { invisibleWallOffsets } = this.props;
    let rowIndex = 0;
    for (
      let i = 0;
      i < invisibleWallOffsets.length;
      i += MAP_TILED_SIZE.width
    ) {
      const columns = invisibleWallOffsets.slice(i, MAP_TILED_SIZE.width + i);

      for (let j = 0; j < columns.length; j++) {
        const value = columns[j];
        if (value) {
          const mapX = TILE_SIZE * j;
          const mapY = TILE_SIZE * rowIndex;

          const canvasX = mapX + TILE_SIZE / 2 - background.sprite.width / 2;
          const canvasY = mapY + TILE_SIZE / 2 - background.sprite.height / 2;

          const wall = this.scene.getPrefab(InvisibleWallPrefab).output({
            transform: {
              x: canvasX,
              y: canvasY,
              width: TILE_SIZE,
              height: TILE_SIZE,
            },
          });
          this.addChild(wall);
        }
      }
      rowIndex++;
    }
  }
}
