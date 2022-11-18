import { Component, OnInit } from '@angular/core';
import { UserService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

// export class AppComponent implements OnInit {
export class AppComponent {
  title = 'Express_Mongo_Angular';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.populate();
  }
}
