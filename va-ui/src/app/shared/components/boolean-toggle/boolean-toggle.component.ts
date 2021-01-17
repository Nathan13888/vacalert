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

export class TriStateToggleChange {
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

  private onChange: () => void;
  private onTouched: () => void;

  @Output()
  change: EventEmitter<TriStateToggleChange> = new EventEmitter<TriStateToggleChange>();

  @ViewChild(MatButtonToggleGroup)
  matButtonToggleGroup: MatButtonToggleGroup;

  constructor() {
    super();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.updateView(changes.value.currentValue);
    }
  }

  writeValue(value: any) {
    this.value = value;
    this.matButtonToggleGroup.value = value;
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

  private updateView(value?: boolean) {
    this.matButtonToggleGroup.value = value;
  }

  onToggleGroupChange(e: MatButtonToggleChange) {
    console.log('onToggleGroupChange :>> ', e);
    // let value: boolean[] = e.value;
    // if (value.length > 1) {
    //   value = [value[1]];
    //   this.matButtonToggleGroup.value = value;
    // }
    // const newValue = this.convertArrayToBoolean(value);
    // if (this.value !== newValue) {
    //   this.value = newValue;
    //   if (this.change)
    //     this.change.emit(new TriStateToggleChange(this, newValue));
    // }
  }

  onClickButton(value: boolean) {
    console.log('onClickButton :>> ', value);
  }

  // private convertArrayToBoolean(arr: boolean[]) {
  //   return arr.length === 0 ? undefined : arr[0];
  // }

  // private convertBooleanToArray(value?: boolean) {
  //   return value === undefined || value === null ? [] : [value];
  // }
}
