import { NgModule, Injector, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { Greeter, GreeterModuleInjectorPromise } from '../../service/greet/exports';

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: WelcomeComponent,
      /**
       * This is important as it delays the instantiation of `WelcomeComponent` until after the 
       * GreeterModuleInjectorPromise has resolved. Without this the code which forwards
       * `Greeter` lookup in this injector into the `Greeter` in the `GreeterModuleInjector` would 
       * fail as `GreeterModuleInjectorPromise` would not be resolved.
       * 
       * This should be folded into @angular/core. Will work on proposal (@mhevery).
       */
      resolve: {
        'greeterInjector': GreeterModuleInjectorPromise
      }
    }])
  ],
  providers: [
    /**
     * These providers set up forwarding of `Greeter` from this injector into `GreeterModuleInjector`.
     */
    GreeterModuleInjectorPromise.PROVIDERS
  ],
  declarations: [WelcomeComponent]
})
export class WelcomeModule { }
