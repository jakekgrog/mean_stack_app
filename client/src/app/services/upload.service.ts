import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UploadService {

  baseUrl = 'http://localhost:8888';

  constructor(
    private http: Http,
  ) { }

}