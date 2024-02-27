import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListingsComponent } from './search-listings.component';

describe('SearchListingsComponent', () => {
  let component: SearchListingsComponent;
  let fixture: ComponentFixture<SearchListingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchListingsComponent]
    });
    fixture = TestBed.createComponent(SearchListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
