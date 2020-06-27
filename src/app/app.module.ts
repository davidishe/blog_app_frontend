import { HAMMER_LOADER, BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ChangeDetectorRef } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageService } from './services/message.service';
import { NavMenuComponent } from './components/layouts/nav-menu/nav-menu.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './components/error/error.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { ServererrorComponent } from './components/error/servererror/servererror.component';
import { CoreModule } from './components/core/core.module';
import { TypesService } from './services/products/types.service';
import { RegionsService } from './services/products/regions.service';
import { JwtInterceptor } from './components/core/interceptors/jwt.interceptor';
import { ShopService } from './services/products/shop.service';
import { HeroComponent } from './components/layouts/hero/hero.component';
import { ErrorInterceptor } from './components/core/interceptors/error.interceptor';
import { BusyService } from './services/infrastructure/busy.service';
import { LoadingInterceptor } from './components/core/interceptors/loading.interceptor';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { SubscribeComponent } from './components/layouts/subscribe/subscribe.component';


registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations:
  [
    AppComponent,
    NavMenuComponent,
    ErrorComponent,
    ServererrorComponent,
    NotFoundComponent,
    HeroComponent,
    FooterComponent,
    SubscribeComponent
  ],

  imports:
  [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ],

  exports: [
  ],

  providers: [
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},

    TypesService,
    RegionsService,
    ShopService,
    BusyService,
    {
      provide: HAMMER_LOADER,
      useValue: () => new Promise(() => {})
    },
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
