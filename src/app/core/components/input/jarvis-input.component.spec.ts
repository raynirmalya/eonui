import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JarvisInputComponent } from './jarvis-input.component';

describe('JarvisInputComponent', () => {
  let component: JarvisInputComponent;
  let fixture: ComponentFixture<JarvisInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JarvisInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JarvisInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
