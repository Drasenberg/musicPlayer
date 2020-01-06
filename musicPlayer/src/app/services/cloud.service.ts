// src/app/services/cloud.service.ts
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Music } from '../interfaces/music.model';

@Injectable({
  providedIn: "root"
})
export class CloudService {

  constructor(private http: HttpClient){}
  files: any = [];


  fetchPosts(){
   
}
  getFiles(): Observable<Music[]> {
    return this.http.get<Music[]>('http://localhost:3000/files');
  }
}