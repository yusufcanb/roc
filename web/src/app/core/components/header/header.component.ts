import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'core-header',
  template: `
    <mat-toolbar class="first-toolbar">
      <img height="40px" src="https://robocon.io/dist/img/RF-white.svg" alt="RBTFRMK">
      <span class="font-ocra">ROC</span>
      <span class="flex-spacer"></span>
      <button mat-button [matMenuTriggerFor]="projectMenu" aria-label="Example icon-button with a menu">
        Default Project
        <mat-icon>keyboard_arrow_down</mat-icon>
      </button>
      <mat-menu #projectMenu="matMenu">
        <button mat-menu-item>
          <mat-icon>widgets</mat-icon>
          <span>Default Project</span>
        </button>
        <button mat-menu-item >
          <mat-icon>widgets</mat-icon>
          <span>RPA Tasks</span>
        </button>
      </mat-menu>
      <span class="flex-spacer"></span>
      <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
        <mat-icon>notification</mat-icon>
      </button>
      <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
        <mat-icon>settings</mat-icon>
      </button>
    </mat-toolbar>

    <mat-toolbar class="mat-elevation-z3 second-toolbar">
      <button mat-button>Job</button>
      <button mat-button>Task Force</button>
      <button mat-button>Repository</button>

      <span class="flex-spacer"></span>

      <button mat-button [matMenuTriggerFor]="agentMenu" aria-label="Example icon-button with a menu">
        Select Agent
        <mat-icon>keyboard_arrow_down</mat-icon>
      </button>
      <mat-menu #agentMenu="matMenu">
        <button mat-menu-item *ngFor="let agent of agents">
          <mat-icon>dialpad</mat-icon>
          <span>{{agent}}</span>
        </button>
      </mat-menu>

      <button mat-button [matMenuTriggerFor]="envMenu" aria-label="Example icon-button with a menu">
        Select Environment
        <mat-icon>keyboard_arrow_down</mat-icon>
      </button>
      <mat-menu #envMenu="matMenu">
        <button mat-menu-item *ngFor="let env of environments">
          <mat-icon>dialpad</mat-icon>
          <span>{{env}}</span>
        </button>
      </mat-menu>

    </mat-toolbar>
  `,
  styles: [`
    .first-toolbar {
      background: black;
      color: white;
    }

    .second-toolbar {
      background: #2e2e2e;
      color: white;
    }

    .mat-button {
      font-family: "OCRA";
      border: 2px solid #222;
      margin-right: 5px;
    }

    .mat-button:hover {
      border: 2px solid white;
    }
  `]
})

export class HeaderComponent implements OnInit {
  @Input() environments: Array<string> | undefined;
  @Input() agents: Array<string> | undefined;

  constructor() {
  }

  ngOnInit() {
  }
}
