import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WikiApiService } from '../services/wiki-api.service';

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
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

  constructor(private route: ActivatedRoute, private wikiApiService: WikiApiService) {}

  async ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('teamId') || '';
    this.teamName = this.route.snapshot.paramMap.get('teamName') || '';

    try {
      const data: any = await this.wikiApiService.getProjects(this.teamId);
      this.projects = data;
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  }

  isActive(status: string): boolean {
    return status.toUpperCase() === 'ACTIVE'
  }



}
