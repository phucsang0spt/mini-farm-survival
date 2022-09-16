import {
  Avatar,
  Collection,
  Color,
} from "react-simple-game-engine/lib/export-types";
import { Scene } from "react-simple-game-engine";

import lv1Enemy from "assets/images/lv1-enemy.png";
import lv2Enemy from "assets/images/lv2-enemy.png";
import lv3Enemy from "assets/images/lv3-enemy.png";

type LevelIndex = 1 | 2 | 3;

export type EnemyLevel = {
  color: Color;
  level: LevelIndex;
  sprite: Avatar;
};

const defaultEnemyLevelsConfigs = {
  1: {
    color: [157, 157, 162],
    level: 1,
    sprite: lv1Enemy,
  },
  2: {
    color: [144, 148, 236],
    level: 2,
    sprite: lv2Enemy,
  },
  3: {
    color: [246, 149, 153],
    level: 3,
    sprite: lv3Enemy,
  },
};

export async function createEnemyLevels(
  scene: Scene,
  expectLevels: Collection<LevelIndex>
): Promise<Collection<EnemyLevel>> {
  return (await Promise.all(
    expectLevels.map(async ([level, percent]) => {
      const { sprite, ...configs } = defaultEnemyLevelsConfigs[level];
      return [
        {
          ...configs,
          sprite: (await scene.createSprites(sprite))[0],
        } as EnemyLevel,
        percent!,
      ];
    })
  )) as any;
}
