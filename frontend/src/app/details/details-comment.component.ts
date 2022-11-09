import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { Comment, UserService } from '../core';
import { Subscription } from 'rxjs';
import { NotificationService, User } from '../core';

@Component({
  selector: 'app-details-comment',
  templateUrl: './details-comment.component.html',
  styleUrls: ['./details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsCommentComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private notifyService: NotificationService
  ) {}

  private subscription!: Subscription;

  @Input() comment!: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();

  canModify!: boolean;
  myUser!: String

  ngOnInit() {
    // Load the current user's data
    this.subscription = this.userService.currentUser.subscribe(
      (userData: User) => {
        this.myUser = userData.username;
        this.canModify = userData.username === this.comment.author.username;
        this.cd.markForCheck();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }

  nodeleted() {
    this.notifyService.showWarning('No puedes borrar el comentario, asegurese de que sea su comentario', this.myUser.toUpperCase());

  }
}
