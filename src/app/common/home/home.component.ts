import {Component, OnInit, ViewChild} from '@angular/core';
import { Wizard } from "clarity-angular/wizard/wizard";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loader = new BehaviorSubject(false);
  open = true;

  @ViewChild('wizard') wizard: Wizard;
  // @ViewChild('number') numberFi: any;


  model = {
    name: '',
    favorite: '',
    number: ''
  };

  constructor() { }

  ngOnInit() {
    this.loader.subscribe();
  }

  loaderBtn() {
    const value = !this.loader.getValue();
    this.loader.next(value);
  }

}
