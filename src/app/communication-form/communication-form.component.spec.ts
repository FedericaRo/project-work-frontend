import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationFormComponent } from './communication-form.component';

describe('CommunicationFormComponent', () => {
  let component: CommunicationFormComponent;
  let fixture: ComponentFixture<CommunicationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunicationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
