import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WikiApiService } from '../services/wiki-api.service';
import { UserService } from '../services/user-service.service';

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
  showEditModal = false;
  selectedProject: Project | null = null;

  constructor(
    private route: ActivatedRoute,
    private wikiApiService: WikiApiService,
    private userService: UserService
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

  openEditModal(project: Project) {
    this.selectedProject = { ...project };
    this.showEditModal = true;
  }

  async handleSave(updatedProject: Project) {
    console.log('Saving project:', updatedProject);
    try {
      await this.wikiApiService.updateProject(updatedProject.id.toString(), updatedProject);
      const index = this.projects.findIndex(p => p.id === updatedProject.id);
      if (index !== -1) {
        this.projects[index] = updatedProject;
      }
      this.showEditModal = false;
    } catch (error) {
      console.error('Error updating project:', error);
    }
  }

  closeModal() {
    this.showEditModal = false;
    this.selectedProject = null;
  }

  isActive(status: string): boolean {
    return status.toUpperCase() === 'ACTIVE'
  }

  isAdmin(): boolean {
    const currentUser = this.userService.getCurrentUser();
    return currentUser && currentUser.admin === "true";
  }
}
