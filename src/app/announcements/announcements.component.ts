import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WikiApiService } from '../services/wiki-api.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service.service';

interface Announcement {
  date: string;
  message: string;
  title: string;
  author: {
    profile: {
      first: string,
      last: string
    }
  }
}

@Component({
  selector: 'app-announcements',
  standalone: false,
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.css'
})

export class AnnouncementsComponent {
  companyId: string = ''
  adminCompanyId: string = ''
  announcements: Announcement[] = [];
  showCreateModal = false;
  
  constructor(
    private wikiApiService: WikiApiService, 
    private router: Router, 
    private userService: UserService
  ) {}

  async ngOnInit() {
    if (this.isAdmin()) {
      this.adminCompanyId = localStorage.getItem('selectedCompanyId') || '';
      const data = await this.wikiApiService.getAnnoucements(this.adminCompanyId);
      this.announcements = data as Announcement[];
    } else {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if(user.companies[0].id) {
        this.companyId = user.companies[0].id
        console.log(this.companyId);
      }
  
      const data = await this.wikiApiService.getAnnoucements(this.companyId);
      this.announcements = data as Announcement[]
    }
  }

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  async handleCreateAnnouncement(announcementData: any) {
    try {
      await this.wikiApiService.createAnnouncement(announcementData);
      const data = await this.wikiApiService.getAnnoucements(
        this.isAdmin() ? this.adminCompanyId : this.companyId
      );
      this.announcements = data as Announcement[];
      this.showCreateModal = false;
    } catch (error) {
      console.error('Error creating announcement:', error);
    }
  }

  isAdmin(): boolean {
    const currentUser = this.userService.getCurrentUser();
    return currentUser && currentUser.admin === "true";
  }

}
  
