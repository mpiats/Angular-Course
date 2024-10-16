import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tap } from 'rxjs';

function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn){ // for requests
  // const req = request.clone({
  //   headers: request.headers.set('X-DEBUG', 'TESTING'),
  // });
  console.log('[Outgoing Request]');
  console.log(request);
  return next(request).pipe(
    tap({
      next: event => {if(event.type === HttpEventType.Response){
        console.log('[Incoming Response]');
        console.log(event.status);
        console.log(event.body);
      }}
    })
  ); // this is essential line
}



// for modules will be using .modules folder to inject HttpClient
bootstrapApplication(AppComponent, { 
    providers: [provideHttpClient(withInterceptors([loggingInterceptor]))] // withInterceptors you pass functions that execute on every http request
}).catch(
  (err) => console.error(err)
);

// !!!!  to start backend run npm start 
