import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit{

  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  places = this.placesService.loadedUserPlaces;//signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');

  ngOnInit(){
    this.isFetching.set(true);
    const subsription = this.placesService.loadUserPlaces()
      .subscribe({
      // next: (places) => { // moved to service
      //   //console.log(resData.places);
      //   this.places.set(places);
      // }, 
      error: (error: Error) => {this.error.set(error.message)},
      complete: () => {
        this.isFetching.set(false);
      }
    })

    this.destroyRef.onDestroy(() => {
      subsription.unsubscribe();
    });
  }

  onDelete(selectedPlace: Place){
    const subsription = this.placesService.removeUserPlace(selectedPlace).subscribe();

    this.destroyRef.onDestroy(() => {
      subsription.unsubscribe();
    })
  }
}
