import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { PageHeaderComponent } from './page-header/page-header.component';
import { LayerComponent } from './layer/layer.component';
import { OrderTotalComponent } from './order-total/order-total.component';
import { RouterModule } from '@angular/router';
import { StepperComponent } from './stepper/stepper.component';
import { DateAgoPipe } from 'src/app/shared/pipes/time-ago.pipe';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ToastComponent } from './toast/toast.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorInfoComponent } from '../layouts/author-info/author-info.component';


@NgModule({
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
    LayerComponent,
    OrderTotalComponent,
    StepperComponent,
    DateAgoPipe,
    ProductCardComponent,
    ToastComponent,
    AuthorInfoComponent

  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    RouterModule,
  ],
  exports: [
    BreadCrumbComponent,
    PageHeaderComponent,
    OrderTotalComponent,
    StepperComponent,
    ProductCardComponent,
    ToastComponent,
    DateAgoPipe,
    AuthorInfoComponent,

    BreadcrumbModule,
    LayerComponent
  ]
})
export class CoreModule { }
