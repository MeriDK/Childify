import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPrizeCategoryComponent } from './shop-prize-category.component';

describe('ShopPrizeCategoryComponent', () => {
  let component: ShopPrizeCategoryComponent;
  let fixture: ComponentFixture<ShopPrizeCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopPrizeCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPrizeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
