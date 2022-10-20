import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService, User } from '../core';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authType: String = '';
  title: String = '';
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private UserService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private notifyService: NotificationService
  ) {
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      if (this.authType === 'register') {
        this.authForm = this.fb.group({
          'username': ['', Validators.required],
          'email': ['', Validators.required],
          'password': ['', Validators.required]
        });
      }
      this.cd.markForCheck();
    });
  }

  submitForm() {
    this.isSubmitting = true;
    const credentials = this.authForm.value;

    this.UserService.attemptAuth(this.authType, credentials).subscribe(
      (data) => {
        console.log(data);

        this.notifyService.showSuccess('Ya estás dentro', 'Whispop');
        // this.router.navigateByUrl('/');
      },
      (err) => {
        this.notifyService.showError(
          'Ha habido algún error en el formulario, compruebe que los datos estén corréctamente',
          'Whispop'
        );

        this.isSubmitting = false;
        this.cd.markForCheck();
      }
    );
  }//submitForm
}//class