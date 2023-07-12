import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { IPerson } from 'src/app/types';
import { DataService } from 'src/app/services/data.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent implements OnInit {
  allPersons: any ;

  constructor(private dataService: DataService){}

  savePerson(person: IPerson ){
    this.dataService.savePerson(person);
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.dataService.getAllPersons().pipe(map((allData)=>{
      const newArray: any = [];
      for(const key in allData){
        if(allData[key]){
          newArray.push({...allData[key], id: key});
        }
      }
      this.allPersons = [...newArray];
      return newArray

    })).subscribe(data => console.log(data));
  }
}

