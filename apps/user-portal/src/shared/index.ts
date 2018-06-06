import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRefDirective } from "./components/ia-input/common/input-ref.directive";
import { IaInputComponent } from "./components/ia-input/ia-input/ia-input.component";

export { Place } from './models/place.model';

@NgModule({
    declarations: [
        IaInputComponent,
        InputRefDirective,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        IaInputComponent,
        InputRefDirective,
    ]
})
export class IaUiComponents { }


