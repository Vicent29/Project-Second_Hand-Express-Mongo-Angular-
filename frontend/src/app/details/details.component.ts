import { Component, OnInit, Input } from '@angular/core';
import { ProductService, Product } from '../core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgControlStatusGroup } from '@angular/forms';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

    @Input() product?: Product;

    constructor(
        private ProductService: ProductService,
        private ActivatedRoute: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {
        console.log(this.ActivatedRoute.snapshot.paramMap.get('slug'))
        this.getProduct(this.ActivatedRoute.snapshot.paramMap.get('slug'));
    }

    getProduct(slug: any): void {
        if (slug) {
            this.ProductService.get(slug)
                .subscribe({
                    next: (data) => {
                        console.log(data);
                        this.product = data;
                    },
                    error: (e) =>  {console.error(e)}
                });
        } else {
        }
    }

    //     getProduct() {
    //         const slug: any = this.ActivatedRoute.snapshot.paramMap.get('slug');
    //         console.log(slug);
    //         console.log(this.ProductService.get("632a144f7709772950281c02"))
    //         if (this.ProductService.get(slug)) {
    //         }
    //         this.product = this.ProductService.product;
    //     } else {
    //     this.ProductService.get_product(slug).subscribe({
    //         next: data => this.ProductService.product = data,
    //         error: e => console.error(e)
    //     });
    // }

    // this.ProductService.product$.subscribe({
    //     next: data => this.product = data,
    //     error: e => console.error(e)
    // })
    //     }
}//class