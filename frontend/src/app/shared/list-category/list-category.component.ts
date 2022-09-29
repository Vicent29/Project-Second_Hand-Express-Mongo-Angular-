import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})

export class CategoryListComponent implements OnInit {

  categories?: Category[];

  constructor(private CategoryService: CategoryService) { }

  ngOnInit(): void {
    this.showCategorys();
  }

  showCategorys() {
    this.CategoryService.getAll().subscribe((data) => {
      this.categories= data;
    })
  }
  
}