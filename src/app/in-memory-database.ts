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
        name: 'Salário',
        categoryId: categories[3].id,
        category: categories[3],
        paid: false,
        date: '01/09/2019',
        description: 'Salário mensal',
        type: 'revenue',
        amount: '500,00'
      } as Entry,
      {
        id: 2,
        name: 'Gás de Cozinha',
        categoryId: categories[0].id,
        category: categories[0],
        paid: true,
        date: '14/09/2019',
        description: 'Pagamentos do gás de cozinha',
        type: 'expense',
        amount: '65,00'
      } as Entry,
      {
        id: 3,
        name: 'Plano de saúde',
        categoryId: categories[1].id,
        category: categories[1],
        paid: true,
        date: '14/09/2019',
        description: 'Pagamento do plano de saúde',
        type: 'expense',
        amount: '250,00'
      } as Entry,
      {
        id: 4,
        name: 'Cinema',
        categoryId: categories[2].id,
        category: categories[2],
        paid: true,
        date: '14/09/2019',
        description: 'Pagamentos de ingressos para o cinema',
        type: 'expense',
        amount: '150,00'
      } as Entry,
      {
        id: 5,
        name: 'Freelas',
        categoryId: categories[4].id,
        category: categories[4],
        paid: false,
        date: '01/09/2019',
        description: 'Freelance',
        type: 'revenue',
        amount: '300,00'
      } as Entry,
    ];

    return { categories, entries };
  }
}
