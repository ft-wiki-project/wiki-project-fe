import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WikiApiService {
  private baseUrl = "http://localhost:8080"
  private userData: any;

  constructor(private http: HttpClient) { }

  async userLogin(username: string, password: string) {

    const requestBody = {
      username: username,
      password: password
    }

    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'      
      }
    }

    let data = await this.http.post(`${this.baseUrl}/users/login`, requestBody, httpOptions).toPromise();

    return data;
  }

  async getAnnoucements(companyId: string) {
    let data = await this.http.get(`${this.baseUrl}/announcements/${companyId}`).toPromise();
    return data;
  }

  async getTeams(userId: string) {
    let data = await this.http.get(`${this.baseUrl}/teams/${userId}/users`).toPromise();
    return data;
  }

  async getProjects(teamId: string) {
    let data = await this.http.get(`${this.baseUrl}/projects/${teamId}`).toPromise();
    return data;
  }

  async updateProject(projectId: string, projectData: any) {
    const requestBody = projectData;

    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    let data = await this.http.patch(`${this.baseUrl}/projects/${projectId}`, requestBody, httpOptions).toPromise();
    return data;
  }

  async createProject(projectData: any) {
    const requestBody = projectData;

    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    let data = await this.http.post(`${this.baseUrl}/projects`, requestBody, httpOptions).toPromise();
    return data;
  }

  async getAllUsersForACompany(companyId: string) {
    let data = await this.http.get(`${this.baseUrl}/companies/${companyId}/users`).toPromise();
    return data;
  }

  async createTeam(teamData: any) {
    const requestBody = teamData;

    const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    let data = await this.http.post(`${this.baseUrl}/teams`, requestBody, httpOptions).toPromise();
    return data;
  }

    return data;
  }

  async getTeamsByCompanyId(companyId: string) {
    let data = await this.http.get(`${this.baseUrl}/teams/${companyId}`).toPromise();

    return data;
  }

  async getCompanies(userId: string) {
    let data = await this.http.get(`${this.baseUrl}/companies/${userId}`).toPromise();
    return data;
  }
}
