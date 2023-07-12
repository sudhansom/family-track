import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IPerson } from 'src/app/types';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent {

  savePerson(person: IPerson ){
    console.log(person)
  }
}
