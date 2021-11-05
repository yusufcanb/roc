import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {NavService} from "../../services/nav.service";

@Injectable({providedIn: 'root'})
export class BreadcrumbService {
  private subject = new Subject<string>();

  constructor(private navService: NavService) {
    navService.getCurrentUrl().subscribe(url => this.updateBreadcrumb(url))
  }

  onUpdate(): Observable<string> {
    return this.subject.asObservable();
  }

  updateBreadcrumb(str: string) {
    this.subject.next(str);
  }

  shortenUrlIfNecessary(returnUrl: string): string {
    let questionMark = returnUrl.indexOf("?");

    if (questionMark > -1) {
      returnUrl = returnUrl.substring(0, questionMark);
    }

    return returnUrl;
  }
}
