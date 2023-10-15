import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { CounterComponent } from './component/counter/counter.component';
import { FetchDataComponent } from './component/fetch-data/fetch-data.component';
import { LoginComponent } from './component/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { HeadersInterceptor } from './headers.interceptor';
import { AuthService } from './services/auth-service';
import { AppGuard } from './app-guard.guard';
import { RegisterComponent } from './component/register/register.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog'
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { TimeOutDialogueComponent } from './Dialogue/time-out-dialogue.component';
import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    RegisterComponent,
    TimeOutDialogueComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    NgIdleKeepaliveModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent,
        pathMatch: 'full'
      },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'user-dashboard',
        loadChildren: () =>
          import('./component/user-dashboard/user-dashboard.module').then(
            (m) => m.UserDashboardModule
          ),
      }
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
    AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
