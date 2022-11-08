import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ProductService, Product, Comment, User, CommentsService, UserService } from '../core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgControlStatusGroup } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


    comments!: Comment[];
    product!: Product;
    currentUser!: User;
    canModify!: boolean;
    commentControl = new FormControl();
    commentFormErrors = {};
    isSubmitting = false;
    isDeleting = false;
    emit : String[] = [];
    userimg!: String;

    constructor(
        private ProductService: ProductService,
        private ActivatedRoute: ActivatedRoute,
        private router: Router,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private commentsService: CommentsService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.getProduct(this.ActivatedRoute.snapshot.paramMap.get('slug')!);
        this.populateComments(this.ActivatedRoute.snapshot.paramMap.get('slug')!);

    }

    getProduct(slug: string): void {
        if (slug) {
            this.ProductService.get(slug)
                .subscribe({
                    next: (data) => { console.log(data);
                        

                        this.product = data;
                        this.getUser();
                        this.getHighlight(this.currentUser);
                    },
                    error: (e) => { console.error(e) }
                });
        } else {
        }
    }

    getUser() {
        this.userService.currentUser.subscribe(
            (userData: User) => {
                this.currentUser = userData;
                this.userimg = userData.username;

                this.cd.markForCheck();
            }
        );
    }

    addComment() {
        this.isSubmitting = true;
        this.commentFormErrors = {};

        const commentBody = this.commentControl.value;
        this.commentsService
            .add(this.product.slug, commentBody)
            .subscribe(
                comment => {
                    this.commentControl.reset('');
                    this.isSubmitting = false;
                    this.cd.markForCheck();
                    this.populateComments(this.product.slug)
                    this.redirectTo(`/details/${this.product.slug}`)
                },
                errors => {
                    this.isSubmitting = false;
                    this.commentFormErrors = errors;
                    this.cd.markForCheck();
                }
            );
    }

    cancelComent() {
        var comment = this.commentControl.value;
        this.commentControl.setValue('');
    }

    populateComments(slug: string) {
        this.commentsService.getAll(slug)
            .subscribe(comments => {
                this.canModify = (this.currentUser.username == this.product.author);
                let commentsStr = JSON.parse(JSON.stringify(comments)).comments
                this.comments = commentsStr;
                this.cd.markForCheck();
            });
    }

    trackByFn(index: any, item: Comment) {
        return index;
    }

    onDeleteComment(comment: any) {
        this.commentsService.destroy(comment.id, this.product.slug)
            .subscribe(
                success => {
                    this.comments = this.comments.filter((item) => item !== comment);
                    this.populateComments(this.product.slug)
                    this.cd.markForCheck();
                    this.redirectTo(`/details/${this.product.slug}`)
                    //   this.router.navigate(['/details/',this.product.slug]);
                }
            );
    }

    redirectTo(uri: string) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate([uri]));
    }

    getHighlight(user: User) {

        this.ProductService.fav_products_user(user.email).subscribe({
            next: (alldata) => {
                let slugs : Product[] = []
                alldata.map(data => { slugs.push(data.slug) })
                  if (slugs.indexOf(this.product.slug) == -1) {
                    console.log("no");
                    
                    this.product['favorited'] = false
                  } else {
                    console.log("sii");
                    
                    this.product['favorited'] = true
                  }
                this.emit = JSON.parse(JSON.stringify(this.product))
            },
            error: (e) => { console.log(e) },

        })
    }


    onToggleFavorite(favorited: boolean, product: Product) {
        product['favorited'] = favorited;
    }

}//class