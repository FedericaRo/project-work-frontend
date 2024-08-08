import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTaskTwoComponent } from './single-task-two.component';

describe('SingleTaskTwoComponent', () => {
  let component: SingleTaskTwoComponent;
  let fixture: ComponentFixture<SingleTaskTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleTaskTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleTaskTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
