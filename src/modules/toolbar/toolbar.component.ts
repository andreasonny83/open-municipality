import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  private _isSignedIn: boolean;

  @Input()
  public appTitle: string;

  @Input()
  public appVersion: string;

  @Input()
  get isSignedIn(): boolean {
    return this._isSignedIn;
  }
  set isSignedIn(value) {
    this._isSignedIn = coerceBooleanProperty(value);
  }

  @Output()
  public onRegister: EventEmitter<void>;

  @Output()
  public onSignIn: EventEmitter<void>;

  @Output()
  public onLogout: EventEmitter<void>;

  constructor() {
    this.onRegister =  new EventEmitter<void>();
    this.onSignIn =  new EventEmitter<void>();
    this.onLogout =  new EventEmitter<void>();
  }

  ngOnInit() { }

  register(): void {
    this.onRegister.emit();
  }

  signIn(): void {
    this.onSignIn.emit();
  }

  logout(): void {
    this.onLogout.emit();
  }
}
