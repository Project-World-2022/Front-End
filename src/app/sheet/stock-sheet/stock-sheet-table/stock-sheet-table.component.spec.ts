import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSheetTableComponent } from './stock-sheet-table.component';

describe('StockSheetTableComponent', () => {
  let component: StockSheetTableComponent;
  let fixture: ComponentFixture<StockSheetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockSheetTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSheetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
