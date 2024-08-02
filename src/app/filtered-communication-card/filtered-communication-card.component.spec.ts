import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredCommunicationCardComponent } from './filtered-communication-card.component';

describe('FilteredCommunicationCardComponent', () => {
  let component: FilteredCommunicationCardComponent;
  let fixture: ComponentFixture<FilteredCommunicationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteredCommunicationCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteredCommunicationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
