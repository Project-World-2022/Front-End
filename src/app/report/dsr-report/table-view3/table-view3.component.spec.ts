import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableView3Component } from './table-view3.component';

describe('TableView3Component', () => {
  let component: TableView3Component;
  let fixture: ComponentFixture<TableView3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableView3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableView3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
