export class ItemDroppedEvent {
  constructor(public readonly heroId: number, public readonly itemId: number) {}
}
