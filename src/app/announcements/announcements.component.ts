import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WikiApiService } from '../services/wiki-api.service';
import { Router } from '@angular/router';

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
  announcements: Announcement[] = [];
  

  constructor(private wikiApiService: WikiApiService, private router: Router) { }

  
  async ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.companies[0].id) {
      this.companyId = user.companies[0].id
      console.log(this.companyId);
    }

    const data = await this.wikiApiService.getAnnoucements(this.companyId);
    this.announcements = data as Announcement[];



    

  }

}
  
