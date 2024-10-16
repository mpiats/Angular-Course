import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounce, debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl){
  if(control.value.includes('?')){
    return null;
  }

  return { doesNotContainQuestionMark: true };
}

function emailIsUnique(control: AbstractControl){
  if(control.value !== 'test@example.com'){
    return of(null); // need to return observable, using of() because it instantly returns result wrapped as observable
  }

  return of({notUnique: true});
}

let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');

if(savedForm){
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{

  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {

    const savedForm = window.localStorage.getItem('saved-login-form');

    if(savedForm){
      const loadedForm = JSON.parse(savedForm);
      this.form.patchValue({ // makes sure it updates only email property, other ones will be untouched
        email: loadedForm.email,
      })
    }

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value => {
        window.localStorage.setItem('saved-login-form',
          JSON.stringify({ email: value.email })
        )
      }
    });  
    this.destroyRef.onDestroy(() => {subscription.unsubscribe()});
  }

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
    }),
  });

  get emailIsInvalid(){
    return this.form.controls.email.touched 
    && this.form.controls.email.dirty 
    && this.form.controls.email.invalid;
  }

  get passwordIsInvalid(){
    return this.form.controls.password.touched 
    && this.form.controls.password.dirty 
    && this.form.controls.password.invalid;
  }

  onSubmit(){
    console.log(this.form);
    const enteredEmail = this.form.controls.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);
    
  }
}




// template approach
// import {
//   afterNextRender,
//   Component,
//   DestroyRef,
//   inject,
//   viewChild,
// } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import { debounceTime } from 'rxjs';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
// })
// export class LoginComponent {
//   private form = viewChild<NgForm>('form');
//   private destroyRef = inject(DestroyRef);

//   constructor() {
//     afterNextRender(() => {
//       const savedForm = window.localStorage.getItem('saved-login-form');

//       if(savedForm){
//         const loadedFormData = JSON.parse(savedForm);
//         const savedEmail = loadedFormData.email;
//         setTimeout(() => { // need timeout since form is not fully initialized
//           this.form()?.controls['email'].setValue(savedEmail);
//         },1)
//       }

//       const subscription = this.form()?.valueChanges?.pipe(
//         debounceTime(500),
//       ).subscribe({
//         next: (value) =>
//           window.localStorage.setItem(
//             'saved-login-form',
//             JSON.stringify({ email: value.email })
//           ),
//       });
//       this.destroyRef.onDestroy(() => subscription?.unsubscribe());
//     });
//   }

//   onSubmit(formData: NgForm) {
//     console.log(formData);
//     const enteredEmail = formData.form.value.email;
//     const enteredPassword = formData.form.value.password;

//     console.log(enteredEmail, enteredPassword);

//     formData.form.reset();
//   }
// }
