import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Material, Message } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MaterialsService {
    constructor(private http: HttpClient) { }

    fetch(): Observable<Material[]> {
        return this.http.get<Material[]>('/api/materials')
    }

    create(material: Material): Observable<Material> {
        return this.http.post<Material>('/api/materials', material)
    }

    update(material: Material): Observable<Material> {
        return this.http.patch<Material>(`/api/materials/${material._id}`, material)
    }

    delete(material: Material): Observable<Message> {
        return this.http.delete<Message>(`/api/materials/${material._id}`)
    }

}

