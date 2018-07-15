import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() numberOfElements: number = 0;
  @Input() elementsOnPage: number=10;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() pageReset: EventEmitter<number> = new EventEmitter<number>();
  @Input() buttonsReset: EventEmitter<number> = new EventEmitter<number>();
  public buttonsNumber=2;
  public buttonsArr;
  public pageNumber=1;
  public maxPage;
  public infoFrom=0;
  public infoTo=0;
  constructor() {}

  ngOnChanges() {
    this.buttonsArr= Array.from('x'.repeat(this.buttonsNumber))
    this.maxPage=Math.ceil(this.numberOfElements/this.elementsOnPage);
    this.reload();
    this.checkNumberOfButtonsForResoution();
    this.pageReset.subscribe(()=>{
      this.pageNumber=1;
      this.numberOfElements=0;
      this.infoFrom=0;
      this.infoTo=0;
      this.maxPage=Math.ceil(this.numberOfElements/this.elementsOnPage);
    })
  }

  ngOnInit(){
    this.buttonsReset.subscribe((number)=>{
      this.pageNumber=number;
      this.maxPage=Math.ceil(this.numberOfElements/this.elementsOnPage);
      this.reload()
    })
  }
  
  firstClick() {
    if(this.pageNumber!==1){
      this.pageNumber=1;
      this.reload();
    }
  }

  prevClick() {
    if(this.pageNumber>1){
      this.pageNumber--;
      this.reload();
    } 
  }

  numberClick(newPageNumber) {
    this.pageNumber=newPageNumber;
    this.reload();
  }

  nextClick() {
    if(this.pageNumber<this.maxPage){
      this.pageNumber++;
      this.reload();
    } 
  }

  lastClick() {
    if(this.pageNumber<this.maxPage){
      this.pageNumber=this.maxPage;
      this.reload();
    } 
  }

  reload(){
    if(this.numberOfElements===0){
      this.infoFrom=0;
      this.infoTo=0;

    }else if(this.numberOfElements<=this.elementsOnPage) {
      this.infoFrom=1;
      this.infoTo=this.numberOfElements;
    
    }else if(this.pageNumber===this.maxPage) {
      this.infoFrom=this.numberOfElements-((this.numberOfElements%this.elementsOnPage)||this.elementsOnPage)+1;
      this.infoTo=this.numberOfElements;

    }else if(this.pageNumber>1&&this.pageNumber<this.maxPage) {
      this.infoFrom=(this.pageNumber-1)*this.elementsOnPage+1;
      this.infoTo=(this.pageNumber)*this.elementsOnPage;

    }else if(this.pageNumber===1){
      this.infoFrom=1
      this.infoTo=this.elementsOnPage;
    }
    this.pageChange.emit(this.pageNumber);
  }

  checkNumberOfButtonsForResoution(){
    if(window.innerWidth<500){
      this.buttonsArr= Array.from('x'.repeat(1))
      this.buttonsNumber=1;
    }else{
      this.buttonsArr= Array.from('x'.repeat(2))
      this.buttonsNumber=2;
    }
  }
}
