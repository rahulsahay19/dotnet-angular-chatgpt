import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingReqCount = 0;
  constructor(private spinnerService: NgxSpinnerService) { }

  loading(){
    this.loadingReqCount++;
    this.spinnerService.show();
  }
  idle(){
    this.loadingReqCount--;
    if(this.loadingReqCount<=0){
      this.loadingReqCount = 0;
      this.spinnerService.hide();
    }
  }
}
