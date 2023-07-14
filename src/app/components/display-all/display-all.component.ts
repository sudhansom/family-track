import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

interface IData {
    name: string,
    dob: Date,
    root: boolean,
    id: string,
    gender: string,
    description: string,
    children?: string[],
    link: string,
    expand?: boolean,
}
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

  root: IData = {
    name: 'main',
    dob: new Date(),
    root: true,
    id: '',
    gender: 'male',
    description: 'dfklsdlf ljdfl sdl jflsd',
    children: ['aaa','bbb'],
    link: '',
  }
  data: IData[] = [
    {
      name: 'main',
      dob: new Date(),
      root: true,
      id: '',
      gender: 'male',
      description: 'dfklsdlf ljdfl sdl jflsd',
      children: ['aaa', 'bbb'],
      link: '',
    },
    {
      name: 'child1',
      dob: new Date(),
      root: false,
      id: 'aaa',
      gender: 'male',
      description: 'dfklsdlf ljdfl sdl jflsd',
      children: ['aaa1'],
      link: '',
    },
    {
      name: 'child2',
      dob: new Date(),
      root: false,
      id: 'bbb',
      gender: 'male',
      description: 'dfklsdlf ljdfl sdl jflsd',
      link: '',
    },
    {
      name: 'child11',
      dob: new Date(),
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

  expandOrClose(root: IData){
    this.data = this.data.map(item => {
      if(item.id === root.id){
        if(item?.children?.length){
          return {
            ...item,
            expand: !(item?.expand),
          }
        }
        else {
          alert(`${item.name} does not have any child...`);
          return item;
        }
      }
      return item;
    })
  }
}
