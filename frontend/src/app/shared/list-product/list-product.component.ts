import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

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
  prodquantity: number = 0;
  routeFilters: {} = {};
  filters: {} = { quality: [''], price: [0, 0] };
  noenter: number = 0;

  data_prod: {
    slug: string;
    prod_nom: string;
    price: string;
    img_prod: string;
  }[] = [];

  params: any = {
    limit: 6,
    page: 1,
    offset: 0,
    // slug_Category: this.slug_Category
  };

  constructor(
    private ProductService: ProductService,
    private CategoryService: CategoryService,
    private ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeFilters = atob(this.ActivatedRoute.snapshot.paramMap.get('filters') || '')
    this.slug_Category = this.ActivatedRoute.snapshot.paramMap.get('slug') || '';

    this.setPageTo(this.currentPage);
  }


  getListProduct(filters: {}) {

    if (this.routeFilters == "") {
      this.routeFilters = filters;
      this.noenter = 1;
    } else {
      if (this.noenter == 0) {
        this.noenter = 1;
        filters = JSON.parse(String(this.routeFilters));
        this.routeFilters = [];
      }
    }

    if (this.slug_Category !== '') {
      this.CategoryService.FindProductByCategory(this.slug_Category).subscribe({
        next: (data) => {
          this.listProducts = data;
        },
        error: (e) => {
          console.error(e);
        },
      });
    } else {
      if (filters != undefined) {
        this.filters = filters;
      }
      let search = JSON.parse(JSON.stringify(filters)).search
      filters = { ...filters, search: search };

      this.ProductService.getListProduct(filters, this.params).subscribe({
        next: (data) => {

          let all_dates_products = JSON.parse(JSON.stringify(data));
          if (data[1] != this.prodquantity) {
            this.prodquantity = JSON.parse(JSON.stringify(data[1]));
            this.setPageTo(1);
          }

          let productsCurrenPage = all_dates_products[0];
          let ProductCount = all_dates_products[1];
          this.data_prod = [];
          for (let i = 0; i < productsCurrenPage.length; i++) {
            this.data_prod.push({
              slug: productsCurrenPage[i].slug,
              prod_nom: productsCurrenPage[i].prod_nom,
              price: productsCurrenPage[i].price,
              img_prod: productsCurrenPage[i].img_prod[0],
            });
          }

          this.listProducts = this.data_prod;
          this.totalPages = Array.from(
            new Array(Math.ceil(ProductCount / this.params.limit)),
            (val, index) => index + 1
          );
        },
        error: (e) => {
          console.error(e);
        },
      });
    }
  }

  setPageTo(pageNumber: number) {
    this.currentPage = pageNumber;
    this.params.offset = this.params.limit * (this.currentPage - 1);
    this.getListProduct(this.filters);
  }
}
