import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonSpinner, IonList, IonItem, IonThumbnail, IonLabel 
} from '@ionic/angular';
import { Pokemon } from '../../models/pokemon';
import { PokeService } from '../../services/poke/poke.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonSpinner, IonList, IonItem, IonThumbnail, IonLabel
  ],
})
export class HomePage implements OnInit {
  pokemons: Pokemon[] = [];
  loading: boolean = true;

  constructor(
    private pokeService: PokeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.pokeService.getPokemons().subscribe({
      next: (data) => {
        this.pokemons = data;
        this.loading = false;
        console.log(this.pokemons);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al consumir la PokeAPI:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}