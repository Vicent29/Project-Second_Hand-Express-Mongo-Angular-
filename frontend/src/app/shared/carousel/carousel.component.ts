import { Component } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css'],
})

export class Carouselslide {
    constructor(private CategoryService: CategoryService) { }

    slides_cat?: Category[] = [];
    slides: string[] = [];
    total?: number;
    i = 0;

    ngOnInit(): void {
        this.getCategory();
    }

    getCategory() {
        this.CategoryService.getAll_Category().subscribe((data) => {
            this.slides_cat = data;

            this.slides_cat?.map(cat => {
                // Como es tipo Category[] no podia coger la primera imagen de la array, entonces, convirtiendolo en string
                // y al mismo tiempo reconvirtiendolo a array de string si que se puede coger una posicion exacta
                let img_cat = JSON.parse(JSON.stringify(cat.img_cat));
                this.slides.push(img_cat[0]);
                // this.slides.push(String(cat.img_cat))
            })
        })
    }

    getSlide() {        
        return this.slides[this.i];
    }


    getPrev() {
        this.i = this.i === 0 ? 0 : this.i - 1;
        this.currentDotStyle();
    }
    //edit here    
    getNext() {
        this.i = this.i === this.slides.length - 1 ? this.i : this.i + 1;
        this.currentDotStyle();
    }

    gotoSlide(newi: any) {
        this.i = newi;
        this.getSlide();
        this.currentDotStyle();
    }

    currentDotStyle() {
        const cat_lenght = this.slides.length;
        for (let i = 0; i < cat_lenght; i++) {
            const currentDot = document.getElementById("dot" + i) || null;
            currentDot!.classList.remove("dot_active");
        }
        const currentDot = document.getElementById("dot" + this.i) || null;
        currentDot!.className += " dot_active";
    }


}