import { Observable, map } from 'rxjs';

import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';

import { EnemyKilledCommand } from './commands';
import { HeroKillDragonEvent } from '../hero/events';

@Injectable()
export class EnemySagas {
  @Saga()
  dragonKilled(events: Observable<any>): Observable<ICommand> {
    return events.pipe(
      ofType(HeroKillDragonEvent),
      map((event) => new EnemyKilledCommand(event.dragon)),
    );
  }
}
