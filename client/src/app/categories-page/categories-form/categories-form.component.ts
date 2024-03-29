import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Category } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('input') innputRef: ElementRef
  form: UntypedFormGroup
  image: File
  imagePreview = ''
  isNew = true
  category: Category

  constructor(private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router) { }

  ngOnInit() {

    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, Validators.required)
    })

    this.form.disable()

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              //мы редактируем форму
              this.isNew = false
              return this.categoriesService.getById(params['id'])
            }

            return of(null)
          }
        )
      )
      .subscribe(
        (category: Category) => {
          if (category) {
            this.category = category
            this.form.patchValue({
              name: category.name
            })
            this.imagePreview = category.imageSrc
            MaterialService.updateTextInputs()
          }

          this.form.enable()
        },
        error => MaterialService.toast(error.error.message)
      )
  }

  triggerClick() {
    this.innputRef.nativeElement.click()
  }

  deleteCategory() {
    const desision = window.confirm(`Вы уверены, что хотите удалить категорию? будут удалены все позиции "${this.category.name}"`)

    if (desision) {
      this.categoriesService.delete(this.category._id)
        .subscribe(
          response => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.message),
          () => this.router.navigate(['/categories'])
        )
    }
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result as string
    }

    reader.readAsDataURL(file)

  }

  onSubmit() {
    let obs$
    this.form.disable()

    if (this.isNew) {
      //create
      obs$ = this.categoriesService.create(this.form.value.name, this.image)
    } else {
      //update
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image)
    }

    obs$.subscribe(
      (category: Category) => {
        this.category = category
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
}