import { Observable, map } from 'rxjs';

import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';

import { HeroKilledDragonEvent } from '../events';
import { DropAncientItemCommand } from '../commands';

@Injectable()
export class HeroesGameSagas {
  @Saga()
  dragonKilled = (events: Observable<any>): Observable<ICommand> => {
    return events.pipe(
      ofType(HeroKilledDragonEvent),
      map((event) => new DropAncientItemCommand(event.heroId)),
    );
  };
}
