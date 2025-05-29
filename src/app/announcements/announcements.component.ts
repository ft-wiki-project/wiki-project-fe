import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WikiApiService } from '../services/wiki-api.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service.service';

interface Announcement {
  date: string;
  message: string;
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

  isAdmin(): boolean {
    const currentUser = this.userService.getCurrentUser();
    return currentUser && currentUser.admin === "true";
  }

}
  
