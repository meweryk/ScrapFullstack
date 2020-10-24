import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fuse } from '../shared/interfaces';
import { FuseService } from '../shared/services/fuse.service'

@Component({
  selector: 'app-fuse-page',
  templateUrl: './fuse-page.component.html',
  styleUrls: ['./fuse-page.component.css']
})
export class FusePageComponent implements OnInit {
  fuses$: Observable<Fuse[]>

  constructor(private fuseService: FuseService) { }

  ngOnInit(): void {
    this.fuses$ = this.fuseService.fetch()
  }

}
