import { Injectable } from '@angular/core';
import { OrderPosition, DeliveryPosition } from '../shared/interfaces';

@Injectable()

export class InvoiceServise {

    public list: DeliveryPosition[] = []
    public price = 0
    public deliveryWeight = 0
    public weightNoTrash = 0

    add(position: OrderPosition) {

        const deliveryPosition: DeliveryPosition = Object.assign({}, {
            name: position.name,
            fraction: !position.fraction ? '' : position.fraction,
            quantity: position.quantity,
            rank: position.rank,
            trash: (position.rank === 'т' && !position.trash) ? +0 : position.trash,
            trashStap: (!position.trashStap && position.rank === 'т') ? '%' : position.trashStap,
            cost: position.cost,
            quantityNoTrash: (position.rank === 'т' && position.trash != 0 && position.trashStap === '%') ? (position.quantity - (1 - position.trash / 100)) : (position.rank === 'т' && position.trash != 0 && position.trashStap === 'т') ? (position.quantity - position.trash) : position.quantity,
            _id: position._id
        })
        this.list.push(deliveryPosition)
    }

    remove(position: OrderPosition) {
        const idx = this.list.findIndex(p => p._id === position._id)
        this.list.splice(idx, 1)
    }

    update() { }

    clear() { }
}