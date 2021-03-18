import { formatDate } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaterialDatepicker, MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Fuse } from 'src/app/shared/interfaces';
import { FuseService } from 'src/app/shared/services/fuse.service';

@Component({
  selector: 'app-fuse-card',
  templateUrl: './fuse-card.component.html',
  styleUrls: ['./fuse-card.component.css']
})
export class FuseCardComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('input') innputRef: ElementRef
  @ViewChild('modalId') modalIdRef: ElementRef
  @ViewChild('start') startRef: ElementRef
  form: FormGroup
  isNew = true //ввод новой плавки
  fuse: Fuse
  start: MaterialDatepicker
  fusepl: string = ''
  modalId: MaterialInstance
  isValid = true
  open = false //неактивные кнопки сохранить, активная кнопка изменить

  constructor(private route: ActivatedRoute,
    private fuseService: FuseService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      fuse: new FormControl(null, Validators.required),
      fuseDate: new FormControl(Date, Validators.required),
      fuseCard: new FormControl(null),
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
            this.fusepl = fuse.fuse
          }
        },
        error => MaterialService.toast(error.error.message)
      )
  }

  ngAfterViewInit() {
    this.modalId = MaterialService.initModal(this.modalIdRef)
    this.start = MaterialService.initDatepicker(this.startRef, this.validate.bind(this))
  }

  validate() {
    if (!this.start.date) {
      this.isValid = true
      return
    }
    this.isValid = false
  }

  ngOnDestroy() {
    this.modalId.destroy()
    this.start.destroy()
  }

  onAddFuseId() {
    if (this.isNew) {
      let now: Date = new Date()
      this.start.date = now
      this.form.reset({
        fuse: null,
        fuseDate: formatDate(now, 'dd.MM.yyyy', 'en'),
        fuseCard: "",
        alloy: ""
      })
      this.open = true
      this.form.enable()
    } else {
      this.form.patchValue({
        fuse: this.fuse.fuse,
        fuseDate: formatDate(this.fuse.fuseDate, 'dd.MM.yyyy', 'en'),
        fuseCard: this.fuse.fuseCard,
        alloy: this.fuse.alloy
      })
      this.form.disable()
      this.open = false
    }

    this.modalId.open()
    MaterialService.updateTextInputs()
  }

  changeSetting() {
    this.open = true
    this.form.enable()
  }

  onCancel() {
    this.modalId.close()
  }

  onSubmit() {
    let obs$
    this.form.disable()
    const newFuse: Fuse = {
      fuse: this.form.value.fuse,
      fuseCard: this.form.value.fuseCard,
      fuseDate: this.start.date,
      alloy: this.form.value.alloy
    }

    if (this.isNew) {
      obs$ = this.fuseService.create(newFuse)
    } else {
      newFuse._id = this.fuse._id
      obs$ = this.fuseService.update(newFuse)
    }

    obs$.subscribe(
      (fuse: Fuse) => {
        this.fuse = fuse
        MaterialService.toast('Изменения сохранены.')
        this.onCancel()
        this.fusepl = fuse.fuse
        this.isNew = false
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
