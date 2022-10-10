import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-filter',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.css'],
})

export class FiltersComponent {
    public filtform: FormGroup;
    filtcheck = ['nuevo', "comonuevo", "enbuenestado", "encondicionesaceptables", "lohadadotodo"];

    constructor(private fb: FormBuilder) {
        this.filtform = this.fb.group({
            nuevo: false,
            comonuevo: false,
            enbuenestado: false,
            encondicionesaceptables: false,
            lohadadotodo: false,
            minprice: 0,
            maxprice: 0
        });
    }

    ngOnInit(): void {
    }


    getValues() {
        let values = [];
        for (let row in this.filtcheck) {
            this.filtform.get(this.filtcheck[row])?.value == true ? values.push(this.filtcheck[row]) : false;
        }
        console.log(this.filtform.get('minprice')?.value);
        console.log(values)

    }
}