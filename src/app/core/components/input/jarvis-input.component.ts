import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Self,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'jv-input',
  templateUrl: './jarvis-input.component.html',
  styleUrls: ['./jarvis-input.component.scss'],
})
export class JarvisInputComponent
  implements OnInit, ControlValueAccessor, AfterViewInit {
  @ViewChild('input', { static: true }) input: ElementRef;
  @Input() label: string;
  @Input() classes: string;
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() min: string = '';
  @Input() max: string = '';
  @Input() pattern: string = '';
  @Input() title: string = '';
  @Input() placeholder: string = '';
  @Input() autofocus: boolean = false;
  @Input() autocomplete: string = 'off';
  @Input() required: boolean = false;
  @Input() styleType: string = 'style4';

  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() keyup: EventEmitter<any> = new EventEmitter();
  @Output() keydown: EventEmitter<any> = new EventEmitter();
  @Output() keypress: EventEmitter<any> = new EventEmitter();
  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {}

  writeValue(obj: any): void {
    if (obj !== undefined && obj !== null) {
      this.input.nativeElement.value = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onChange($event) {}
  onTouched($event) {}
  ngAfterViewInit() {
    if (this.autofocus) {
      this.input.nativeElement.focus();
    }
  }
}
