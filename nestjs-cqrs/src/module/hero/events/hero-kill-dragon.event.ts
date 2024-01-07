import { Hero } from 'src/entities';

export class HeroKillDragonEvent {
  constructor(public readonly hero: Hero, public readonly enemyId: number) {}
}
