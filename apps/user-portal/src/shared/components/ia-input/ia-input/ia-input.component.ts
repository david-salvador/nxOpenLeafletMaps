import {
    AfterContentInit,
    Component,
    ContentChild,
    HostBinding,
    Input,
    Output,
} from '@angular/core';

import {InputRefDirective} from "../common/input-ref.directive";

@Component({
    selector: 'ia-input',
    templateUrl: './ia-input.component.html',
    styleUrls: ['./ia-input.component.scss']
})
export class IaInputComponent implements AfterContentInit {

    @Input()
    icon: string;

    @ContentChild(InputRefDirective)
    input: InputRefDirective;

    ngAfterContentInit() {
        if (!this.input) {
            console.error("the ia-input needs an input inside its content");
        }
    }

    @HostBinding('class.input-focus')
    get isInputFocus() {
        return this.input ? this.input.focus : false;
    }

    get classes() {

        const cssClasses = {};

        if (this.icon) {
            cssClasses['fa-' + this.icon] = true;
        }

        return cssClasses;
    }

}
