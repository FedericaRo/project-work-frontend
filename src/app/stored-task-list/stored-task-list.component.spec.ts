import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredTaskListComponent } from './stored-task-list.component';

describe('StoredTaskListComponent', () => {
  let component: StoredTaskListComponent;
  let fixture: ComponentFixture<StoredTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoredTaskListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoredTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
