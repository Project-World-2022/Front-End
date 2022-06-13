import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionReportTable2Component } from './correction-report-table2.component';

describe('CorrectionReportTable2Component', () => {
  let component: CorrectionReportTable2Component;
  let fixture: ComponentFixture<CorrectionReportTable2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrectionReportTable2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionReportTable2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
