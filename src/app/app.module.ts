import { NgModule, InjectionToken, Injector, Inject, NgModuleFactoryLoader, NgModuleFactory } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Resolve, Routes, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AppComponent } from './app.component';
import { GreeterModuleInjectorPromise } from './service/greet/exports';

/**
 * Definition of the lazy loadable routes.
 */
export const routes: Routes = [
  <Route>{
    path: 'welcome',
    loadChildren: './route/welcome/welcome.module#WelcomeModule'
  },
  /**
   * This route is a fake route to trick @angular/cli to create a separate lazy loadable module.
   * Presumably a better way should be available in future. 
   */
  <Route>{
    path: 'fake-route-workaround',
    loadChildren: './service/greet/greet.module#GreetModule'
  }
];



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    /**
     * This is what will hold a reference to the lazy loaded module. One can have any number of such 
     * lazy loaded modules. Because injector creates instances lazily the act of injecting this token
     * will cause the lazy module to load. 
     */
    GreeterModuleInjectorPromise
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
