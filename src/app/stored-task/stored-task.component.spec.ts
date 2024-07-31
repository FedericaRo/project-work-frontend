import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredTaskComponent } from './stored-task.component';

describe('StoredTaskComponent', () => {
  let component: StoredTaskComponent;
  let fixture: ComponentFixture<StoredTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoredTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoredTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
