import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeroComponent } from './hero/hero.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { MaterialModule } from 'src/app/shared/material.module';
import { CoreModule } from '../../core/core.module';



@NgModule({
  declarations:
  [
    HomeComponent,
    HeroComponent
  ],
  imports: [
    CommonModule,
    Ng2CarouselamosModule,
    MaterialModule,
    CoreModule
  ],
  exports:
  [
    HomeComponent,
    HeroComponent
  ]
})
export class HomeModule { }
