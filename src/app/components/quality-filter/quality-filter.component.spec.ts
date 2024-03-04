import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityFilterComponent } from './quality-filter.component';

describe('QualityFilterComponent', () => {
  let component: QualityFilterComponent;
  let fixture: ComponentFixture<QualityFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QualityFilterComponent]
    });
    fixture = TestBed.createComponent(QualityFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
