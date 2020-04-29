import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTitleComponent } from './login-title.component';

describe('LoginTitleComponent', () => {
  let component: LoginTitleComponent;
  let fixture: ComponentFixture<LoginTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
