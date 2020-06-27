import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content.component';
import { FintechComponent } from './fintech/fintech.component';
import { CompareComponent } from './compare/compare.component';
import { RevueComponent } from './revue/revue.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { MinorsComponent } from './minors/minors.component';


const routes: Routes = [
  {path: '', component: ContentComponent},
  {path: 'about', component: AboutComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'fintech', component: FintechComponent},
  {path: 'onboarding', component: OnboardingComponent},
  {path: 'revue', component: RevueComponent},
  {path: 'compare', component: CompareComponent},
  {path: 'buggs', component: MinorsComponent}

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ContentRoutingModule { }
