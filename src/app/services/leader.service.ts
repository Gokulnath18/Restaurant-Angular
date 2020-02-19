import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { baseURL } from "../shared/baseURL";
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';


import { Leader } from '../shared/leader';
// import { Leaders } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private ProcessHttpMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + '/leadership')
      .pipe(catchError(this.ProcessHttpMsgService.handleError));
    // return of(Leaders).pipe(delay(2000));
  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseURL + '/leadership/' + id)
      .pipe(catchError(this.ProcessHttpMsgService.handleError));
    // return of(Leaders.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader>(baseURL + '/leadership?featured=true')
      .pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.ProcessHttpMsgService.handleError));
    // return of(Leaders.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  }

}
