import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableView1Component } from './table-view1.component';

describe('TableView1Component', () => {
  let component: TableView1Component;
  let fixture: ComponentFixture<TableView1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableView1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableView1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
