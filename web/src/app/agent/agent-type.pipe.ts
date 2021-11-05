import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'agentType'})
export class AgentTypePipe implements PipeTransform {

  transform(value: number | string): string {
    switch (value) {
      case "MacOS":
        return "apple"
      default:
        return "memory"
    }
  }
}
