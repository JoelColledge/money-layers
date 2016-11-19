import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1 class="title">Money Layers Accounting</h1>
    <nav>
      <a routerLink="/todos" routerLinkActive="active">Todos</a>
      <a routerLink="/accounts" routerLinkActive="active">Accounts</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppCmp {
}
