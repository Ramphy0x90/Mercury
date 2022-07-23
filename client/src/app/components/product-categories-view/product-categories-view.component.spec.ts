import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoriesViewComponent } from './product-categories-view.component';

describe('ProductCategoriesViewComponent', () => {
  let component: ProductCategoriesViewComponent;
  let fixture: ComponentFixture<ProductCategoriesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoriesViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoriesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
