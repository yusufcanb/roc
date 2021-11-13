import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'jobStatusColor'})
export class JobStatusColorPipe implements PipeTransform {

  transform(value: number | string): string {
    switch (value) {
      case "QUEUE":
        return "orange"
      case "RUN":
        return "#333"
      case "FAIL":
        return "red"
      case "SUCCESS":
        return "green"
      default:
        return "#333"
    }
  }

}
