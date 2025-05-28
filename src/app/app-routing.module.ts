import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { ProjectsComponent } from './projects/projects.component';
import { TeamsComponent } from './teams/teams.component';
import { SelectCompanyComponent } from './select-company/select-company.component';
import { UserRegistryComponent } from './user-registry/user-registry.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "announcements", component: AnnouncementsComponent },
  { path: "projects", component: ProjectsComponent },
  { path: "teams", component: TeamsComponent },
  { path: "select-company", component: SelectCompanyComponent },
  { path: "user-registry", component: UserRegistryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
