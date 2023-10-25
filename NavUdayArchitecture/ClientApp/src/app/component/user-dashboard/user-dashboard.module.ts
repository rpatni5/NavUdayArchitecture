import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard.component';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { AppShellNavigationComponent } from '../app-shell-navigation/app-shell-navigation.component';
import { FrameworkService } from './framework-service';
import { IntakeFormComponent } from './intake-form/intake-form.component';
import { MatStepperModule } from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { RelationshipFormComponent } from './intake-form/relationship-form/relationship-form.component';
import { TransactionFormComponent } from './intake-form/transaction-form/transaction-form.component';
import { UserInformationComponent } from './intake-form/user-information/user-information.component';
import { ApplicationDashboardComponent } from './application-dashboard/application-dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes: Routes = [{ path: '', component: UserDashboardComponent },
                        { path: 'intake-form', component: IntakeFormComponent },
                        { path: 'dashboard', component: ApplicationDashboardComponent }];

@NgModule({
  declarations: [
    UserDashboardComponent,
    NavMenuComponent,
    AppShellNavigationComponent,
    IntakeFormComponent,
    RelationshipFormComponent,
    TransactionFormComponent,
    UserInformationComponent,
    ApplicationDashboardComponent
  ],
  imports: [CommonModule, MatStepperModule, MatFormFieldModule, ReactiveFormsModule,MatInputModule, 
    MatNativeDateModule, MatRadioModule, MatCardModule,MatButtonModule,MatExpansionModule, MatTableModule, MatPaginatorModule,
    MatDatepickerModule, MatListModule, MatIconModule, MatTooltipModule, RouterModule.forChild(routes)],
  providers: [FrameworkService],
})
export class UserDashboardModule { }
