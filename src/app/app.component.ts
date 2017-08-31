import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <a routerLink="/welcome">Welcome</a>
    <router-outlet></router-outlet>`
})
export class AppComponent {
}
