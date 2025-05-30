import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { ProjectsComponent } from './projects/projects.component';
import { TeamsComponent } from './teams/teams.component';
import { SelectCompanyComponent } from './select-company/select-company.component';
import { UserRegistryComponent } from './user-registry/user-registry.component';
import { authGuard } from './auth.guard';
import { adminGuard } from './admin.guard';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "announcements", component: AnnouncementsComponent, canActivate: [authGuard] },
  { path: "projects", component: ProjectsComponent, canActivate: [authGuard] },
  { path: "teams", component: TeamsComponent, canActivate: [authGuard] },
  { 
    path: "select-company", 
    component: SelectCompanyComponent, 
    canActivate: [authGuard, adminGuard] 
  },
  { 
    path: "user-registry", 
    component: UserRegistryComponent, 
    canActivate: [authGuard, adminGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
