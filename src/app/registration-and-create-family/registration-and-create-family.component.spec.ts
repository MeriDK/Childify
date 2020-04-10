import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationAddCreateFamilyComponent } from './registration-add-create-family.component';

describe('RegistrationAddCreateFamilyComponent', () => {
  let component: RegistrationAddCreateFamilyComponent;
  let fixture: ComponentFixture<RegistrationAddCreateFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationAddCreateFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationAddCreateFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
