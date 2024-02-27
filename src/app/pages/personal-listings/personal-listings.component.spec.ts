import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalListingsComponent } from './personal-listings.component';

describe('PersonalListingsComponent', () => {
  let component: PersonalListingsComponent;
  let fixture: ComponentFixture<PersonalListingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalListingsComponent]
    });
    fixture = TestBed.createComponent(PersonalListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
