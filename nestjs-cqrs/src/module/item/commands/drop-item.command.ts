import { Hero, Item } from 'src/entities';

export class DropItemCommand {
  constructor(public readonly hero: Hero, public readonly item: Item) {}
}
