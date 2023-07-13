import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-display-all',
  templateUrl: './display-all.component.html',
  styleUrls: ['./display-all.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayAllComponent {
  @Input()name = '';
  @Input()id = '';

  expand = 'minus';

  root = {
    name: 'main',
    dob: '13/07/2023',
    root: true,
    id: '',
    gender: 'male',
    description: 'dfklsdlf ljdfl sdl jflsd',
    children: ['aaa','bbb'],
    link: '',
  }
  data = [
    {
      name: 'main',
      dob: '13/07/2023',
      root: true,
      id: '',
      gender: 'male',
      description: 'dfklsdlf ljdfl sdl jflsd',
      children: ['aaa', 'bbb'],
      link: '',
    },
    {
      name: 'child1',
      dob: '13/07/2023',
      root: false,
      id: 'aaa',
      gender: 'male',
      description: 'dfklsdlf ljdfl sdl jflsd',
      children: ['aaa1'],
      link: '',
    },
    {
      name: 'child2',
      dob: '13/07/2023',
      root: false,
      id: 'bbb',
      gender: 'male',
      description: 'dfklsdlf ljdfl sdl jflsd',
      children: [],
      link: '',
    },
    {
      name: 'child11',
      dob: '13/07/2023',
      root: false,
      id: 'aaa1',
      gender: 'male',
      description: 'dfklsdlf ljdfl sdl jflsd',
      children: [],
      link: '',
    }
  ]

  @Output()onEdit = new EventEmitter<string>();

  editPerson(id: string){
    this.onEdit.emit(id);
  }

  getPerson(id: string){
    return this.data.find(item => item.id === id);
  }
}
