import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersPageComponent } from './components/layouts/admin/users-page/users-page.component';
import { AuthGuard } from './components/core/guards/auth.guard';
import { UserCardComponent } from './components/layouts/admin/user-card/user-card.component';
import { ProductConfigsComponent } from './components/layouts/admin/product-configs/product-configs.component';
import { HomeComponent } from './components/layouts/home/home.component';
import { HeroComponent } from './components/layouts/home/hero/hero.component';
import { ErrorComponent } from './components/error/error.component';
import { ServererrorComponent } from './components/error/servererror/servererror.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';


const routes: Routes = [
  { path: '', component: HeroComponent, pathMatch: 'full', data: {breadcrumb: 'Магазин'} },
  { path: 'hero', component: HomeComponent, data: {breadcrumb: 'Главная'} },
  { path: 'users', component: UsersPageComponent, canActivate: [AuthGuard], data: {breadcrumb: 'Пользователи'}  },
  { path: 'user/:id', component: UserCardComponent, canActivate: [AuthGuard], data: {breadcrumb: 'Пользователь'}  },
  { path: 'config', component: ProductConfigsComponent, data: {breadcrumb: 'Продукты и регионы'} },

  { path: 'error', component: ErrorComponent, data: {breadcrumb: 'Тест ошибок'} },
  { path: 'servererror', component: ServererrorComponent, data: {breadcrumb: 'Ошибка сервера'} },
  { path: 'notfound', component: NotFoundComponent, data: {breadcrumb: 'Страница не найдена'} },


  { path: 'shop', loadChildren: () => import('./components/content/shop/shop.module').then(mod => mod.ShopModule),
  data: {breadcrumb: 'Каталог'}},

  { path: 'basket', loadChildren: () => import('./components/content/basket/basket.module').then(mod => mod.BasketModule),
  data: {breadcrumb: 'Корзина'}},

  { path: 'checkout', loadChildren: () => import('./components/content/checkout/checkout.module').then(mod => mod.CheckoutModule),
  canActivate: [AuthGuard], data: {breadcrumb: 'Оформление заказа'}},

  { path: 'account', loadChildren: () => import('./components/layouts/account/account.module').then(mod => mod.AccountModule),
  data: {breadcrumb: {skip: true}}},


];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
