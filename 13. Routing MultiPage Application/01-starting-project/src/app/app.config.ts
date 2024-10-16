import { ApplicationConfig } from '@angular/core';
import { routes } from './app.routes';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
        routes, 
        withComponentInputBinding(), 
        withRouterConfig({
            paramsInheritanceStrategy: 'always',
        })),
  ], // for several pages , withRouterConfig for child routes to extract info from parent url as input
};
