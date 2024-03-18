import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-form',
  standalone: true,
  imports: [],
  templateUrl: './error-form.component.html',
  styleUrl: './error-form.component.css'
})
export class ErrorFormComponent implements OnInit {

  @Input({
    required: true
  }) public infoError!: string | null

  ngOnInit(): void {
    if( !this.infoError ) throw new Error('properties infoError is required!.');
  }
}
