import { Injectable } from '@angular/core';

import { Athlete } from './athlete';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AthleteService {

  letThemKnow = new BehaviorSubject(true);
  dataReady = new BehaviorSubject(false);
  editReady = new BehaviorSubject(false);
  editUser = {};
  athleteDb: Athlete[] = [];
  allApi = 'http://localhost:3000/api/athletes';
  oneApi = 'http://localhost:3000/api/athlete/';
  nation = 'http://localhost:3000/api/nationality';


  constructor(private _http: HttpClient) {}

  getAll() {
    this._http.get<Athlete[]>(this.allApi).subscribe((value) => {
      if (value) {
        this.athleteDb = value;
        this.dataReady.next(true);
      }
    });
    return null;
  }

  saveData(data: object) {
   return this._http.post(this.allApi, data).map(resp => {
     return Object.values(resp)[0];
   });
  }

  updateData(body: object) {
    console.log('this is the id ', body);
    const params = new HttpParams().set('id', body['_id']);
    return this._http.put(this.oneApi + body['_id'], body).subscribe();
  }
}
