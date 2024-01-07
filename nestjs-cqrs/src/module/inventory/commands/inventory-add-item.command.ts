export class InventoryAddItemCommand {
  constructor(public readonly heroId: number, public readonly itemId: number) {}
}
