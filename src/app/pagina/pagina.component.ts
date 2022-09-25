import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { catchError } from 'rxjs/operators';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss']
})
export class PaginaComponent implements OnInit {

  public apiGreeting = '';
  public dateTime: string;
  public response: string;

  submitted: boolean = false;

  textForm: FormGroup = this.formBuilder.group({
    text: ['', Validators.required]
  });

  constructor(
    private apiService: ApiService, private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getHello();
    this.getDateTime();
  }

  getHello(){
    this.apiService.getHello().pipe(
      catchError((err) => {
        this.apiGreeting = 'Falha na comunicação com o servidor.';
        return [];
      })
    ).subscribe((response) => {
      if (response) {
        this.apiGreeting = response.mensagem;
      }
    });
  }

  getDateTime(){
    this.apiService.getDateTime().pipe(
      catchError((err) => {
        this.dateTime = '';
        return [];
      })
    ).subscribe((response) => {
      if (response) {
        this.dateTime = response.mensagem;
      }
    });
  }

  submit(){
    this.submitted = true;
    if (this.textForm.valid) {
        var texto = this.textForm.get('text').value;
        this.apiService.sendText(texto).pipe(
          catchError((err) => {
            this.response = '';
            return [];
          })
        ).subscribe((response) => {
          if (response) {
            this.response = response.mensagem;
          }
        });
    }
  }
}
