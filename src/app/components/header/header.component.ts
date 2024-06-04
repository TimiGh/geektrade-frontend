import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: any = {username: 'Timi Gherle'};
  protected navigationTargets = NavigationTargets;

  constructor(
    private router: Router
  ) {
  }

  isUser(): boolean {
    return !!localStorage.getItem('userData');
  }

  goHome(): void {
    this.router.navigate(['']).then();
  }

  goToLoginPage(): void {
    this.router.navigate(['login']).then();
  }

  navigateTo(target: string): void {
    let command: string;
    switch (target) {
      case this.navigationTargets.PROFILE:
        command = 'profile';
        break;
      case this.navigationTargets.NEW_LISTING:
        command = 'profile/add-listing';
        break;
      case this.navigationTargets.PERSONAL_LISTINGS:
        command = 'profile/my-listings';
        break;
      default:
        command = '';
        break;
    }

    this.router.navigate([command]).then();
  }

  logout(): void {
    if (localStorage.getItem('userData')) {
      localStorage.removeItem('userData')
      this.router.navigate(['/login']).then();
    }
  }
}

export enum NavigationTargets {
  PROFILE = 'profile',
  NEW_LISTING = 'profile/add-listing',
  PERSONAL_LISTINGS = 'profile/my-listings'
}
