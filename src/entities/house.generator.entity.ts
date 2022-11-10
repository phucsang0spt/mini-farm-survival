import { Generator, TILE_SIZE } from "./generator.entity";
import { HousePrefab } from "./house.entity";

type Props = {
  houseOffsets: (0 | 1)[];
};

export class HouseGeneratorEntity extends Generator<Props> {
  onBootstrapCompleted() {
    super.onBootstrapCompleted();
    const { houseOffsets } = this.props;
    this.generateTile(HousePrefab, houseOffsets, {
      extendOffsets: {
        x: TILE_SIZE,
        y: TILE_SIZE + TILE_SIZE / 2,
        width: TILE_SIZE * 2,
        height: TILE_SIZE * 3,
      },
    });
  }
}
