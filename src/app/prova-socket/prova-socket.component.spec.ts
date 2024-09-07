import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvaSocketComponent } from './prova-socket.component';

describe('ProvaSocketComponent', () => {
  let component: ProvaSocketComponent;
  let fixture: ComponentFixture<ProvaSocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvaSocketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvaSocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
