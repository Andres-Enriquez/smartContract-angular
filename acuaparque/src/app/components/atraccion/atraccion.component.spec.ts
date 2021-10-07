import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtraccionComponent } from './atraccion.component';

describe('AtraccionComponent', () => {
  let component: AtraccionComponent;
  let fixture: ComponentFixture<AtraccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtraccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtraccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
