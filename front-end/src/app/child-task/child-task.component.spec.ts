import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildTaskComponent } from './child-task.component';

describe('ChildTaskComponent', () => {
  let component: ChildTaskComponent;
  let fixture: ComponentFixture<ChildTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
