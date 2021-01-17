import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanToggleComponent } from './boolean-toggle.component';

describe('BooleanToggleComponent', () => {
  let component: BooleanToggleComponent;
  let fixture: ComponentFixture<BooleanToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooleanToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
