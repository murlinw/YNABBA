import {Category} from '../Category/category'

/**
 * Used to define a group of categories
 * 
 * Ex. Groceries, Fuel, Spending Money, Restaurants can be
 *     grouped together as Everyday Expenses
 */
export class CategoryGroup {
    constructor (
        public name: String, 
        public categories: [Category]
    ) {}
}
