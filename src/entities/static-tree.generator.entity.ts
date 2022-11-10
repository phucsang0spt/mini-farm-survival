import { Generator, TILE_SIZE } from "./generator.entity";
import { StaticTreePrefab } from "./static-tree.entity";

type Props = {
  staticTreeOffsets: (0 | 1)[];
  staticTreeOffsets2: (0 | 1)[];
};

export class StaticTreeGeneratorEntity extends Generator<Props> {
  onBootstrapCompleted() {
    super.onBootstrapCompleted();
    const { staticTreeOffsets, staticTreeOffsets2 } = this.props;
    this.generateTile(StaticTreePrefab, staticTreeOffsets, {
      extendOffsets: {
        x: TILE_SIZE / 2,
        y: TILE_SIZE,
        width: TILE_SIZE,
        height: TILE_SIZE * 2,
      },
    });
    this.generateTile(StaticTreePrefab, staticTreeOffsets2, {
      extendOffsets: {
        x: TILE_SIZE / 2,
        y: -TILE_SIZE,
        width: TILE_SIZE,
        height: TILE_SIZE * 2,
      },
    });
  }
}
