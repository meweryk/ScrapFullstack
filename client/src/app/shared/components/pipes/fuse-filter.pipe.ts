import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'fuseFilter'
})

export class FuseFilterPipe implements PipeTransform {
  transform(fuses, value) {
    return fuses.filter(fuse => {
      return (
        (fuse.alloy.toLocaleUpperCase().includes(value[0].toLocaleUpperCase()) || fuse.fuse.toLocaleUpperCase().includes(value[0]) || fuse.fuseCard.toLocaleUpperCase().includes(value[0].toLocaleUpperCase())) && (formatDate(fuse.fuseDate, 'yyyy-MM-dd', 'en').includes(formatDate(value[1], 'yyyy-MM-dd', 'en')) || formatDate(value[1], 'yyyy-MM-dd', 'en') == "1970-01-01")
      )
    })
  }
}
