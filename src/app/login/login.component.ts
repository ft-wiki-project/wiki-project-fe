import { Component } from '@angular/core';
import { WikiApiService } from '../services/wiki-api.service';
import { Router } from '@angular/router';

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

  constructor(private wikiApiService: WikiApiService, private router: Router) { }

  async onSubmit() {
    try {
      const response = await this.wikiApiService.userLogin(this.username, this.password);
      console.log('Login successful:', response);
      this.message = 'Login successful!';
      this.messageType = 'success-message';
      localStorage.setItem("user", JSON.stringify(response));
      setTimeout(() => {
        this.router.navigate(['/announcements']);
        // or if they are an admin, navigate to the Companny Selection page.
      }, 1000);
    } catch (error) {
      console.error('Login failed:', error);
      this.message = 'Login failed. Please check your username and password.';
      this.messageType = 'error-message';
    }
  }
}
