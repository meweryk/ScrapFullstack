import { Injectable } from '@angular/core';
import { OrderPosition, DeliveryPosition } from '../shared/interfaces';

@Injectable()

export class InvoiceServise {

    public list: DeliveryPosition[] = []
    public price = 0
    public weight = 0
    public weightNoTrash = 0
    public deliveryPosList: number = 0

    add(position: OrderPosition) {

        const deliveryPosition: DeliveryPosition = Object.assign({}, {
            name: position.name,
            fraction: !position.fraction ? '' : position.fraction,
            quantity: position.quantity,
            rank: position.rank,
            trash: (position.rank === 'т' && !position.trash) ? +0 : position.trash,
            trashStap: (!position.trashStap && position.rank === 'т') ? '%' : position.trashStap,
            cost: position.cost,
            quantityNoTrash: (position.rank === 'т' && position.trash != 0 && position.trashStap === '%') ? (+(position.quantity * (1 - position.trash / 100)).toFixed(3)) : (position.rank === 'т' && position.trash != 0 && position.trashStap === 'т') ? (+(position.quantity - position.trash).toFixed(3)) : position.quantity,
            _id: position._id
        })

        this.list.push(deliveryPosition)
        this.deliveryPosList = this.list.length
        this.computerPrice()
        this.computerWeight()
        this.computerWeightNoTrash()
    }

    remove(position: OrderPosition) {
        const idx = this.list.findIndex(p => (p._id === position._id && p.name === position.name))
        this.list.splice(idx, 1)
        this.deliveryPosList = this.list.length
        this.computerPrice()
        this.computerWeight()
        this.computerWeightNoTrash()
    }

    clear() {
        this.list = []
        this.price = 0
        this.weight = 0
        this.weightNoTrash = 0
    }

    private computerPrice() {
        this.price = this.list.reduce((total, item) => {
            if (item.quantityNoTrash) {
                total += +(item.quantityNoTrash * item.cost).toFixed(2)
            } else {
                total += +(item.quantity * item.cost).toFixed(2)
            }
            return total
        }, 0)
    }

    private computerWeight() {
        this.weight = this.list.reduce((total, item) => {
            return total += +(item.quantity).toFixed(3)
        }, 0)
    }

    private computerWeightNoTrash() {
        this.weightNoTrash = this.list.reduce((total, item) => {
            if (item.quantityNoTrash) {
                total += +(item.quantityNoTrash).toFixed(3)
            } else {
                total += +(item.quantity).toFixed(3)
            }
            return total
        }, 0)
    }
}