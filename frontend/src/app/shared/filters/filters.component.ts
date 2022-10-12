import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-filter',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.css'],
})

export class FiltersComponent {
    public filtform: FormGroup;
    filtcheck = ['Nuevo', "ComoNuevo", "EnBuenEstado", "EnCondicionesAceptables", "LoHaDadoTodo"];
    emit: {
        quality: string[],
        price: number[],
    } = { quality: [""], price: [0, 0] };

    @Output() filterEvent: EventEmitter<{}> = new EventEmitter();

    constructor(private fb: FormBuilder) {
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
        this.filterEvent.emit(this.emit)
    }
}