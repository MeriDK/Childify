import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyParentItemComponent } from './family-parent-item.component';

describe('FamilyParentItemComponent', () => {
  let component: FamilyParentItemComponent;
  let fixture: ComponentFixture<FamilyParentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyParentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyParentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
