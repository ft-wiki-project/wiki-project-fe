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
import { EditProjectModalComponent } from './components/edit-project-modal/edit-project-modal.component';
import { CreateProjectModalComponent } from './components/create-project-modal/create-project-modal.component';
import { CreateUserModalComponent } from './components/create-user-modal/create-user-modal.component';
import { CreateTeamModalComponent } from './components/create-team-modal/create-team-modal.component';
import { CreateAnnouncementModalComponent } from './components/create-announcement-modal/create-announcement-modal.component';
import { EditTeamModalComponent } from './components/edit-team-modal/edit-team-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AnnouncementsComponent,
    TeamsComponent,
    ProjectsComponent,
    NavbarComponent,
    SelectCompanyComponent,
    UserRegistryComponent,
    EditProjectModalComponent,
    CreateProjectModalComponent,
    CreateUserModalComponent,
    CreateTeamModalComponent,
    CreateAnnouncementModalComponent,
    EditTeamModalComponent
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
