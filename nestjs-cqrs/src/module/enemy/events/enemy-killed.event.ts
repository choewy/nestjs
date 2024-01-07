import { Enemy } from 'src/entities';

export class EnemyKilledEvent {
  constructor(public readonly enemy: Enemy) {}
}
