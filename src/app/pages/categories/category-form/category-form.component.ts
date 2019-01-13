import { CategoryService } from './../shared/category.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Routes, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  currentAction: string;
  categortForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked() {
    this.setPageTitle();

  }

  private setCurrentAction() {
    if (this.activatedRoute.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private buildCategoryForm() {
    this.categortForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private loadCategory() {
    if (this.currentAction === 'edit') {
        this.activatedRoute.paramMap.pipe(
          switchMap(params => this.categoryService.getById(+params.get('id')))
        ).subscribe(
          (category) => {
            this.category = category;
            this.categortForm.patchValue(category);
          },
          (error) => alert('Ocorreu um erro')
        )
    }
  }

  private setPageTitle() {
    if (this.currentAction === 'new') {
        this.pageTitle = 'Cadastro de Nova Categoria';
    } else {
        const categoryName = this.category.name || '';
        this.pageTitle = 'Editando Categoria: ' + categoryName;
    }
  }

}
