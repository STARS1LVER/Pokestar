import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pokemon } from '../../../interfaces/pokemon-interface';
import { PokemonService } from '../../../service/pokemon.service';
import { CardPokemonComponent } from '../../../shared/card-pokemon/card-pokemon.component';
import { ErrorPokemonComponent } from '../../../shared/error-pokemon/error-pokemon.component';
import { ErrorFormComponent } from '../../../shared/error-form/error-form.component';

@Component({
  selector: 'app-search-pokemon',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardPokemonComponent,
    ErrorPokemonComponent,
    ErrorFormComponent ],
  templateUrl: './search-pokemon.component.html',
  styleUrl: './search-pokemon.component.css'
})
export default class SearchPokemonComponent  {

  public pokemon!: Pokemon;
  public error!: number
  public errorForms: boolean = false

  // Inyetamos dependencias:
  private formB = inject( FormBuilder )
  private pokemonService = inject( PokemonService )


  // Formulario:
  public myInputForm: FormGroup = this.formB.group({
    name: ['', [Validators.required, Validators.minLength(1)]]
  })

  public onSubmitForm(): void{
    if( this.myInputForm.invalid ){
      this.handleFormErrors()
      this.error = 0
      return
    }
    this.getDataPokemonById()
  }



  public getDataPokemonById(  ){
    this.errorForms = false;
    this.error = 0;
    this.pokemonService.getPokemonById( this.myInputForm.controls['name'].value )
    .subscribe({
      next: ( data ) => {
          this.pokemon = data
          console.log( data )
      },
      error: ( error ) => {
        console.log( error.status )
        this.error = error.status
        this.errorForms = false

      }
    })

  }

  public getFieldError(): string | null{


    const error = this.myInputForm.controls['name'].errors || {}

    for( const keys of Object.keys( error ) ){
      switch( keys ){
        case 'required':
          return 'El campo es requerido, No puedes enviar el campo vacio'
        case 'minlenght':
          return `Se necesita al menos ${ error['minlength'].requiredLength} caracter para buscar un Pokemon.`;
        case null :
          return 'Corrige el error por favor'
      }
    }

    return null

  }

  private handleFormErrors(): void {
    console.log('hay un error en el formulario')
    this.errorForms = true; // aca ponemos que se muestre el error si esta invaliado
    this.myInputForm.markAllAsTouched()
}



}
