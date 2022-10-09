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

  constructor(
    private ProductService: ProductService,
    private CategoryService: CategoryService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.slug_Category =
      this.ActivatedRoute.snapshot.paramMap.get('slug') || '';
    this.get_products();
  }

  get_products(): void {
    if (this.slug_Category !== '') {
      this.CategoryService.FindProductByCategory(this.slug_Category).subscribe({
        next: (data) => {
           this.listProducts = data;},
        error: (e) => {console.error(e);},
      });
    } else {
      this.ProductService.getAll_Products().subscribe({
        next: (data) => {
          ////////////////////////////////////Arreglar////////////////////////////////////
          let prueba = JSON.parse(JSON.stringify(data));
          (this.listProducts = prueba[0])},
        error: (e) => console.error(e),
      });
    }
  }
}
