import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { CategoryComponent } from './category/category.component';
import { CategoryGroupComponent} from './category-group/category-group.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AppComponent,  CategoryComponent, CategoryGroupComponent],
  bootstrap: [ AppComponent]
})
export class AppModule { }
