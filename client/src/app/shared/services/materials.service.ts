import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Material, MaterialList } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MaterialsService {
    constructor(private http: HttpClient) { }

    fetch(): Observable<MaterialList[]> {
        return this.http.get<MaterialList[]>('/api/materials')
    }

}

