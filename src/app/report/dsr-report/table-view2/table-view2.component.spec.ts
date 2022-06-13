import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableView2Component } from './table-view2.component';

describe('TableView2Component', () => {
  let component: TableView2Component;
  let fixture: ComponentFixture<TableView2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableView2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
