import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Greeter } from '../../service/greet/exports';

@Component({
  selector: 'app-welcome',
  template: `<h2>Welcome</h2>{{greeter.greet('world')}}`
})
export class WelcomeComponent implements OnInit {

  /**
   * Notice that in the Welcome route one can simply inject the `Greeter` service even thought
   * the `Greeter` service is lazy loaded in a way which makes it a singleton.
   */
  constructor(public greeter: Greeter) { }

  ngOnInit() {
  }

}
