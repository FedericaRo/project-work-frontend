import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredPageComponent } from './expired-page.component';

describe('ExpiredPageComponent', () => {
  let component: ExpiredPageComponent;
  let fixture: ComponentFixture<ExpiredPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpiredPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiredPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
