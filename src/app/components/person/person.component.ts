import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

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
  @Input() editMode = false;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      gender: new FormControl('male'),
      location: new FormControl(null),
      description: new FormControl(null),
      dob: new FormControl(new Date().toLocaleDateString()),
      phone: new FormControl(null),
      email: new FormControl(null),
      link: new FormControl(null),
    })
  }
  onSubmit(){
    const newPerson: IPerson = {...this.reactiveForm.value, children: [], root: false, id:''}
    //this.dataService.editPerson('newPerson');
    this.dataService.savePerson(newPerson).subscribe(d => console.log(d));
    this.reactiveForm.reset();
  }

  constructor(private dataService: DataService){}
}
