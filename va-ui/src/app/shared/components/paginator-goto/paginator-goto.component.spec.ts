import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaginatorGotoComponent } from './paginator-goto.component';

describe('PaginatorGotoComponent', () => {
  let component: PaginatorGotoComponent;
  let fixture: ComponentFixture<PaginatorGotoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginatorGotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorGotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
