import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from 'src/constants/app.constants';

const httpOptions = {
  headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Headers', '*')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Credentials', 'true')
    .set('Access-Control-Allow-Methods', 'POST'),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  housePlans(): Observable<any> {
    return this.http.get<any>(Constants.Plans, httpOptions);
  }

  houseSize(): Observable<any> {
    return this.http.get<any>(Constants.size, httpOptions);
  }

  Area(): Observable<any> {
    return this.http.get<any>(Constants.area, httpOptions);
  }

  AllStates(): Observable<any> {
    return this.http.get<any>(
      'https://api.countrystatecity.in/v1/states',
      httpOptions
    );
  }

  planAmount(room: string, type: string, plan: string) {
    return this.http.get<any>(
      Constants.planAmount +
        '?plan=' +
        plan+
        '&house_type=' +
        room+
        '&area_type=' +
        type,
      httpOptions
    );
  }
}
