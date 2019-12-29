import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchV'
})

export class SearchPipe implements PipeTransform {
    transform(positions, value) {
        //value[0] = new RegExp(value[0], 'i')
        //value[1] = new RegExp(value[1], 'i')
        return positions.filter(position => {
            return (position.name.includes(value[0]) && position.shop.includes(value[1]))
        })
    }
}

