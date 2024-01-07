import { Enemy, Hero, Item } from 'src/entities';

export class HeroKillDragonEvent {
  constructor(
    public readonly hero: Hero,
    public readonly dragon: Enemy,
    public readonly item: Item,
  ) {}
}
