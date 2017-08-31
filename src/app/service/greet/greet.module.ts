/**
 * Example of a lazy loaded module. 
 */

import { NgModule, Injectable } from '@angular/core';
import * as exportTokens from './exports';

@Injectable()
export class Salutation {
  name = 'hello';
}

@Injectable()
export class Greeter {
  constructor(public salutation: Salutation) {}
  greet(name: string) {
    return this.salutation.name + ' ' + name + '!';
  }
}

@NgModule({
  providers: [
    Salutation,
    Greeter,
    /**
     * This is needed to make internal Greeter token to external token. See ./exports for more details.
     */
    {provide: exportTokens.Greeter, useExisting: Greeter}
  ]
})
export class GreetModule { }
