import { Observable, map } from 'rxjs';

import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';

import { HeroKillDragonEvent } from '../hero/events';
import { ItemDroppedCommand } from './commands';

@Injectable()
export class ItemSagas {
  @Saga()
  droppedItem(events: Observable<any>): Observable<ICommand> {
    return events.pipe(
      ofType(HeroKillDragonEvent),
      map((event) => new ItemDroppedCommand(event.hero.id)),
    );
  }
}
