import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from './pages/categories/category.model';
import { Entry } from './pages/entries/entry.model';

export class InMemoryDatabase implements InMemoryDatabase {
  createDb() {
    const categories: Category[] = [
      {id: 1, name: 'Moradia', description: 'Pagamentos de Contas da Casa'},
      {id: 2, name: 'Saúde', description: 'Plano de Saúde e Remédios'},
      {id: 3, name: 'Lazer', description: 'Cinema, parques, praia, etc'},
      {id: 4, name: 'Salário', description: 'Recibimento de Salário'},
      {id: 5, name: 'Freelas', description: 'Trabalhos como freelancer'}
    ];

    const entries: Entry[] = [
      {
        id: 1,
        name: 'Gás de Cozinha',
        categoryId: categories[0].id,
        category: categories[0],
        paid: true,
        date: '14/10/2018',
        description: 'Pagamentos de contas da casa',
        type: 'expense',
        amount: '30,00'
      } as Entry,
      {
        id: 2,
        name: 'Energia Eletrica',
        categoryId: categories[1].id,
        category: categories[1],
        paid: false,
        date: '22/10/2018',
        description: 'Pagamentos de conta de energia elétrica',
        type: 'revenue',
        amount: '30,00'
      } as Entry
    ];

    return { categories, entries };
  }
}
