import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'taskForceIcon'})
export class TaskForceIconPipe implements PipeTransform {

  transform(value: number | string): string {
    switch (value) {
      case "package":
        return "account_tree"
      default:
        return "memory"
    }
  }
}
