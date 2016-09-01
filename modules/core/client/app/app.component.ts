import { Component } from '@angular/core';
import { CategoryComponent } from '../category/category.component'

@Component({
    selector: 'my-app',
    template: `<h1>My First Angular 2 App</h1>
                <category></category>`,
    directives: [CategoryComponent]
})
export class AppComponent { }
