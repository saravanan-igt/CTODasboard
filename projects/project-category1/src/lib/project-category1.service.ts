import { Injectable, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectCategory1Service {

  @Output() SidebarEvent = new EventEmitter<string>();
  constructor() {}
  SidebarClick(msg: string) {
    this.SidebarEvent.emit(msg);
  }
  getChangeEmitter() {
    return this.SidebarEvent;
  }
}
