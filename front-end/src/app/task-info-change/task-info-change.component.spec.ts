import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInfoChangeComponent } from './task-info-change.component';

describe('TaskInfoChangeComponent', () => {
  let component: TaskInfoChangeComponent;
  let fixture: ComponentFixture<TaskInfoChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskInfoChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskInfoChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
