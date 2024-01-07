export class HeroInventoryDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly count: number,
  ) {}
}
