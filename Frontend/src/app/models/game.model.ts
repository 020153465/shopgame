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
  coverImageFilename?: string;
  referenceUrl?: string;
  stockQuantity: number;
  featured: boolean;
  musicUrl?: string;
  releaseDate?: Date;
  rating?: number;
  minOs?: string;
  minCpu?: string;
  minRam?: string;
  minGpu?: string;
  minStorage?: string;
  recOs?: string;
  recCpu?: string;
  recRam?: string;
  recGpu?: string;
  recStorage?: string;
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
  coverImageFilename?: string;
  referenceUrl?: string;
  stockQuantity: number;
  featured: boolean;
  musicUrl?: string;
  releaseDate?: Date;
  rating?: number;
  minOs?: string;
  minCpu?: string;
  minRam?: string;
  minGpu?: string;
  minStorage?: string;
  recOs?: string;
  recCpu?: string;
  recRam?: string;
  recGpu?: string;
  recStorage?: string;
} 