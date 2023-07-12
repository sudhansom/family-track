import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IPerson } from 'src/app/types';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent {

  constructor(private dataService: DataService){}

  savePerson(person: IPerson ){
    this.dataService.savePerson(person);
  }
}
