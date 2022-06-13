import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSheetTable2Component } from './stock-sheet-table2.component';

describe('StockSheetTable2Component', () => {
  let component: StockSheetTable2Component;
  let fixture: ComponentFixture<StockSheetTable2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockSheetTable2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSheetTable2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
