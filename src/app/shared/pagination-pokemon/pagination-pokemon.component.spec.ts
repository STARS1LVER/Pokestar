import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationPokemonComponent } from './pagination-pokemon.component';

describe('PaginationPokemonComponent', () => {
  let component: PaginationPokemonComponent;
  let fixture: ComponentFixture<PaginationPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationPokemonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginationPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
