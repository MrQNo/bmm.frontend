import {Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DivisionDrawerService implements OnInit{

  private open: boolean = false;
  constructor() { }

  ngOnInit() {
    this.open = true;
  }

  public openDrawer() {
    this.open = true;
  }

  public closeDrawer() {
    this.open = false;
  }

  public isOpen(): boolean {
    return this.open;
  }

}
