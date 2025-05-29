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
  showCreateModal = false;
  companyUsers: User[] = [];

  constructor(
    private wikiApiService: WikiApiService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    const currentUser = this.userService.getCurrentUser();
    this.userId = currentUser.id;

    this.adminCompanyId = localStorage.getItem('selectedCompanyId') || '';
    if (this.adminCompanyId) {
      await this.loadCompanyUsers();
    }

    if (this.isAdmin()) {
      try {
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

  async loadCompanyUsers() {
    try {
      const data: any = await this.wikiApiService.getCompanyUsers(this.adminCompanyId);
      this.companyUsers = data;
    } catch (error) {
      console.error('Error loading company users:', error);
    }
  }

  isAdmin(): boolean {
    const currentUser = this.userService.getCurrentUser();
    return currentUser && currentUser.admin === "true";
  }

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  async handleCreateTeam(teamData: any) {
    try {
      await this.wikiApiService.createTeam(teamData);
      const data: any = await this.wikiApiService.getTeamsByCompanyId(this.adminCompanyId);
      this.teams = data;
      this.showCreateModal = false;
    } catch (error) {
      console.error('Error creating team:', error);
    }
  }
}
