import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStockSheetComponent } from './new-stock-sheet.component';

describe('NewStockSheetComponent', () => {
  let component: NewStockSheetComponent;
  let fixture: ComponentFixture<NewStockSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewStockSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStockSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
