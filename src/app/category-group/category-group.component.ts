import { Component, OnInit } from '@angular/core';
import { CategoryGroup } from './category-group';

@Component({
    selector: 'category-group',
    templateUrl: 'app/category-group/category-group.component.html'
})
export class CategoryGroupComponent implements OnInit {
    categoryGroups: CategoryGroup;

    constructor() { }

    ngOnInit() { }
}
