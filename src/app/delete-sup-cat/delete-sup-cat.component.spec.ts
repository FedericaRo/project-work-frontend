import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSupCatComponent } from './delete-sup-cat.component';

describe('DeleteSupCatComponent', () => {
  let component: DeleteSupCatComponent;
  let fixture: ComponentFixture<DeleteSupCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSupCatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSupCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
