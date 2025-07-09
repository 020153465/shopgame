export interface Game {
  id: number;
  title: string;
  description: string;
  price: number;
  genres: string;
  platforms: string;
  devTeam: string;
  publisher: string;
  coverImageUrl: string;
  stockQuantity: number;
  releaseDate?: Date;
  rating?: number;
}

export interface CreateGameRequest {
  title: string;
  description: string;
  price: number;
  genres: string;
  platforms: string;
  devTeam: string;
  publisher: string;
  coverImageUrl: string;
  stockQuantity: number;
  releaseDate?: Date;
  rating?: number;
} 