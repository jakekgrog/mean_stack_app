//Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Custom Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { FlashMessagesModule } from 'angular2-flash-messages';

//Services
import { AuthService } from './services/auth.service';
import { UploadService } from './services/upload.service';

import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
<<<<<<< HEAD
import { ProfileeditComponent } from './components/profileedit/profileedit.component';
=======
import { FooterComponent } from './components/footer/footer.component';
>>>>>>> 1e1af1df1fc8fa1ba86c791e9486a80f92f5a36e

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
<<<<<<< HEAD
    ProfileeditComponent
=======
    FooterComponent
>>>>>>> 1e1af1df1fc8fa1ba86c791e9486a80f92f5a36e
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    FlashMessagesModule,
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
