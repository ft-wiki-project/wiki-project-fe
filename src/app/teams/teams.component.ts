import { Component } from '@angular/core';
import { WikiApiService } from '../services/wiki-api.service';
import { UserService } from '../services/user-service.service';

interface UserProfile {
  first: string;
  last: string;
}

interface User {
  id: number;
  username: string | null;
  profile: UserProfile;
  status: string;
  admin: string;
  active: string;
}

interface Team {
  id: number;
  name: string;
  description: string;
  projects: any[];
  users: User[];
}

@Component({
  selector: 'app-teams',
  standalone: false,
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  teams: Team[] = [];
  userId: string = '';
  adminCompanyId: string = '';

  constructor(
    private wikiApiService: WikiApiService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    const currentUser = this.userService.getCurrentUser();
    this.userId = currentUser.id;

    this.adminCompanyId = currentUser.companies[0]?.id || '';

    if (this.isAdmin()) {
      try {
        // need to refactor this to use admins currently slected company.
        // likely getting it from local storage or userService
        // For now, assuming the first company in the user's companies array
        const data: any = await this.wikiApiService.getTeamsByCompanyId(this.adminCompanyId);
        this.teams = data;
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    } else {
      try {
        const data: any = await this.wikiApiService.getTeams(this.userId);
        this.teams = data;
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    }
  }

  isAdmin(): boolean {
    const currentUser = this.userService.getCurrentUser();
    return currentUser && currentUser.admin === "true";
  }


}
