import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { LazyLoadComponent } from './lazy-load.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'lazy-load', component: LazyLoadComponent },
    ])
  ],
  exports: [RouterModule]
})
export class LazyLoadRoutingModule { }
