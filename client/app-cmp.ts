import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container-fluid">
      <h1 class="title">Money Layers Accounting</h1>
      <nav class="navbar navbar-default">
        <ul class="nav navbar-nav">
          <li><a routerLink="/todos" routerLinkActive="active">Todos</a></li>
          <li><a routerLink="/accounts" routerLinkActive="active">Accounts</a></li>
        </ul>
      </nav>
    </div>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppCmp {
}
