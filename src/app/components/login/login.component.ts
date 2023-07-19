import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnDestroy, OnInit, signal, effect } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

interface IUser {
  userName: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  @Output() onCancel = new EventEmitter();
  @Output() onLoggedIn = new EventEmitter();

  wrongUser = false;

  reactiveForm: FormGroup = new FormGroup<any>({});

  cancelLogin(){
    this.onCancel.emit();
  }

  onSubmit(){
    const user = {...this.reactiveForm.value};
    // this.authService.putUser(user).subscribe(u => {
    //   this.authService.isLoggedIn$.next(true);
    //   console.log('user created...');
    // });
    this.authService.checkUser(user)
    .subscribe(allUsers => {
      let users: IUser[] = []
      for(let key in allUsers){
        if(allUsers[key] && allUsers[key].userName === user.userName && allUsers[key].password===user.password){
          this.authService.isLoggedIn$.next(true);
          console.log('user exists...')
          this.onLoggedIn.emit();
        }
      }
    })
  }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }
  constructor(private authService: AuthService){}
}
