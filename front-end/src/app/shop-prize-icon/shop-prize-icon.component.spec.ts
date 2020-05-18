import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPrizeIconComponent } from './shop-prize-icon.component';

describe('ShopPrizeIconComponent', () => {
  let component: ShopPrizeIconComponent;
  let fixture: ComponentFixture<ShopPrizeIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopPrizeIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPrizeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
