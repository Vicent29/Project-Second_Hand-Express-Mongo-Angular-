import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../core/models/profile.model';
import { User, UserService, ProfilesService } from '../core';
import { concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: Profile = {} as Profile;
  currentUser: User = {} as User;
  isUser: boolean = false;
  emit: {} = {};
  countFollowers : number=0;
  countFollowing: number = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private profilesService: ProfilesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.profile = data['profile']['user'] as Profile;
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

   

    this.profilesService.getfollows().subscribe((data) => {
      data.map((user) => {         
        if (this.profile.email == user.email) {
          this.profile.following = true
        }
      });
      this.emit = JSON.parse(JSON.stringify(this.profile))
    });


    this.profilesService.getCountFoll(this.profile.email).subscribe((data) => {
      this.countFollowers = JSON.parse(JSON.stringify(data)).followers;
      this.countFollowing = JSON.parse(JSON.stringify(data)).following;
    });

    
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }
}
