import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../core/models/profile.model';
import { User, UserService, ProfilesService } from '../core';
import { concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: Profile = {} as Profile;
  currentUser: User = {} as User;
  isUser: boolean = false;
  emit : {} = {}

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private profilesService: ProfilesService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.profile = data['profile']['user'] as Profile;
        console.log(this.profile);
        this.cd.markForCheck();
      },
      error: (e) => console.error(e),
    }); //get profile

    this.userService.currentUser.subscribe({
      next: (data) => {
        this.isUser = data.username === this.profile.username;
        this.cd.markForCheck();
      },
      error: (e) => console.error(e),
    }); //check current user

    let emfollows: String[] = [];
    this.profilesService.getfollows().subscribe((data) => {
      data.map((user) => {
        if (this.profile.email == user.email) {
          this.profile.following = true
        }
      });
      this.emit = JSON.parse(JSON.stringify(this.profile))
    });
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }
} //class
