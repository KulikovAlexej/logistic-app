import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'logist-app-frontend';

  constructor(private httpClient: HttpClient) {
  }

  makeRequest1(): void {
    this.httpClient.get('https://pokeapi.co/api/v2/pokemon/ditto').subscribe(v => console.log(v), e => console.log(e))
  }

  makeRequestToApi(): void {
    this.httpClient.get('/api/users/ping').subscribe(v => console.log(v), e => console.log(e))
  }
}
