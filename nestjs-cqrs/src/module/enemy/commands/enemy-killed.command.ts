import { Enemy } from 'src/entities';

export class EnemyKilledCommand {
  constructor(public readonly enemy: Enemy) {}
}
