import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WikiApiService {
  private baseUrl = "http://localhost:8080"

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
}
