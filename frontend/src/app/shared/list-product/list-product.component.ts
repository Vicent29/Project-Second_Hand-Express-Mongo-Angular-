import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { UserService, User } from 'src/app/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ProductListComponent implements OnInit {

  listProducts: Product[] = [];
  listCategories: Category[] = [];
  slug_Category: String = '';
  listProductByCategory: [] = [];
  favorite: Product[] = []
  currentUser: User = {} as User;
  emit : String[] = []

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
    author: string;
  }[] = [];

  params: any = {
    limit: 6,
    page: 1,
    offset: 0,
  };

  constructor(
    private ProductService: ProductService,
    private CategoryService: CategoryService,
    private ActivatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.routeFilters = atob(
      this.ActivatedRoute.snapshot.paramMap.get('filters') || ''
    );
    this.slug_Category =
      this.ActivatedRoute.snapshot.paramMap.get('slug') || '';
    this.setPageTo(this.currentPage);

    this.userService.currentUser.subscribe({
      next: (user: User) => {
        if (user.username == null) { console.log("no user logged") }
        else {
          this.currentUser = user
        }
      }
    })
  }

  getHighlight(user: User) {
    this.ProductService.fav_products_user(user.email).subscribe({
      next: (alldata) => {

        let slugs: Product[] = []
        alldata.map(data => { slugs.push(data.slug) })
        this.listProducts.map(product => {
          if (slugs.indexOf(product.slug) == -1) {
            product['favorited'] = false
          } else {
            product['favorited'] = true
          }
        })
        this.emit = JSON.parse(JSON.stringify(this.listProducts))
      },
      error: (e) => { console.log(e) },

    })
  }

  getListProduct(filters: {}) {
    if (this.routeFilters == '') {
      this.routeFilters = filters;
      this.noenter = 1;
    } else {
      if (this.noenter == 0) {
        this.noenter = 1;
        filters = JSON.parse(String(this.routeFilters));
        this.routeFilters = [];
      }
    }

    let search = JSON.parse(JSON.stringify(filters)).search;
    filters = { ...filters, search: search, category: this.slug_Category };

    if (filters != undefined) {
      this.filters = filters;
    }

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
            author: productsCurrenPage[i].author
          });
        }

        this.listProducts = this.data_prod;
        this.getHighlight(this.currentUser)
        this.totalPages = Array.from(
          new Array(Math.ceil(ProductCount / this.params.limit)),
          (val, index) => index + 1
        );
      },
      error: (e) => {
        console.error(e);
      },
    });
    // }
  }

  setPageTo(pageNumber: number) {
    this.currentPage = pageNumber;
    this.params.offset = this.params.limit * (this.currentPage - 1);
    this.getListProduct(this.filters);
  }

  onToggleFavorite(favorited: boolean, product: Product) {
    product['favorited'] = favorited;
  }
}
