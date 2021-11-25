import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import {MatChipsModule} from "@angular/material/chips";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [CommonModule, MatChipsModule, RouterModule],
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule { }
