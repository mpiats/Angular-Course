import { Directive, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {

  userType = input.required<Permission>({alias: 'appAuth'});

  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef); // access to html that is inside tag
  private viewContainerRef = inject(ViewContainerRef); // access to place in the DOM where this template is used

  constructor() { 
    effect(() =>{
      if(this.authService.activePermission() === this.userType()){
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }

}
