import { Observable, map } from 'rxjs';

import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';

import { ItemDroppedEvent } from '../item/events';
import { InventoryAddItemCommand } from './commands';

@Injectable()
export class InventorySagas {
  @Saga()
  dragonKilled(events: Observable<any>): Observable<ICommand> {
    return events.pipe(
      ofType(ItemDroppedEvent),
      map((event) => new InventoryAddItemCommand(event.heroId, event.itemId)),
    );
  }
}
