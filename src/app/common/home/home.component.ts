import { Component, OnInit, ViewChild} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Wizard } from 'clarity-angular/wizard/wizard';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

import { AthleteService } from '../../shared/athlete.service';
import { Athlete } from '../../shared/athlete';
import { sportsList } from '../../shared/sportsData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loader = new BehaviorSubject(false);
  open = false;
  buttonStat = new BehaviorSubject(false);
  users: Athlete[] = [];
  charys: Array<string> = [];
  sports: Array<string> = [];
  socials: Array<object> = [];
  sportsList: Array<string> = sportsList;
  stuff = this._ath.getAll();
  edit = {};
  panel = false;
  url = '';


  @ViewChild('wizard') wizard: Wizard;
  @ViewChild('charityVal') charityInput;
  @ViewChild('sportsVal') sportInput;
  @ViewChild('socialnickname') socialNickInput;
  @ViewChild('name') nameInput;
  @ViewChild('fileUpload') fileUploads;

  osForm: FormGroup;

  constructor(private _ath: AthleteService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.loader.subscribe();
    this._ath.getAll();
    this._ath.dataReady.subscribe( state => {
      if (state) {
        this.users = this._ath.athleteDb;
      }
    });
  }

  loaderBtn() {
    const value = !this.loader.getValue();
    this.loader.next(value);
  }

  register() {
    // this.resetUI();
    this.open = true;
  }

  onAddCharity(data: any) {
    if (data.value.length > 0) {
      this.charys.push(data.value);
    }
    this.charityInput.nativeElement.value = '';
    this.charityInput.nativeElement.focus();
  }

  onAddSport(data: any) {
    if (data.value.length > 0) {
      this.sports.push(data.value);
    }
    this.sportInput.nativeElement.value = '';
    this.sportInput.nativeElement.focus();
  }

  onAddSocial(social: any, handler: any) {
    if (handler.value.length > 0) {
      this.socials.push({'Social': social.value, 'handler': handler.value});
    }
    this.socialNickInput.nativeElement.value = '';
    this.socialNickInput.nativeElement.focus();
  }

  onClearArray(data: string) {
    if (data === 'sport') {
      this.sports.splice(0, this.sports.length);
    } else if (data === 'charity') {
      this.charys.splice(0, this.charys.length);
    } else {
      this.socials.splice(0, this.socials.length);
    }
  }

  onSubmit(file: any = '') {
    if (this.osForm.status === 'VALID') {
      if (file !== '') {
        this._ath.uploadToS3(file[0]);
        this._ath.uploadReady.subscribe(upload => {
          if (upload === true) {
            this._ath.saveData(this.osForm.value).subscribe((data) => {
              this.users.push(data);
              this.resetUI();
            });
          }
        });
      } else {
        this._ath.saveData(this.osForm.value).subscribe((data) => {
          this.users.push(data);
          this.resetUI();
        });
      }
    } else {
      console.log('FORM IS EMPTY/INVALID');
    }
    this._ath.uploadReady.next(false);
  }

  onEdit(event: any) {
    this.resetUI();
    const x = this.users.find( id => {
      return id === event;
    });
    this.edit = x;
    this._ath.editUser = x;
    this._ath.letThemKnow.next(false);
    this._ath.editReady.next(true);
  }

  resetUI(): void {
    this.osForm.reset();
    this.wizard.reset();
  }

  onAddPic(file: File) {
    this.loader.next(true);
    this._ath.uploadToS3(file[0]);
    this._ath.uploadReady.subscribe(stat => {
      if (stat === true) {
        const x = this._ath.getObjUrl(file[0].name);
        this._ath.letUrlOut.subscribe(url => {
          this.url = url;
          this.osForm.controls['profilePic'].setValue(url);
          this.loader.next(false);
        });
      }
    });
  }

  createForm() {
    this.osForm = this.fb.group({
      personal: this.fb.group({
        name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        dob: '',
        nationality: '',
        gender: '',
        marital: '',
        location: ''
      }),
      interest: this.fb.group({
        drinks: '',
        interests: '',
        charities: [this.charys],
        pets: ''
      }),
      sports: this.fb.group({
        association: '',
        team: '',
        sports: [this.sports]
      }),
      _id: '',
      __v: '',
      socials: [this.socials],
      profilePic: [this.url],
      about: ''
    });
  }
}
