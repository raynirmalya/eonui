import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SelectData } from './select-data.model';

@Component({
  selector: 'jv-single-select',
  templateUrl: './jarvis-single-select.component.html',
  styleUrls: ['./jarvis-single-select.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class JarvisSingleSelectComponent implements OnInit {
  @Input() data: SelectData[] = [];
  @Input() selectedItem: SelectData;
  @Output()
  selectedItemChange: EventEmitter<SelectData> = new EventEmitter<SelectData>();
  @ViewChild('search', { static: false }) search: ElementRef;
  @ViewChild('result', { static: false }) result: ElementRef;
  @ViewChildren('menulist') menulist: ElementRef;

  public isActive: boolean = false;
  public arrowkeyLocation = 0;
  public searchText: string = '';
  constructor() {}

  ngOnInit(): void {}

  public toggleActive(): void {
    this.searchText = '';
    this.isActive = !this.isActive;
    setTimeout(() => {
      this.search.nativeElement.focus();
    }, 1000);
  }
  public trackByFn(i: number): number {
    return i;
  }

  public keyDown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case 38: // this is the ascii of arrow up
        if (this.arrowkeyLocation > 0) {
          this.arrowkeyLocation--;
          this.result.nativeElement.scrollTo(
            0,
            this.arrowkeyLocation *
              this.menulist['_results'][this.arrowkeyLocation].nativeElement
                .offsetHeight
          );
        } else if (this.arrowkeyLocation === 0) {
          this.isActive = false;
        }
        break;
      case 40: // this is the ascii of arrow down
        if (this.arrowkeyLocation < this.data.length - 1) {
          this.arrowkeyLocation++;
          this.result.nativeElement.scrollTo(
            0,
            this.arrowkeyLocation *
              this.menulist['_results'][this.arrowkeyLocation].nativeElement
                .offsetHeight
          );
        }
        break;
      case 13:
        this.selectedItem = this.data[this.arrowkeyLocation];
        this.selectedItemChange.emit(this.selectedItem);
        this.arrowkeyLocation = 0;
        this.isActive = false;
        break;
    }
  }

  public selectItem(item: SelectData): void {
    this.selectedItem = item;
    this.arrowkeyLocation = 0;
    this.isActive = false;
    this.selectedItemChange.emit(this.selectedItem);
  }
}
