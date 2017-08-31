/**
 * Set of utility functions which should be provided by @angular/core in the future.
 */

import { Injector, NgModuleFactoryLoader, NgModuleFactory } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export class ModuleInjectorPromise extends Promise<Injector> implements Resolve<Promise<Injector>> {
  injector: Injector = null as any;

  constructor(parentInjector: Injector, modulePath: string) {
    super((resolve, reject) => {
        if (parentInjector) {
          parentInjector.
            get(NgModuleFactoryLoader).
            load(modulePath).
            then((factory: NgModuleFactory<any>) => 
                resolve(this.injector = factory.create(parentInjector).injector), reject);
        }
      });
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Injector> {
    return this;
  }
}

export function retrieveFromModuleInjectorPromise(token: any): (moduleInjectorPromise: ModuleInjectorPromise) => any {
  return function(moduleInjectorPromise: ModuleInjectorPromise): any {
    if (!moduleInjectorPromise.injector) {
      throw new Error('Injector rot resolved yet: ' + moduleInjectorPromise);
    }
    return moduleInjectorPromise.injector.get(token);
  }
}