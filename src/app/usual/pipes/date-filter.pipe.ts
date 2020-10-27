import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs'

@Pipe({
  name: 'dateFilter'
})
export class DateFilter implements PipeTransform {
  transform(items: any, filter: any): any {
    if (!items || !filter) {
      return items
    }

    const currentDate = dayjs();
    const newArr = [];

    if(filter === 'greater') {
      items.filter(item => {
        if(dayjs(item.goalDueDate).isAfter(currentDate)) {
          newArr.push(item);
        }
      });
      return newArr;
    } else {
      items.filter(item => {
        if(dayjs(item.goalDueDate).isBefore(currentDate)) {
          newArr.push(item);
        }
      });
      return newArr;
    }
  }
}
