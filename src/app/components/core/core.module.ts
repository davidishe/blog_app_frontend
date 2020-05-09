import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { PageHeaderComponent } from './page-header/page-header.component';
import { LayerComponent } from './layer/layer.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { OrderTotalComponent } from './order-total/order-total.component';
import { RouterModule } from '@angular/router';
import { StepperComponent } from './stepper/stepper.component';

@NgModule({
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
    LayerComponent,
    OrderTotalComponent,
    StepperComponent

  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    BreadCrumbComponent,
    PageHeaderComponent,
    OrderTotalComponent,
    StepperComponent,

    BreadcrumbModule,
    LayerComponent
  ]
})
export class CoreModule { }
