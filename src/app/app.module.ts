import { HAMMER_LOADER, BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpErrorHandler } from './services/error.service';
import { MessageService } from './services/message.service';
import { NavMenuComponent } from './components/layouts/nav-menu/nav-menu.component';
import { AuthService } from './services/auth.service';
import { DateAgoPipe } from './pipes/time-ago.pipe';
import { SideNavComponent } from './components/layouts/side-nav/side-nav.component';
import { UsersPageComponent } from './components/layouts/admin/users-page/users-page.component';
import { UserCardComponent } from './components/layouts/admin/user-card/user-card.component';
import { ProductConfigsComponent } from './components/layouts/admin/product-configs/product-configs.component';
import { HomeModule } from './components/layouts/home/home.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { ErrorComponent } from './components/error/error.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { ServererrorComponent } from './components/error/servererror/servererror.component';
import { ErrorInterceptor } from './components/core/interceptors/error.interceptor';
import { CoreModule } from './components/core/core.module';
import { LoadingInterceptor } from './components/core/interceptors/loading.interceptor';
import { TypesService } from './services/products/types.service';
import { RegionsService } from './services/products/regions.service';
import { JwtInterceptor } from './components/core/interceptors/jwt.interceptor';



@NgModule({
  declarations:
  [
    AppComponent,
    NavMenuComponent,
    UsersPageComponent,
    UserCardComponent,
    DateAgoPipe,
    SideNavComponent,
    ProductConfigsComponent,
    ErrorComponent,
    ServererrorComponent,
    NotFoundComponent
  ],

  imports:
  [
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ],

  exports: [
  ],

  providers: [
    HttpErrorHandler,
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    AuthService,
    TypesService,
    RegionsService,
    {
      provide: HAMMER_LOADER,
      useValue: () => new Promise(() => {})
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
