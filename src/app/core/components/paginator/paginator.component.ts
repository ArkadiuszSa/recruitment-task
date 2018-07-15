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
  @Input() buttonsReset: EventEmitter<number> = new EventEmitter<any>();
  public buttonsNumber=2;
  public buttonsArr;
  public pageNumber=1;
  public maxPage;
  public infoFrom=0;
  public infoTo=0;
  constructor() {}

  ngOnInit(){
    this.reset();
    this.buttonsReset.subscribe((arr)=>{//kiedy z zewnątrz wchodzi info o zmianie
      this.pageNumber=arr[0];
      this.numberOfElements=arr[1];
      console.log(this.pageNumber)
      console.log()
     this.reset()
    })
  }

  reset(){
    console.log('numberofelements:'+this.numberOfElements)
    this.maxPage=Math.ceil(this.numberOfElements/this.elementsOnPage);
    this.manageButtonsNumber();
    this.updateInfo();
    console.log(this.maxPage)
    console.log(this.numberOfElements)
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
    this.reset();
    this.pageChange.emit(this.pageNumber);
  }

  updateInfo(){
    this.maxPage=Math.ceil(this.numberOfElements/this.elementsOnPage);
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
  }

  manageButtonsNumber(){
    if(window.innerWidth<500){
      this.buttonsArr= Array.from('x'.repeat(1))
      this.buttonsNumber=1;
    }else{
      this.buttonsArr= Array.from('x'.repeat(2))
      this.buttonsNumber=2;
    }
  }
}
