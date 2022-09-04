import { AfterContentInit, Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LazyContentDirective } from './lazy-content.directive';

@Component({
  selector: 'jsim-lazy-expandable',
  templateUrl: './lazy-expandable.component.html',
  styleUrls: ['./lazy-expandable.component.css']
})
export class LazyExpandableComponent implements OnInit, AfterContentInit {

  /** Is the panel open? */
  @Input() isOpen: boolean = false;

  /** Event emitted when isOpen changes */
  @Output() openChanged = new EventEmitter<boolean>();

  /** Hide the arrow icon */
  @Input() hideIcon: boolean = false;

  /** Height of the header when collapsed (in pixels) */
  @Input() headerHeight: number = 48;

  /** Height of the header when expanded (in pixels) */
  @Input() headerHeightExpanded: number = 64;

  /** Speed of the expand and collapse animation (in pixel by milisecond) */
  @Input() animationSpeed: number = 0.5;

  /** Event emitted when animation ends */
  @Output() animationEnd = new EventEmitter<boolean>();

  /** Is expanding and collapsing disabled? */
  @Input() disabled: boolean = false;

  @ViewChild('lazyContent') content: ElementRef | undefined;

  @ContentChild(LazyContentDirective) directive: LazyContentDirective | undefined;

  headerHeightStyle: string = this.headerHeight + 'px';
  contentHeight: string =  this.headerHeight + 'px';

  private currentContentHeight: number = 0;
  private desiredContentHeight: number = 0;
  private timeLastFrame: number = Date.now();
  private animationDuration: number = 0;
  private currentAnimationTime: number = 0;

  private animationFrameRef: number | undefined;

  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.setContentHeight(false);
      if(this.isOpen && this.directive){
        this.directive.showContent();
      }
    }, 0);
  }

  toggleOpen(){
    if(this.disabled){
      return;
    }

    this.isOpen = !this.isOpen;

    if(this.isOpen && this.directive){
      this.directive.showContent();
    }

    this.openChanged.emit(this.isOpen);
    this.setContentHeight();
  }

  private setContentHeight(animate: boolean = true){
    if(animate){
      if(this.isOpen){
        this.headerHeightStyle = this.headerHeightExpanded + 'px';
        this.desiredContentHeight = this.content!.nativeElement.clientHeight;
        this.currentContentHeight = 0;
      } else {
        this.headerHeightStyle = this.headerHeight + 'px';
        this.desiredContentHeight = 0;
        this.currentContentHeight = this.content!.nativeElement.clientHeight;
      }
      this.animationDuration = Math.abs(this.desiredContentHeight - this.currentContentHeight) / this.animationSpeed;
      this.startAnimation();
    } else {
      if(this.isOpen){
        this.headerHeightStyle = this.headerHeightExpanded + 'px';
        this.contentHeight = 'unset';
      } else {
        this.headerHeightStyle = this.headerHeight + 'px';
        this.contentHeight = this.headerHeight + 'px';
      }
    }
  }

  private startAnimation(){
    this.timeLastFrame = Date.now();
    this.currentAnimationTime = 0;
    if(this.animationFrameRef){
      cancelAnimationFrame(this.animationFrameRef);
    }
    this.animationFrameRef = requestAnimationFrame(this.animateHeader.bind(this));
  }

  private animateHeader() {
    const time = Date.now();
    const deltatime = time - this.timeLastFrame;
    this.timeLastFrame = time;
    this.currentAnimationTime += deltatime;

    const amount = this.currentAnimationTime / this.animationDuration;

    this.currentContentHeight = this.lerp(this.currentContentHeight, this.desiredContentHeight, amount);

    if(this.isOpen){
      this.currentContentHeight = Math.min(this.currentContentHeight, this.desiredContentHeight);
      this.contentHeight = this.headerHeightExpanded + this.currentContentHeight + 'px';
    } else {
      this.currentContentHeight = Math.max(this.currentContentHeight, this.desiredContentHeight);
      this.contentHeight = this.headerHeight + this.currentContentHeight + 'px';
    }

    if(this.currentContentHeight == this.desiredContentHeight){
      this.animationEnded();
      return;
    }

    this.animationFrameRef = requestAnimationFrame(this.animateHeader.bind(this));
  }

  private lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  private animationEnded(){
    this.animationEnd.emit(this.isOpen);
    if(this.isOpen){
      this.contentHeight = 'unset';
    }
  }
}
