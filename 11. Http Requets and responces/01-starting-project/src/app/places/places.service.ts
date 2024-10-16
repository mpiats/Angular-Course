import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private errorService = inject(ErrorService);
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong fetching places'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong fetching favorite places'
    ).pipe(
      tap({
        // updating local variable  loaded places
        next: (userPlaces) => this.userPlaces.set(userPlaces),
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();
    // this.userPlaces.update(prevPlaces => [...prevPlaces, place]); // updating on ui

    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }

    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: place.id,
      })
      .pipe(
        catchError((error) => {
          this.userPlaces.set(prevPlaces);
          this.errorService.showError('Falied to store selected place');
          return throwError(() => new Error('Falied to store selected place'));
        })
      );
  }

  removeUserPlace(place: Place) {

    const prevPlaces = this.userPlaces();
    // this.userPlaces.update(prevPlaces => [...prevPlaces, place]); // updating on ui

    if (prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter((p) => p.id !== place.id));
    }

    return this.httpClient.delete(`http://localhost:3000/user-places/${place.id}`)
    .pipe(
      catchError((error) => {
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('Falied to remove selected place');
        return throwError(() => new Error('Falied to remove selected place'));
      }));

    // this.userPlaces.update(prev => prev.filter((x) => x.id !== place.id));
    // return this.httpClient.delete(`http://localhost:3000/user-places/${place.id}`);
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient
      .get<{ places: Place[] }>(
        url
        //,{ observe: 'response',}// will be HttpResponse object, (can put 'events' and there will additional info about request and next will be called 2 times)
      )
      .pipe(
        map((resData) => resData.places),
        catchError((error) => {
          // generally overcomplecation but is used
          console.log(error);
          return throwError(() => new Error(errorMessage));
        })
      );
  }
}
