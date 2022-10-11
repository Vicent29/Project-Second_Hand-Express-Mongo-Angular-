import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})

export class ProductListComponent implements OnInit {

  listProducts: Product[] = [];
  listCategories: Category[] = [];
  slug_Category: String = '';
  listProductByCategory: [] = [];

  currentPage: number = 1;
  totalPages: Array<number> = [];

  params: any = {
    limit: 6,
    page: 1,
    offset: 0,
    // slug_Category: this.slug_Category
  }

  constructor(
    private ProductService: ProductService,
    private CategoryService: CategoryService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.slug_Category =
      this.ActivatedRoute.snapshot.paramMap.get('slug') || '';
      this.setPageTo(this.currentPage);
  }

  get_products(): void {

    if (this.slug_Category !== '') {
        this.CategoryService.FindProductByCategory(this.slug_Category).subscribe({
        next: (data) => {
           this.listProducts = data;},
        error: (e) => {console.error(e);},
      });
    } else {
      this.ProductService.getAll_Products(this.params).subscribe({
        next: (data) => {
          let all_dates_products = JSON.parse(JSON.stringify(data));
          let productsCurrenPage= all_dates_products[0];
          let ProductCount = all_dates_products[1];

          this.listProducts = productsCurrenPage;
          this.totalPages = Array.from(
            new Array(Math.ceil(ProductCount / this.params.limit)),
            (val, index) => index + 1
          );

        },
        error: (e) => console.error(e),
      });
    }
  }

  setPageTo(pageNumber: number) {
    this.currentPage = pageNumber;
    this.params.offset = this.params.limit * (this.currentPage -1);
    this.get_products();
  }
}
