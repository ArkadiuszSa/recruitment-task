import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-paginator',
  templateUrl: './my-paginator.component.html',
  styleUrls: ['./my-paginator.component.scss']
})
export class MyPaginatorComponent implements OnInit {
  @Input() numberOfElements: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  public buttonsNumber=2;
  public buttonsArr=[1,2];
  public pageNumber=1;
  public maxPage;
  public infoFrom;
  public infoTo;
  constructor() { }

  ngOnInit() {

    this.maxPage=Math.ceil(this.numberOfElements/10);
    
    if(this.numberOfElements===0){
      this.infoFrom=0;
      this.infoTo=0;
    }else if(this.numberOfElements<=10){
      this.infoFrom=1;
      this.infoTo=this.numberOfElements;
    }else{
      this.infoFrom=1;
      this.infoTo=10;
    }
  }

  ngOnChanges() {
    this.maxPage=Math.ceil(this.numberOfElements/10);
    
    if(this.numberOfElements===0){
      this.infoFrom=0;
      this.infoTo=0;
    }else if(this.numberOfElements<=10){
      this.infoFrom=1;
      this.infoTo=this.numberOfElements;
    }else{
      this.infoFrom=1;
      this.infoTo=10;
    }
  }

  firstClick() {
    this.pageNumber=1;
    this.reload();
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
    if(this.pageNumber<this.maxPage) this.pageNumber++;
    this.reload();
  }

  lastClick() {
    this.pageNumber=this.maxPage;
    this.reload();
  }

  reload(){
    window.scrollTo(0,0)

    if(this.numberOfElements<=10) {
      this.infoFrom=1;
      this.infoTo=this.numberOfElements;
    
    }else if(this.pageNumber===this.maxPage) {
      this.infoFrom=this.numberOfElements-this.numberOfElements%10+1;
      this.infoTo=this.numberOfElements;
    
    }else if(this.pageNumber>1&&this.pageNumber<this.maxPage) {
      this.infoFrom=(this.pageNumber-1)*10+1;
      this.infoTo=(this.pageNumber)*10;

    }else if(this.pageNumber===1){
      this.infoFrom=1
      this.infoTo=10;
    }

    this.pageChange.emit(this.pageNumber);
    
  }

}
