import {Component, OnInit} from '@angular/core';
import {EnvironmentService} from "../../services/environment.service";

@Component({
  selector: 'roc-environment-select',
  templateUrl: './environment-select.component.html',
  styleUrls: ['./environment-select.component.scss']
})
export class EnvironmentSelectComponent implements OnInit {
  constructor(public environmentService: EnvironmentService) {
  }

  ngOnInit(): void {
  }

}
