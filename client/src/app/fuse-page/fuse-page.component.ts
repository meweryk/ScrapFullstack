import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Fuse } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { FuseService } from '../shared/services/fuse.service'

@Component({
  selector: 'app-fuse-page',
  templateUrl: './fuse-page.component.html',
  styleUrls: ['./fuse-page.component.css']
})
export class FusePageComponent implements OnInit {
  fuses$: Observable<Fuse[]>
  searchFuse: string = ''
  searchFuseDate: Date
  role: string
  flagRead: boolean
  flagWrite: boolean

  constructor(private fuseService: FuseService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.fuses$ = this.fuseService.fetch()
    this.flagRead = this.auth.getFlagRead()
    this.flagWrite = this.auth.getFlagWrite()
    this.role = this.auth.getRole()
  }

}
