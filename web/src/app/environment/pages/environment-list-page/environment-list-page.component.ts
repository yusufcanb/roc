import {Component, OnInit} from '@angular/core';
import {EnvironmentService} from "../../services/environment.service";
import {Environment} from "../../environment.model";

@Component({
  selector: 'roc-environment-list-page',
  templateUrl: './environment-list-page.component.html',
  styleUrls: ['./environment-list-page.component.scss']
})
export class EnvironmentListPageComponent implements OnInit {
  environments !: Array<Environment>;

  constructor(public environmentService: EnvironmentService) {
  }

  ngOnInit(): void {
    this.environmentService.environments$.subscribe(envs => this.environments = envs)
  }

}
