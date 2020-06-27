import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ContentRoutingModule } from './content-routing.module';
import { FintechComponent } from './fintech/fintech.component';
import { CompareComponent } from './compare/compare.component';
import { RevueComponent } from './revue/revue.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { MinorsComponent } from './minors/minors.component';
import { CoreModule } from '../core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';



@NgModule({
  declarations: [
    AboutComponent,
    BlogComponent,
    ContentComponent,
    FintechComponent,
    CompareComponent,
    RevueComponent,
    OnboardingComponent,
    MinorsComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    UtilsModule
  ]
})
export class ContentModule { }
