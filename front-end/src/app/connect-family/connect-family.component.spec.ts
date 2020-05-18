import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectFamilyComponent } from './connect-family.component';

describe('ConnectFamilyComponent', () => {
  let component: ConnectFamilyComponent;
  let fixture: ComponentFixture<ConnectFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
