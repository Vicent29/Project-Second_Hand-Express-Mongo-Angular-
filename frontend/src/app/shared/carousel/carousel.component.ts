import { Component } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: [],
})

export class Carouselslide {
    constructor(private CategoryService: CategoryService) { }

    slides_cat?: Category[] = [];
    slides: string[] = [];
    i = 0;

    ngOnInit(): void {
        this.getCategory();
    }

    getCategory() {
        this.CategoryService.getAll_Category().subscribe((data) => {
            this.slides_cat = data;

            this.slides_cat?.map(cat => {
                this.slides.push(String(cat.img_cat))
            })
        })
    }

    getSlide() {
        return this.slides[this.i];
    }

    getPrev() {
        this.i = this.i === 0 ? 0 : this.i - 1;
    }
    //edit here    
    getNext() {
        this.i = this.i === this.slides.length ? this.i : this.i + 1;
    }


}