import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { Position, User } from 'src/app/shared/interfaces';
import { MaterialService, MaterialInstance } from 'src/app/shared/classes/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId: string
  shop: string
  aSub: Subscription

  @ViewChild('modal', { static: false }) modalRef: ElementRef
  @ViewChild('select', { static: false }) selectRef: ElementRef

  positions: Position[] = []

  loading = false
  positionId = null
  modal: MaterialInstance
  select: MaterialInstance
  form: FormGroup
  height: number
  constructor(private positionsService: PositionsService,
    private auth: AuthService) { }

  ngOnInit() {
    this.height = 0.5 * window.innerHeight
    this.aSub = this.auth.getById().subscribe((data: User) => { this.shop = data.shop })

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)]),
      stock: new FormControl(null, [Validators.required, Validators.min(0)]),
      rank: new FormControl(null, Validators.required),
    })
    this.loading = true
    this.positionsService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions.filter(position => position.shop === this.shop)
      this.loading = false
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height = 0.5 * event.target.innerHeight
  }

  ngOnDestroy() {
    this.modal.destroy()
    this.select.destroy()
    this.aSub.unsubscribe()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
    this.select = MaterialService.initFormSelect(this.selectRef)
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id
    this.form.patchValue({
      name: position.name,
      cost: position.cost,
      stock: position.stock,
      rank: position.rank
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onAddPosition() {
    this.positionId = null
    this.form.reset({ name: null, cost: 1, stock: 0, rank: '' })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation()
    const decision = window.confirm(`Удалить позицию "${position.name}"?`)

    if (decision) {
      this.positionsService.delete(position).subscribe(
        response => {
          const idx = this.positions.findIndex(p => p._id === position._id)
          this.positions.splice(idx, 1)
          MaterialService.toast(response.message)
        },
        error => MaterialService.toast(error.error.message)
      )
    }
  }

  onCancel() {
    this.modal.close()
  }

  onSubmit() {
    this.form.disable()

    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      stock: this.form.value.stock,
      rank: this.form.value.rank,
      category: this.categoryId
    }

    const completed = () => {
      this.modal.close()
      this.form.enable()
    }

    if (this.positionId) {
      newPosition._id = this.positionId
      this.positionsService.update(newPosition).subscribe(
        position => {
          const idx = this.positions.findIndex(p => p._id === position._id)
          this.positions[idx] = position
          MaterialService.toast('Изменения сохранены')
        },
        error => MaterialService.toast(error.error.message),
        completed
      )
    } else {
      this.positionsService.create(newPosition).subscribe(
        position => {
          MaterialService.toast('Позиция создана')
          this.positions.push(position)
        },
        error => MaterialService.toast(error.error.message),
        completed
      )
    }
  }

}
