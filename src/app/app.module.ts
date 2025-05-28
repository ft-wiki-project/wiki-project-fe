import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { TeamsComponent } from './teams/teams.component';
import { ProjectsComponent } from './projects/projects.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SelectCompanyComponent } from './select-company/select-company.component';
import { UserRegistryComponent } from './user-registry/user-registry.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AnnouncementsComponent,
    TeamsComponent,
    ProjectsComponent,
    NavbarComponent,
    SelectCompanyComponent,
    UserRegistryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
