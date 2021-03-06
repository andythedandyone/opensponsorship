import { Injectable } from '@angular/core';

import { Athlete } from './athlete';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import * as AWS from 'aws-sdk';
import {Observable} from "rxjs/Observable";

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'AKIAIJ5UM2BB5MJSOLGQ',
    secretAccessKey: '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'
  }
});
const bucket = 'comandyread';


@Injectable()
export class AthleteService {

  letThemKnow = new BehaviorSubject(true);
  dataReady = new BehaviorSubject(false);
  editReady = new BehaviorSubject(false);
  uploadReady = new BehaviorSubject(false);
  letUrlOut = new BehaviorSubject('');
  editUser = {};
  athleteDb: Athlete[] = [];
  // allApi = 'http://localhost:3000/api/athletes';
  // oneApi = 'http://localhost:3000/api/athlete/';
  allApi = 'http://ec2-34-204-48-226.compute-1.amazonaws.com:3000/api/athletes';
  oneApi = 'http://ec2-34-204-48-226.compute-1.amazonaws.com:3000/api/athlete/';
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
    if (file) {
      const params = {
        Body: file,
        Bucket: bucket,
        Key: file.name,
        ACL: 'public-read',
        ContentType: 'media-type'
      };

      s3.putObject(params, (err, data) => {
        if (err) {
          console.log('error ----> ', err);
          return;
        }
        if (data) {
          this.uploadReady.next(true);
        }
      });
    }
  }

  getObjUrl(file: string = '') {
    const params = {
      Bucket: bucket,
      Key: file,
      Expires: 60
    };

    s3.getSignedUrl('getObject', params, (err, data) => {
      if (err) {
        console.log('error ----> ', err);
        return;
      }
      this.letUrlOut.next(data);
      return data;
    });
  }


}
