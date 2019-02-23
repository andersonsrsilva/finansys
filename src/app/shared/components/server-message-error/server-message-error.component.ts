import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-message-error',
  template: `
    <div class="alert alert-danger mt-4" *ngIf="serverErrorMessages">
      <strong>Erro no servidor</strong>
      <ul>
        <li *ngFor="let error of serverErrorMessages">{{ serverErrorMessages }}</li>
      </ul>
    </div>
  `,
  styleUrls: ['./server-message-error.component.css']
})
export class ServerMessageErrorComponent implements OnInit {

  @Input('server-error-messages') serverErrorMessages: string[] = null;

  constructor() { }

  ngOnInit() {
  }

}
