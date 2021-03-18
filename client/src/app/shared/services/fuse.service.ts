import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fuse, Message } from '../interfaces';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})

export class FuseService {
  constructor(private http: HttpClient) { }

  fetch(): Observable<Fuse[]> {
    return this.http.get<Fuse[]>('/api/fuse');
  }

  getById(id: string): Observable<Fuse> {
    return this.http.get<Fuse>(`/api/fuse/${id}`);
  }

  create(fuse: Fuse): Observable<Fuse> {
    return this.http.post<Fuse>('/api/fuse', fuse);
  }

  update(fuse: Fuse): Observable<Fuse> {
    /*const fd = new FormData();
    fd.append('fuse', fuse.fuse)
    fd.append('fuseCard', fuse.fuseCard)
    fd.append('alloy', fuse.alloy)
    fd.append('fuseDate', fuse.fuseDate)*/
    return this.http.patch<Fuse>(`/api/fuse/${fuse._id}`, fuse);
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/fuse/${id}`);
  }
}
