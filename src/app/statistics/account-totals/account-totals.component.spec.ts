import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTotalsComponent } from './account-totals.component';

describe('AccountTotalsComponent', () => {
  let component: AccountTotalsComponent;
  let fixture: ComponentFixture<AccountTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTotalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
