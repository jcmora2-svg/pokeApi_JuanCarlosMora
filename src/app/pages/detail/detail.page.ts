import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonBackButton, 
  IonSpinner, 
  IonCard, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonProgressBar,
  IonChip,
  IonLabel
} from '@ionic/angular';
import { PokeService } from '../../services/poke/poke.service';
import { PokemonDetail } from '../../models/pokemon';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  imports: [
    CommonModule, 
    FormsModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons, 
    IonBackButton, 
    IonSpinner, 
    IonCard, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonProgressBar,
    IonChip,
    IonLabel
  ],
})
export class DetailPage implements OnInit {
  pokemon: PokemonDetail | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pokeService: PokeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const pokemonId = this.route.snapshot.paramMap.get('id');

    if (pokemonId) {
      this.pokeService.getPokemonDetail(pokemonId).subscribe({
        next: (data) => {
          this.pokemon = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al cargar el detalle:', err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    }
  }
}