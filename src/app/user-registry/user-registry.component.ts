import { Component, OnInit } from '@angular/core';
import { WikiApiService } from '../services/wiki-api.service';

interface UserProfile {
  first: string;
  last: string;
  email: string;
}

interface User {
  id: number;
  username: string;
  profile: UserProfile;
  status: string;
  admin: string;
  active: string;
}

@Component({
  selector: 'app-user-registry',
  standalone: false,
  templateUrl: './user-registry.component.html',
  styleUrl: './user-registry.component.css'
})

export class UserRegistryComponent implements OnInit {
  users: User[] = [];
  showCreateModal = false;

  constructor(private wikiApiService: WikiApiService) {}

  async ngOnInit() {
    try {
      const companyId = localStorage.getItem('selectedCompanyId');
      if (companyId) {
        const data: any = await this.wikiApiService.getCompanyUsers(companyId);
        console.log('Users loaded:', data);
        this.users = data;
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  async handleCreateUser(userData: any) {
    try {
      await this.wikiApiService.createUser(userData);
      this.showCreateModal = false;
      // Refresh user list
      const companyId = localStorage.getItem('selectedCompanyId');
      if (companyId) {
        const data: any = await this.wikiApiService.getCompanyUsers(companyId);
        this.users = data;
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }
}
