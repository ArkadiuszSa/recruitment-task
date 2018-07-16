import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() numberOfElements:number = 0;
  @Input() elementsOnPage: number = 10;
  @Output() reloadFromPaginator:EventEmitter<number> = new EventEmitter<number>();
  @Input() reloadToPaginator:EventEmitter<number> = new EventEmitter<any>();
  public buttonsNumber:number = 2;
  public buttonsArr:Array<any>;
  public pageNumber:number = 1;
  public maxPage:number = 1;
  public infoFrom:number = 0;
  public infoTo:number = 0;
  constructor() {}

  ngOnInit() {
    this.reset();
    this.reloadToPaginator.subscribe( (arr) => {
      this.pageNumber = arr[0];
      this.numberOfElements = arr[1];
      this.reset()
    })
  }

  reset() {
    this.manageButtonsNumber();
    this.updateInfo();
  }
  
  firstClick() {
    if(this.pageNumber!==1) {
      this.pageNumber=1;
      this.reload();
    }
  }

  prevClick() {
    if(this.pageNumber > 1) {
      this.pageNumber--;
      this.reload();
    } 
  }

  numberClick(newPageNumber:number) {
    this.pageNumber = newPageNumber;
    this.reload();
  }

  nextClick() {
    if(this.pageNumber < this.maxPage) {
      this.pageNumber++;
      this.reload();
    } 
  }

  lastClick() {
    if(this.pageNumber < this.maxPage){
      this.pageNumber = this.maxPage;
      this.reload();
    } 
  }

  reload(){
    this.reset();
    this.reloadFromPaginator.emit( this.pageNumber );
  }

  updateInfo(){
    this.maxPage = Math.ceil(this.numberOfElements / this.elementsOnPage);
    if(this.numberOfElements===0){
      this.infoFrom=0;
      this.infoTo=0;

    }else if(this.numberOfElements <= this.elementsOnPage) {
      this.infoFrom=1;
      this.infoTo=this.numberOfElements;
    
    }else if(this.pageNumber === this.maxPage) {
      this.infoFrom = this.numberOfElements - ((this.numberOfElements % this.elementsOnPage) || this.elementsOnPage) + 1;
      this.infoTo = this.numberOfElements;

    }else if(this.pageNumber > 1 && this.pageNumber < this.maxPage) {
      this.infoFrom = (this.pageNumber - 1) * this.elementsOnPage + 1;
      this.infoTo = (this.pageNumber) * this.elementsOnPage;

    }else if(this.pageNumber === 1){
      this.infoFrom = 1
      this.infoTo = this.elementsOnPage;
    }
  }

  manageButtonsNumber(){
    if(window.innerWidth < 500){
      this.buttonsArr = Array.from('x'.repeat(1))
      this.buttonsNumber = 1;
    }else{
      this.buttonsArr = Array.from('x'.repeat(2))
      this.buttonsNumber = 2;
    }
  }
}
