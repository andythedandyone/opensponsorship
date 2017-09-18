import {Component, OnInit} from '@angular/core';
import {AthleteService} from './shared/athlete.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _auth: AthleteService) {};
  panel: boolean;

  ngOnInit() {
    this._auth.letThemKnow.subscribe(data => {
      this.panel = data;
    });
  }
}
