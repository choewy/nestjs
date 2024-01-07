import { Hero } from 'src/entities';

export class EnemyKilledCommand {
  constructor(public readonly hero: Hero, public readonly enemyId: number) {}
}
