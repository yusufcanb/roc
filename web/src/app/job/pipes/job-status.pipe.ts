import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'jobStatus'})
export class JobStatusPipe implements PipeTransform {

  transform(value: number | string): string {
    switch (value) {
      case "QUEUE":
        return "Queued"
      case "RUN":
        return "Running"
      case "FAIL":
        return "Failed"
      case "SUCCESS":
        return "Successful"
      default:
        return "ILLEGAL STATE"
    }
  }

}
