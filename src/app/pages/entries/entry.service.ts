import { Injectable, Injector } from '@angular/core';
import { flatMap } from 'rxjs/operators';
import { CategoryService } from '../categories/category.service';
import { Entry } from './entry.model';
import { Observable } from 'rxjs';
import { BaseResourceService } from '../../services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(
    protected injector: Injector,
    private categoryService: CategoryService
    ) {
      super('api/entries', injector);
    }


  create(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;

        return super.create(entry);
      })
    );
  }

  update(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;

        return super.update(entry);
      })
    );
  }

  protected jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];
    jsonData.forEach(element => {
      const entry = Entry.fromJson(element);
      entries.push(entry);
    });
    return entries;
  }

  protected jsonDataToEntry(jsonData: any): Entry {
    return Entry.fromJson(jsonData);
  }


}
