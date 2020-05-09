import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'DateAgoPipe'
})

export class DateAgoPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value) {
            const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
            if (seconds < 29) { // less than 30 seconds ago will show as 'Just now'
                return 'только что';
            }
            const intervals = {
                'год': 31536000,
                'month': 2592000,
                'неделя': 604800,
                'день': 86400,
                'час': 3600,
                'минут': 60,
                'секунд': 1
            };
            let counter;
            // tslint:disable-next-line: forin
            for (const i in intervals) {
                counter = Math.floor(seconds / intervals[i]);
                if (counter > 0) {
                    if (counter === 1) {
                        return counter + ' ' + i + ' назад'; // singular (1 day ago)
                    } else if (counter > 2 && counter < 4)  {
                        return counter + ' ' + i + 'а назад'; // plural (2 days ago)
                    } else {
                        return counter + ' ' + i + ' назад'; // plural (2 days ago)
                    }
                }
            }
        }
        return value;
    }

}