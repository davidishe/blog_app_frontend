import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './components/core/guards/auth.guard';
import { HeroComponent } from './components/layouts/hero/hero.component';
import { ErrorComponent } from './components/error/error.component';
import { ServererrorComponent } from './components/error/servererror/servererror.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  { path: '', component: HeroComponent, pathMatch: 'full', data: {breadcrumb: 'Магазин'} },

  { path: 'error', component: ErrorComponent, data: {breadcrumb: 'Тест ошибок'} },
  { path: 'servererror', component: ServererrorComponent, data: {breadcrumb: 'Ошибка сервера'} },
  { path: 'notfound', component: NotFoundComponent, data: {breadcrumb: 'Страница не найдена'} },

  { path: 'account', loadChildren: () => import('./components/layouts/account/account.module').then(mod => mod.AccountModule),
  data: {breadcrumb: {skip: true}}},

  { path: 'content', loadChildren: () => import('./components/content/content.module').then(mod => mod.ContentModule),
  data: {breadcrumb: {skip: true}}},


];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports:
  [
    RouterModule
  ]
})
export class AppRoutingModule { }
