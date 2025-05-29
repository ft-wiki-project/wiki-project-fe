import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WikiApiService } from '../services/wiki-api.service';
import { UserService } from '../services/user-service.service';

interface Project {
  id: number;
  name: string;
  description: string;
  active: boolean;
  teamId: string;
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
  showCreateModal = false;
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
        this.projects = this.filterProjectsByUserRole(data);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    });
  }

  private filterProjectsByUserRole(projects: Project[]): Project[] {
  const isAdmin = this.isAdmin();
  if (isAdmin) {
    return projects;
  }
  return projects.filter(project => project.active);
}

  openEditModal(project: Project) {
    this.selectedProject = { ...project };
    this.showEditModal = true;
  }

  openCreateModal() {
    this.showCreateModal = true;
  }


  async handleSave(updatedProject: Project) {
    console.log('Saving project:', updatedProject);
    try {
      await this.wikiApiService.updateProject(updatedProject.id.toString(), updatedProject);
      const data: any = await this.wikiApiService.getProjects(this.teamId);
      this.projects = this.filterProjectsByUserRole(data);
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

  async handleCreateSave(createdProject: Project) {
    createdProject.teamId = this.teamId;
    console.log('Saving project:', createdProject);
    try {
      await this.wikiApiService.createProject(createdProject);
      const data: any = await this.wikiApiService.getProjects(this.teamId);
      this.projects = this.filterProjectsByUserRole(data);
      this.showCreateModal = false;
    } catch (error) {
      console.error('Error creating project:', error);
    }
  }

  closeCreateModal() {
    this.showCreateModal = false;
    this.selectedProject = null;
  }


}
