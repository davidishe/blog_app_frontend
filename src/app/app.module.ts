import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpErrorHandler } from './services/error.service';
import { MessageService } from './services/message.service';
import { ItemsCrudService } from './services/items-crud.service';
import { ToastrManager } from './services/toastr-manager.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ItemsPageComponent } from './components/items-page/items-page.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthService } from './services/auth.service';
import { AuthorizePageComponent } from './components/authorize-page/authorize-page.component';
import { AuthGuard } from './guards/auth.guard';
import { NewItemPageComponent } from './components/new-item-page/new-item-page.component';

@NgModule({
  declarations: [
    AppComponent,

    // new components
    ItemsPageComponent,
    MainPageComponent,
    NavMenuComponent,
    LoginPageComponent,
    AuthorizePageComponent,
    NewItemPageComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // new modules
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: MainPageComponent, pathMatch: 'full' },
      { path: 'items', component: ItemsPageComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginPageComponent },
      { path: 'authorize', component: AuthorizePageComponent },
    ]),
  ],

  providers: [
    HttpErrorHandler,
    MessageService,
    ItemsCrudService,
    ToastrManager,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
