package com.shopgame.service;

import com.shopgame.model.Game;
import com.shopgame.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Optional<Game> getGameById(Long id) {
        return gameRepository.findById(id);
    }

    public Game createGame(Game game) {
        return gameRepository.save(game);
    }

    public Game updateGame(Long id, Game gameDetails) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found"));

        game.setTitle(gameDetails.getTitle());
        game.setDescription(gameDetails.getDescription());
        game.setPrice(gameDetails.getPrice());
        game.setGenres(gameDetails.getGenres());
        game.setPlatforms(gameDetails.getPlatforms());
        game.setDevTeam(gameDetails.getDevTeam());
        game.setPublisher(gameDetails.getPublisher());
        game.setCoverImageUrl(gameDetails.getCoverImageUrl());
        game.setStockQuantity(gameDetails.getStockQuantity());

        return gameRepository.save(game);
    }

    public void deleteGame(Long id) {
        gameRepository.deleteById(id);
    }

    public List<Game> searchGamesByTitle(String title) {
        return gameRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<Game> searchGamesByGenre(String genre) {
        return gameRepository.findByGenreContaining(genre);
    }

    public List<Game> searchGamesByPlatform(String platform) {
        return gameRepository.findByPlatformContaining(platform);
    }

    public List<Game> searchGamesByDevTeam(String devTeam) {
        return gameRepository.findByDevTeamContainingIgnoreCase(devTeam);
    }

    public List<Game> searchGamesByPublisher(String publisher) {
        return gameRepository.findByPublisherContainingIgnoreCase(publisher);
    }
} 