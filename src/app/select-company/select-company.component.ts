import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WikiApiService } from '../services/wiki-api.service';
import { UserService } from '../services/user-service.service';


interface Company {
  id: string;
  name: string;
}
@Component({
  selector: 'app-select-company',
  standalone: false,
  templateUrl: './select-company.component.html',
  styleUrl: './select-company.component.css'
})


export class SelectCompanyComponent implements OnInit {
  companies: Company[] = [];
  selectedCompanyId: string = '';

  constructor(
    private wikiApiService: WikiApiService,
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const userData = this.userService.getCurrentUser();
      if (userData && userData.id) {
        const data: any = await this.wikiApiService.getCompanies(userData.id);
        this.companies = data;
      }
    } catch (error) {
      console.error('Error loading companies:', error);
    }
  }

  onCompanySelect() {
    localStorage.setItem('selectedCompanyId', this.selectedCompanyId);
    this.router.navigate(['/announcements']);
  }
}
