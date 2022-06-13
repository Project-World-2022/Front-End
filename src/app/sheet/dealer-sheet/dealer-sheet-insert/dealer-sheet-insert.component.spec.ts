import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerSheetInsertComponent } from './dealer-sheet-insert.component';

describe('DealerSheetInsertComponent', () => {
  let component: DealerSheetInsertComponent;
  let fixture: ComponentFixture<DealerSheetInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerSheetInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerSheetInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
