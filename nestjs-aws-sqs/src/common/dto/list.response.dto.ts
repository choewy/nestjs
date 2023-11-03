export class ListResponseDto<Q, D> {
  constructor(readonly total: number, readonly query: Q, readonly rows: D[]) {}
}
