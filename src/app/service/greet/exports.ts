import { InjectionToken, Injector, Injectable } from '@angular/core';
import { ModuleInjectorPromise } from '../../angular_core';
import * as exportTypes from './greet.module';
import { retrieveFromModuleInjectorPromise } from '../../angular_core';

/**
 * NOTE: The next two lines are only needed because WebPack is not smart enough to have imports from
 * lazy loaded chunks. 
 * 
 * NOTE: I don't know if Closure Compiler has similar limitations, but from what I (@mhevery) can tell
 * Closure Compiler should support imports across lazy loaded code, and hence this may not be needed.
 * 
 * 
 * The next line exports the `Greeter` type, but hides the `Greeter` value. It does so by creating a new 
 * `Greeter` value which can live in the root code chunk and which would take up minimal amount of bytes.
 * The `Greeter` should ideally by `new InjectionToken<Greeter>` but there is a bug in the way TypeScript
 * processes files in @angular/cli and it relies on the fact that Type should be a function. 
 * Hence it is a function.
 */
export type Greeter = exportTypes.Greeter;
export function Greeter() {};

/**
 * Creates a factory which forwards the service lookup from the NgModule where it is needed to the
 * NgModule where it is declared.
 */
export const greeterFactory = retrieveFromModuleInjectorPromise(Greeter);

/**
 * For each NgModule which should be lazy loaded we create a factory which will do the loading.
 * 
 * This definition assumes that we will lazy load using System.import, but other implementations 
 * such as Closure Compiler should be possible following the same strategy.
 */
@Injectable()
export class GreeterModuleInjectorPromise extends ModuleInjectorPromise {
  /**
   * We also provide the mapping providers. These providers are responsible for coping the services 
   * from this module to the module where they are needed.
   * 
   * Ideally Angular should support this natively. Will work on a proposal (@mhevery).
   */
  static PROVIDERS = [
    { provide: Greeter, useFactory: greeterFactory, deps: [GreeterModuleInjectorPromise] }    
  ]

  constructor(injector: Injector) {
    super(injector, './service/greet/greet.module#GreetModule');
  }
}