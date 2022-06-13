import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelViewComponent } from './tabel-view.component';

describe('TabelViewComponent', () => {
  let component: TabelViewComponent;
  let fixture: ComponentFixture<TabelViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
