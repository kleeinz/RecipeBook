import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode = 'new';
  selectOptions = ['Easy', 'Normal', 'Hard'];
  recipeForm: FormGroup;

  constructor(private navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private toastController: ToastController,
    private recipesService: RecipesService,
    private navController: NavController) {

  }

  public ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  onSubmit() {
    const value = this.recipeForm.value;
    let ingredients = [];
    if (value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name => {
        return {name: name, amount: 1}
      });
    }
    this.recipesService.addRecipe(value.title, value.description, value.difficulty, value.ingredients);
    this.recipeForm.reset();
    this.navController.popToRoot();
  }

  private initializeForm() {
      this.recipeForm = new FormGroup({
        'title': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required),
        'difficulty': new FormControl('Normal', Validators.required),
        'ingredients': new FormArray([])
      });
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert();
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'desctructive',
          handler: () => {
            const formArray: FormArray = <FormArray> this.recipeForm.get('ingredients');
            const len = formArray.length;
            if (len > 0) {
              for (let i = len -1; i>= 0; i--) {
                formArray.removeAt(i);
              }
              const toast = this.toastController.create({
                message: 'All Ingredients were deleted',
                duration: 1500,
                position: 'bottom'
              });
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    const newIngredientAlert = this.alertController.create({
      title: 'Add Ingredient',
      inputs: [{
        name: 'name',
        placeholder: 'Name'
      }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if(data.name.trim() == '' || data.name == null) {
                const toast = this.toastController.create({
                  message: 'Please enter a valid value',
                  duration: 1500,
                  position: 'bottom'
                });
                toast.present();
                return;
            }
          (<FormArray> this.recipeForm.get('ingredients'))
            .push(new FormControl(data.name, Validators.required));
            const toast = this.toastController.create({
              message: 'Item Added',
              duration: 1500,
              position: 'bottom'
            });
          }
        }
      ]
    });
    newIngredientAlert.present();
  }
}
