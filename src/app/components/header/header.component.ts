import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;
  protected navigationTargets = NavigationTargets;

  constructor(
    private router: Router,
    private userService: UserService
  ) {


  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(user => {
      this.user = user;
    })
  }

  isUser(): boolean {
    return !!localStorage.getItem('token');
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
    this.user = null;
    this.userService.logout();
    this.router.navigate(['/login']).then();
  }
}

export enum NavigationTargets {
  PROFILE = 'profile',
  NEW_LISTING = 'profile/add-listing',
  PERSONAL_LISTINGS = 'profile/my-listings'
}
