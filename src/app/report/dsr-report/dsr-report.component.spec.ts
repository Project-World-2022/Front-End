import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DSRReportComponent } from './dsr-report.component';

describe('DSRReportComponent', () => {
  let component: DSRReportComponent;
  let fixture: ComponentFixture<DSRReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DSRReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DSRReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
