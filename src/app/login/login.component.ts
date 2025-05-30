import { Component } from '@angular/core';
import { WikiApiService } from '../services/wiki-api.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';
  messageType: string = '';

  constructor(
    private wikiApiService: WikiApiService,
    private router: Router,
    private userService: UserService
  ) { }

  async onSubmit() {
    try {
      const response = await this.wikiApiService.userLogin(this.username, this.password);
      this.userService.updateUserData(response);
      this.updateUserStatus()
      this.message = 'Login successful!';
      this.messageType = 'success-message';
      setTimeout(() => {
        if(this.isAdmin()) {
          this.router.navigate(['/select-company']);
        } else {
          this.router.navigate(['/announcements']);
        }
      }, 1000);
    } catch (error) {
      console.error('Login failed:', error);
      this.message = 'Login failed. Please check your username and password.';
      this.messageType = 'error-message';
    }
  }

  async updateUserStatus() {
    const user = this.userService.getCurrentUser();

    if (user && user.id && user.status === 'PENDING') {
      try {
        if (user && user.id) {
          await this.wikiApiService.updateUserStatus(user.id, 'JOINED');
        }
      } catch (error) {
        console.error('Failed to update user status:', error);
      }
    }
  }

  isAdmin(): boolean {
    const currentUser = this.userService.getCurrentUser();
    return currentUser && currentUser.admin === "true";
  }
}
