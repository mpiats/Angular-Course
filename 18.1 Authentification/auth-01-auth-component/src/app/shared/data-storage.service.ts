import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { exhaustMap, map, take, tap } from "rxjs/operators";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        //"https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json",
        "https://ng-deployment-example-9b5f8-default-rtdb.europe-west1.firebasedatabase.app/recipes.json",
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        //"https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json",
        "https://ng-deployment-example-9b5f8-default-rtdb.europe-west1.firebasedatabase.app/recipes.json",
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );

    // in case I implement token here
    // return this.authService.user
    //   .pipe(
    //     take(1),
    //     exhaustMap((user) => {  // take(1) takes user 1 time and unsubscribes. with exhaustMap the result of all statement will be anything that returns Map
    //       return this.http.get<Recipe[]>(
    //         //"https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json",
    //         "https://ng-deployment-example-9b5f8-default-rtdb.europe-west1.firebasedatabase.app/recipes.json",
    //         {
    //           params: new HttpParams().set('auth',user.token),
    //         }
    //       );
    //     }),
    //     map((recipes) => {
    //       return recipes.map((recipe) => {
    //         return {
    //           ...recipe,
    //           ingredients: recipe.ingredients ? recipe.ingredients : [],
    //         };
    //       });
    //     }),
    //     tap((recipes) => {
    //       this.recipeService.setRecipes(recipes);
    //     })
    //   );
  }
}
