//Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

//Custom Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ListingComponent } from './components/listing/listing.component';
import { PublicprofileComponent } from './components/publicprofile/publicprofile.component';
import { EditListingComponent } from './components/listing/edit-listing/edit-listing.component';
import { DeleteListingComponent } from './components/listing/delete-listing/delete-listing.component';
import { ViewListingComponent } from './components/listing/view-listing/view-listing.component';
import { ProfileeditComponent } from './components/profileedit/profileedit.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';


//Services
import { AuthService } from './services/auth.service';
import { ListingService } from './services/listing.service';
import { SearchService } from './services/search.service';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ListingComponent,
    PublicprofileComponent,
    EditListingComponent,
    DeleteListingComponent,
    ViewListingComponent,
    ProfileeditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    FlashMessagesModule,
    FormsModule,
  ],
  providers: [AuthService, ListingService, SearchService, AuthGuard, NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
