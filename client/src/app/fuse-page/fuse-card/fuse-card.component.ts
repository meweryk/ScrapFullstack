import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Fuse } from 'src/app/shared/interfaces';
import { FuseService } from 'src/app/shared/services/fuse.service';

@Component({
  selector: 'app-fuse-card',
  templateUrl: './fuse-card.component.html',
  styleUrls: ['./fuse-card.component.css']
})
export class FuseCardComponent implements OnInit {

  @ViewChild('input') innputRef: ElementRef
  form: FormGroup
  isNew = true
  fuse: Fuse

  constructor(private route: ActivatedRoute,
    private fuseService: FuseService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      fuse: new FormControl(null, Validators.required),
      fuseCard: new FormControl(null, Validators.required),
      alloy: new FormControl(null, Validators.required)
    })

    this.form.disable()

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false
              return this.fuseService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe(
        (fuse: Fuse) => {
          if (fuse) {
            this.fuse = fuse
            this.form.patchValue({
              fuse: fuse.fuseCard,
              fuseCard: fuse.fuseCard,
              alloy: fuse.alloy
            })
            MaterialService.updateTextInputs()
          }
          this.form.enable()
        },
        error => MaterialService.toast(error.error.message)
      )
  }

  onSubmit() {
    let obs$
    this.form.disable()

    const newFuse: Fuse = {
      fuse: this.form.value.fuse,
      fuseCard: this.form.value.fuseCard,
      alloy: this.form.value.alloy
    }

    if (this.isNew) {
      //create
      obs$ = this.fuseService.create(newFuse)
    } else {
      newFuse._id = this.fuse._id
      obs$ = this.fuseService.update(newFuse)
    }

    obs$.subscribe(
      (fuse: Fuse) => {
        this.fuse = fuse
        MaterialService.toast('Изменения сохранены.')
        this.form.enable()
      },
      (error: {
        error: {
          message: string;
        };
      }) => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

  deleteFuse() {
    const desision = window.confirm(`Вы уверены, что хотите удалить плавку? будут удалены все записи плавки №"${this.fuse.fuse}"`)

    if (desision) {
      this.fuseService.delete(this.fuse._id)
        .subscribe(
          response => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.message),
          () => this.router.navigate(['/fuse'])
        )
    }
  }
}
