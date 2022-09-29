import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  product?: Product[];
  currentProduct: Product = {};
  currentIndex = -1;
  prod_nom = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.retrieveProduct();
  }

  retrieveProduct(): void {
    this.productService.getAll()
      .subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveProduct();
    this.currentProduct = {};
    this.currentIndex = -1;
  }

  setActiveProduct(product: Product, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  removeAllProduct(): void {
    this.productService.deleteAll()
      .subscribe({
        next: (res) => {
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentProduct = {};
    this.currentIndex = -1;

    this.productService.findByTitle(this.prod_nom)
      .subscribe({        
        next: (data) => {
          this.product = data;
        },
        error: (e) => console.error(e)
      });
  }

}