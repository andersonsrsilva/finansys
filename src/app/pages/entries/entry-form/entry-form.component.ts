import { EntryService } from '../entry.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Routes, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { Entry } from '../entry.model';
import toasts from 'toastr';
import { Category } from '../../categories/category.model';
import { CategoryService } from '../../categories/category.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {

  currentAction: string;
  entryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm = false;
  entry: Entry = new Entry();
  categories: Array<Category>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };

  ptBr = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  };

  constructor(
    private entryService: EntryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
    this.loadCategories();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  get f() {
    return this.entryForm.controls;
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
      this.createEntry();
    } else {
      this.updateEntry();
    }
  }

  private loadCategories() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    );
  }

  get typeOptions(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        };
      }
    );
  }

  private createEntry() {
    const entryForm: Entry = Object.assign(new Entry(), this.entryForm.value);

    this.entryService.create(entryForm)
      .subscribe(
        entry => this.actionsForSuccess(entry),
        error => this.actionsForError(error)
      );
  }

  private updateEntry() {
    const entryForm: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryService.update(entryForm)
    .subscribe(
      entry => this.actionsForSuccess(entry),
      error => this.actionsForError(error)
    );
  }

  private actionsForSuccess(entry: Entry) {
    toasts.success('Solicitação processada com sucesso.');

    this.router.navigateByUrl('entries', { skipLocationChange: true }).then(
      () => this.router.navigate(['entries', entry.id, 'edit'])
    );
  }

  private actionsForError(error) {
    toasts.console.error('Ocorreu um erro ao processar sua solicitação.');

    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor'];
    }
  }

  private setCurrentAction() {
    if (this.activatedRoute.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ['expense', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
  }

  private loadEntry() {
    if (this.currentAction === 'edit') {
      this.activatedRoute.paramMap.pipe(
        switchMap(params => this.entryService.getById(+params.get('id')))
      ).subscribe(
        (entry) => {
          this.entry = entry;
          this.entryForm.patchValue(entry);
        },
        (error) => alert('Ocorreu um erro')
      );
    }
  }

  private setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de Novo Lançamento';
    } else {
      const entryName = this.entry.name || '';
      this.pageTitle = 'Editando Lançamento: ' + entryName;
    }
  }

}
