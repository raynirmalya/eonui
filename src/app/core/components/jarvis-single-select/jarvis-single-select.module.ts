import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JarvisSingleSelectComponent } from './jarvis-single-select.component';
import { FilterPipePipe } from './filter-pipe.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [JarvisSingleSelectComponent, FilterPipePipe],
  imports: [CommonModule, FormsModule],
  exports: [JarvisSingleSelectComponent, FilterPipePipe],
})
export class JarvisSingleSelectModule {}
