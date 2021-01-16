import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPopoverComponent } from './map-popover.component';

describe('MapPopoverComponent', () => {
  let component: MapPopoverComponent;
  let fixture: ComponentFixture<MapPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapPopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
