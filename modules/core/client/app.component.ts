import { Component } from '@angular/core';
import { CategoryComponent } from './category/category.component';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    directives: [CategoryComponent]
})
export class AppComponent { }
