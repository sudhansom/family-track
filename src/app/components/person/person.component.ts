import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IPerson } from 'src/app/types';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent implements OnInit {
  reactiveForm: FormGroup = new FormGroup<any>({});
  @Output()onSave = new EventEmitter<IPerson>()

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      gender: new FormControl('male'),
      location: new FormControl(null),
      description: new FormControl(null),
      dob: new FormControl(new Date()),
      phone: new FormControl(null),
      email: new FormControl(null),
      link: new FormControl(null),
    })
  }
  onSubmit(){
    const newPerson: IPerson = {...this.reactiveForm.value, children: [], root: false, id:''}
    this.onSave.emit(newPerson);
    this.reactiveForm.reset();
  }

}
