import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnDestroy, OnInit, signal, effect } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  @Output() onCancel = new EventEmitter();

  reactiveForm: FormGroup = new FormGroup<any>({});

  cancelLogin(){
    this.onCancel.emit();
  }

  onSubmit(){
    console.log('form submitted...');
  }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }
}
