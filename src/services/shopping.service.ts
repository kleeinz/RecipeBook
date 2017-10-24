import { Ingredient } from '../models/ingredient';

export class ShoppingService {
  private ingredients: Ingredient[] = [];

  public addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    console.log(this.ingredients);
  }

  public addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  public getItems() {
    return this.ingredients.slice();
  }

  public removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }
}
