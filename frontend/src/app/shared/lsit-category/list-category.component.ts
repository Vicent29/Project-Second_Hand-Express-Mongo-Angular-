import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {

  category?: Category[];
  currentCategory: Category = {};
  currentIndex = -1;
  cat_name = '';

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.retrieveCategory();
  }

  retrieveCategory(): void {
    this.categoryService.getAll()
      .subscribe({
        next: (data) => {
          this.category = data;
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveCategory();
    this.currentCategory = {};
    this.currentIndex = -1;
  }

  setActiveCategory(category: Category, index: number): void {
    this.currentCategory = category;
    this.currentIndex = index;
  }

  removeAllCategory(): void {
    this.categoryService.deleteAll()
      .subscribe({
        next: (res) => {
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentCategory = {};
    this.currentIndex = -1;

    this.categoryService.findByTitle(this.cat_name)
      .subscribe({        
        next: (data) => {
          this.category = data;
        },
        error: (e) => console.error(e)
      });
  }

}