import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: 'ng-template[jsimLazyContent]'
})
export class LazyContentDirective {
  viewLoaded: boolean = false;

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {
    this.viewContainer.clear();
    this.viewLoaded = false;
  }

  public showContent(){
    if(!this.viewLoaded){
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.viewLoaded = true;
    }
  }
}
