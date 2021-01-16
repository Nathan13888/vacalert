import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CelebrateComponent } from './celebrate.component';

describe('CelebrateComponent', () => {
  let component: CelebrateComponent;
  let fixture: ComponentFixture<CelebrateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CelebrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelebrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
