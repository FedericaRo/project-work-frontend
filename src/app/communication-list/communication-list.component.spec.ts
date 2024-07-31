import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationListComponent } from './communication-list.component';

describe('CommunicationListComponent', () => {
  let component: CommunicationListComponent;
  let fixture: ComponentFixture<CommunicationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunicationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
