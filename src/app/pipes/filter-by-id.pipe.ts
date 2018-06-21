import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterById',
    pure: false
})
export class FilterByIdPipe implements PipeTransform {
    transform(items: any[], filter: string): any {

        if (!items) {
            return [];
        }

        if (!filter || filter == '') {
            return items;
        }

        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => filter && item.Id == filter);
    }
}