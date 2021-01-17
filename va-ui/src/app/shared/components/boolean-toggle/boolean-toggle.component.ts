import {
  Component,
  EventEmitter,
  forwardRef,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  MatButtonToggleChange,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { BaseComponent } from '../base/base.component';

export class BooleanToggleChange {
  constructor(
    public source: BooleanToggleComponent,
    public value: boolean | undefined
  ) {}
}
@Component({
  selector: 'app-boolean-toggle',
  templateUrl: './boolean-toggle.component.html',
  styleUrls: ['./boolean-toggle.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BooleanToggleComponent),
      multi: true,
    },
  ],
})
export class BooleanToggleComponent extends BaseComponent implements OnChanges {
  value: boolean;

  disabled: boolean;

  private onChange: (value: boolean) => {};
  private onTouched: () => void;

  @Output()
  change: EventEmitter<BooleanToggleChange> = new EventEmitter<BooleanToggleChange>();

  @ViewChild(MatButtonToggleGroup)
  matButtonToggleGroup: MatButtonToggleGroup;

  constructor() {
    super();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  writeValue(value: any) {
    this.value = value;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onToggleGroupChange(e: MatButtonToggleChange) {
    this.value = e.value;
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  onClickButton(value: boolean) {}
}
