import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Mascota } from './mascota';

describe('Mascota', () => {
  let component: Mascota;
  let fixture: ComponentFixture<Mascota>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mascota],
    }).compileComponents();

    fixture = TestBed.createComponent(Mascota);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
