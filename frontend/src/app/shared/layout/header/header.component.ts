import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { User, UserService } from '../../../core';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-header-div',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  controller?= 0
  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) { }

  currentUser!: User;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        this.cd.markForCheck();
      }
    );
  }


  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }
}
