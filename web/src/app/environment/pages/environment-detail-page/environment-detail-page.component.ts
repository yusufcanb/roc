import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'roc-environment-detail-page',
  templateUrl: './environment-detail-page.component.html',
  styleUrls: ['./environment-detail-page.component.scss']
})
export class EnvironmentDetailPageComponent implements OnInit {

  editorOptions = {
    language: 'yaml'
  };
  code: string = '';

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get("http://localhost:9000/default-project/docker-compose.yaml", {responseType: 'text'})
      .subscribe((response: any) => this.code = response)
  }

}
