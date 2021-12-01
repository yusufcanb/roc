import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'roc-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent implements OnInit {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() caption!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
