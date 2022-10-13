import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-filter',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.css'],
})

export class FiltersComponent {
    public filtform: FormGroup;
    routeFilters: {} = {}
    filtcheck = ['Nuevo', "ComoNuevo", "EnBuenEstado", "EnCondicionesAceptables", "LoHaDadoTodo"];
    emit: {
        quality: string[],
        price: number[],
    } = { quality: [""], price: [0, 0] };

    @Output() filterEvent: EventEmitter<{}> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private location: Location,
        private ActivatedRoute: ActivatedRoute
    ) {

        this.filtform = this.fb.group({
            Nuevo: false,
            ComoNuevo: false,
            EnBuenEstado: false,
            EnCondicionesAceptables: false,
            LoHaDadoTodo: false,
            minprice: 0,
            maxprice: 0
        });
    }

    ngOnInit(): void {
        this.ActivatedRoute.snapshot.paramMap.get('filters') != undefined ? this.setHighlights() : "a";
        this.routeFilters = atob(this.ActivatedRoute.snapshot.paramMap.get('filters') || '')
    }

    setHighlights() {
        let routeFilters = JSON.parse(atob(this.ActivatedRoute.snapshot.paramMap.get('filters') || ''))
        console.log(routeFilters);

        for (let row in routeFilters.quality) {
            console.log(routeFilters.quality[row].replace(/\s+/g, ''));
            this.filtform.get(routeFilters.quality[row].replace(/\s+/g, ''))?.setValue(true)
        }
        this.filtform.get('minprice')?.setValue(routeFilters.price[0]);
        this.filtform.get('maxprice')?.setValue(routeFilters.price[1]);
    }

    getValues() {
        let min = this.filtform.get('minprice')?.value;
        let max = this.filtform.get('maxprice')?.value;
        let values = [];
        for (let row in this.filtcheck) {
            this.filtform.get(this.filtcheck[row])?.value == true ? values.push(this.filtcheck[row].replace(/([A-Z])/g, ' $1').trim()) : false;
        }
        if (min > max) min = 0, max = 0;
        this.emit = ({ quality: values, price: [min, max] })
        this.location.replaceState('/shop/' + btoa(JSON.stringify(this.emit)));
        this.filterEvent.emit(this.emit)
    }
}