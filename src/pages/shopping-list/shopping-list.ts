import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingService } from '../../services/shopping.service';
import { Ingredient } from '../../models/ingredient';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingService: ShoppingService) {  }

  ngOnInit(){
      this.loadItems();
  }

  onAddItem(form: NgForm) {
    console.log(form.value.ingredientName, form.value.amount);
    this.shoppingService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  loadItems() {
    this.ingredients = this.shoppingService.getItems();
  }

  onCheckItem(index: number) {
    this.shoppingService.removeItem(index);
    this.loadItems();
  }

}
