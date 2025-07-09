import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game, CreateGameRequest } from '../models/game.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = `${environment.apiUrl}/games`;

  constructor(private http: HttpClient) {}

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`);
  }

  createGame(game: CreateGameRequest): Observable<Game> {
    return this.http.post<Game>(this.apiUrl, game);
  }

  updateGame(id: number, game: Partial<Game>): Observable<Game> {
    return this.http.put<Game>(`${this.apiUrl}/${id}`, game);
  }

  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchGamesByTitle(title: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/search?title=${title}`);
  }

  searchGamesByGenre(genre: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/search?genre=${genre}`);
  }

  searchGamesByPlatform(platform: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/search?platform=${platform}`);
  }

  searchGamesByTitlePaged(title: string, page: number, size: number) {
    return this.http.get<any>(`${this.apiUrl}/search?title=${encodeURIComponent(title)}&page=${page}&size=${size}`);
  }

  searchGamesByGenrePaged(genre: string, page: number, size: number) {
    return this.http.get<any>(`${this.apiUrl}/search?genre=${encodeURIComponent(genre)}&page=${page}&size=${size}`);
  }

  getGamesPaged(page: number, size: number) {
    return this.http.get<any>(`${this.apiUrl}/paged?page=${page}&size=${size}`);
  }

  filterAndSortGames(params: any) {
    const query = Object.entries(params)
      .filter(([_, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
      .join('&');
    return this.http.get<any>(`${this.apiUrl}/filter?${query}`);
  }
} 