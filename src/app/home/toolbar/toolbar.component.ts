import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input()
  public appTitle: string;

  @Output()
  public onLogout: EventEmitter<boolean>;

  constructor() {
    this.onLogout =  new EventEmitter<boolean>();
  }

  ngOnInit() { }

  logout() {
    this.onLogout.emit(true);
  }
}
