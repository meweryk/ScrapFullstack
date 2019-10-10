import { Injectable } from '@angular/core';
import { Position, OrderPosition } from '../shared/interfaces';

@Injectable()
export class OrderService {

    public list: OrderPosition[] = []
    public price = 0

    add(position: Position) {
        const orderPosition: OrderPosition = Object.assign({}, {
            name: position.name,
            cost: position.cost,
            quantity: position.quantity,
            _id: position._id
        })
        this.list.push(orderPosition)
    }

    remove() { }

    clear() { }
}