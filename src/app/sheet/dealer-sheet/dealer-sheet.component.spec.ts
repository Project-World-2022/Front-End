import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerSheetComponent } from './dealer-sheet.component';

describe('DealerSheetComponent', () => {
  let component: DealerSheetComponent;
  let fixture: ComponentFixture<DealerSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
