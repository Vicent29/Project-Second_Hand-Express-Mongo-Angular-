import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})

export class CarouselListComponent implements OnInit {

  categories?: Category[];

  constructor(private CategoryService: CategoryService) { }

  ngOnInit(): void {
    this.showCategorys();
  }

  showCategorys() {
    this.CategoryService.getAll_Category().subscribe((data) => {
      this.categories= data;
    })
  }
  
}