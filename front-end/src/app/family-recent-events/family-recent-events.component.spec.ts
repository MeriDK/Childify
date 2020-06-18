import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyRecentEventsComponent } from './family-recent-events.component';

describe('FamilyRecentEventsComponent', () => {
  let component: FamilyRecentEventsComponent;
  let fixture: ComponentFixture<FamilyRecentEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyRecentEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyRecentEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
