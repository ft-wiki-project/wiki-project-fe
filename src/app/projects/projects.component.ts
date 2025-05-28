import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WikiApiService } from '../services/wiki-api.service';

interface Project {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})

export class ProjectsComponent {
  projects: Project[] = [];
  teamName: string = '';
  teamId: string = '';

  constructor(
    private route: ActivatedRoute,
    private wikiApiService: WikiApiService
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.teamName = params['teamName'];
    });

    this.route.queryParams.subscribe(async params => {
      this.teamId = params['teamId'];
      try {
        const data: any = await this.wikiApiService.getProjects(this.teamId);
        this.projects = data;
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    });
  }

  isActive(status: string): boolean {
    return status.toUpperCase() === 'ACTIVE'
  }



}
