import {Component, Input, OnInit} from '@angular/core';
import {Environment} from "../../environment.model";

@Component({
  selector: 'roc-environment-list-item',
  templateUrl: './environment-list-item.component.html',
  styleUrls: ['./environment-list-item.component.scss']
})
export class EnvironmentListItemComponent implements OnInit {
  @Input() environment!: Environment;

  constructor() {
  }

  ngOnInit(): void {
  }

}
