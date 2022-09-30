// import { Component, OnInit } from '@angular/core';
// import { ProductService, Product, CategoryService, Category } from '../../core';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-products-list',
//   templateUrl: './products-list.component.html',
//   styleUrls: ['./products-list.component.css'],
// })
// export class ProductsListComponent implements OnInit {
//   listProducts: Product[] = [];
//   listCategories: Category[] = [];
//   slug_Category: String = '';

//   constructor(
//     private ProductService: ProductService,
//     private CategoryService: CategoryService,
//     private ActivatedRoute: ActivatedRoute
//   ) {}

//   ngOnInit(): void {
//     this.slug_Category =
//       this.ActivatedRoute.snapshot.paramMap.get('slug') || '';
//     this.get_products();
//   }

//   get_products(): void {
//     if (this.slug_Category !== '') {
//       this.CategoryService.getAll_Categoies(this.slug_Category).subscribe({
//         next: (data) => {
//           this.listProducts = data.products;
//         },
//         error: (e) => {
//           console.error(e);
//         },
//       });
//     } else {
//       this.ProductService.getAll_Products().subscribe({
//         next: (data) => (this.listProducts = data),
//         error: (e) => console.error(e),
//       });
//     }
//   }
// }
