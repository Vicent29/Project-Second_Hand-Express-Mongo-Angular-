import { Component } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
    selector: 'app-infinite-scroll',
    templateUrl: './inf-scroll.component.html',
    styleUrls: ['./inf-scroll.component.scss'],
})

export class InfiniteScroll {
    constructor(private CategoryService: CategoryService) {
        // this.getCategories()
    }

    ngOnInit(): void {
        this.getCategories();
    }

    // data: string[] = [];
    data_cat: Category[] = [];
    data: {
        slug: string,
        cat_name: string,
        img_cat: string
    }[] = [];
    data_str: any;
    sum = 3;
    throttle = 100;
    total = 0;
    scrollDistance = 1;
    scrollUpDistance = 2;
    direction = '';



    getCategories() {
        this.CategoryService.getAll_Category().subscribe((data) => {
            this.data_cat = data;
            this.data_str = JSON.parse(JSON.stringify(this.data_cat));
            this.appendItems(0, this.sum);
        })
    }

    addItems(startIndex: number, endIndex = this.sum, _method: string) {
        for (let i = startIndex; (i < (startIndex + endIndex)) && (i < this.data_cat.length); ++i) {
            this.total++;
            this.data.push({ slug: this.data_str[i].slug, cat_name: this.data_str[i].cat_name, img_cat: this.data_str[i].img_cat[1] })
        }
    }

    appendItems(startIndex = 0, endIndex = this.sum) {
        this.addItems(this.total, endIndex, 'push');
    }

    prependItems(startIndex = 0, endIndex = this.sum) {
        this.addItems(this.total, endIndex, 'unshift');
    }

    onScrollDown() {
        console.log('scrolled down!!');
        const start = this.sum;
        this.appendItems(start, this.sum);
        this.direction = 'down'
    }

    onUp() {
        console.log('scrolled up!');
    }
}