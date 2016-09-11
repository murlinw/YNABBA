import { Component } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { CategoryGroupComponent} from './category-group/category-group.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [CategoryComponent, CategoryGroupComponent]
})
export class AppComponent { }
