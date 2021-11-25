import {Component, Input, OnInit} from '@angular/core';
import {Environment} from "../../environment.model";

@Component({
  selector: 'roc-environment-list',
  templateUrl: './environment-list.component.html',
  styleUrls: ['./environment-list.component.scss']
})
export class EnvironmentListComponent implements OnInit {
  @Input() environmentList!: Environment[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
