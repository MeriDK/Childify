import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyRecentItemComponent } from './family-recent-item.component';

describe('FamilyRecentItemComponent', () => {
  let component: FamilyRecentItemComponent;
  let fixture: ComponentFixture<FamilyRecentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyRecentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyRecentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
