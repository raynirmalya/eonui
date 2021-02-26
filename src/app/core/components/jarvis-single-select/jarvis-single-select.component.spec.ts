import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JarvisSingleSelectComponent } from './jarvis-single-select.component';

describe('JarvisSingleSelectComponent', () => {
  let component: JarvisSingleSelectComponent;
  let fixture: ComponentFixture<JarvisSingleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JarvisSingleSelectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JarvisSingleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
