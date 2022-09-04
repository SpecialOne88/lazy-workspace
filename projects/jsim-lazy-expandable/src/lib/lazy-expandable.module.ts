import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyExpandableComponent } from './lazy-expandable.component';
import { LazyContentDirective } from './lazy-content.directive';

@NgModule({
  declarations: [
    LazyExpandableComponent,
    LazyContentDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LazyExpandableComponent,
    LazyContentDirective
  ]
})
export class LazyExpandableModule { }
