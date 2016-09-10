import { Component } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { CategoryGroupComponent} from './category-group/category-group.component';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    directives: [CategoryComponent, CategoryGroupComponent]
})
export class AppComponent { }
