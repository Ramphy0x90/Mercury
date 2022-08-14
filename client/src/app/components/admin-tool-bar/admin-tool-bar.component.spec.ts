import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminToolBarComponent } from './admin-tool-bar.component';

describe('AdminToolBarComponent', () => {
  let component: AdminToolBarComponent;
  let fixture: ComponentFixture<AdminToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminToolBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
