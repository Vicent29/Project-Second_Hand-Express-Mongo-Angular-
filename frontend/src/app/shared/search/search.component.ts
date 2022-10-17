import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public formSearch: FormGroup;
  emit: { search: string } = { search: '' };

  @Output() filterEvent: EventEmitter<{}> = new EventEmitter();

  constructor(
    private location: Location,
    private Router: Router,
    private fb: FormBuilder
  ) {
    this.formSearch = this.fb.group({
      search: '',
    });
  }

  ngOnInit(): void {}

  getSearch() {
    let data_search = this.formSearch.get('search')?.value;
    this.emit = { search: data_search };
    const filters= this.emit;
    if (this.Router.url.split('/')[1] === 'home') {
      const url: String = `/shop/${btoa(JSON.stringify(filters))}`;
      this.Router.navigate([url]);
    }else {
        this.filterEvent.emit(this.emit);
    }
  }
}


