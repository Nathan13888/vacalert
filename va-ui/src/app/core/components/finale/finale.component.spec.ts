import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinaleComponent } from './finale.component';

describe('FinaleComponent', () => {
  let component: FinaleComponent;
  let fixture: ComponentFixture<FinaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
