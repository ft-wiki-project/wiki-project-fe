import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  firstName: string = '';
  lastInitial: string = '';
  isMenuOpen: boolean = false;
  private userSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userSubscription = this.userService.userData$.subscribe(user => {
      if (user?.profile?.first && user?.profile?.last) {
        this.firstName = user.profile.first;
        this.lastInitial = user.profile.last.charAt(0);
      }
    });

    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      this.userService.updateUserData(currentUser);
    }
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  isHomePage(): boolean {
    return this.router.url === "/";
  }

  isAdmin(): boolean {
    const currentUser = this.userService.getCurrentUser();
    return currentUser && currentUser.admin === "true";
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  isLoggedIn(): boolean {
    const user = this.userService.getCurrentUser();
    return !!user && user.id !== undefined && user.id !== null;
  }
}