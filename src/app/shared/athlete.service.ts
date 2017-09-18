import { Injectable } from '@angular/core';

import { Athlete } from './athlete';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import * as AWS from 'aws-sdk';

@Injectable()
export class AthleteService {

  letThemKnow = new BehaviorSubject(true);
  dataReady = new BehaviorSubject(false);
  editReady = new BehaviorSubject(false);
  editUser = {};
  athleteDb: Athlete[] = [];
  allApi = 'http://localhost:3000/api/athletes';
  oneApi = 'http://localhost:3000/api/athlete/';
  s3Bucket = 'https://s3.amazonaws.com/com.andy.opensponsorship.challenge/';

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
    return this._http.put(this.oneApi + body['_id'], body).subscribe(data => {
      const userObj = Object.values(data);
      const index = this.athleteDb.findIndex(id => {
        return id === userObj[0]._id;
      });
      this.athleteDb.splice(index, 1);
      this.athleteDb.push(userObj[0]);
    });
  }

  uploadToS3(file: File) {

    const S3 = new AWS.S3({apiVersion: '2006-03-01', endpoint: 'https://s3.amazonaws.com/'});

    const bkt = 'com.andy.opensponsorship.challenge';
    const Key = 'Imagens-de-parabéns-Palmeiras-103-anos.jpg';

    var params = {
      Bucket: bkt,
      Key: Key
    };
  }

}
