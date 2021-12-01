import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'core-header',
  template: `
    <mat-toolbar class="first-toolbar">
      <div class="w-100" fxLayout="row" fxLayoutAlign="space-between center">
        <div class="left" fxLayoutAlign="center center">
          <img height="40px" src="https://robocon.io/dist/img/RF-white.svg" alt="RBTFRMK">
          <span class="font-ocra">ROC</span>
        </div>
        <div class="middle">
          <roc-project-select></roc-project-select>
        </div>
        <div class="right">
          <button mat-icon-button class="example-icon" matTooltip="Switch Language"
                  aria-label="Example icon-button with share icon" (click)="switchLang()">
            <mat-icon>translate</mat-icon>
          </button>
          <button mat-icon-button class="example-icon" matTooltip="About this Platform"
                  aria-label="Tool information">
            <mat-icon>info</mat-icon>
          </button>
        </div>
      </div>
    </mat-toolbar>

    <mat-toolbar class="mat-elevation-z3 second-toolbar">
      <button mat-button routerLink="/">{{'words.dashboard' | translate}}</button>
      <button mat-button routerLink="/job">{{'words.job' | translate}}</button>
      <button mat-button routerLink="/task-force">{{'words.task-force' | translate}}</button>

      <span class="flex-spacer"></span>

      <roc-agent-select></roc-agent-select>
      <roc-environment-select></roc-environment-select>

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

  constructor(private translateService: TranslateService) {
  }

  ngOnInit() {
  }

  switchLang() {
    this.translateService.currentLang == "en"
      ? this.translateService.use("zh")
      : this.translateService.use("en")
  }
}
