package com.shopgame.controller;

import com.shopgame.model.Game;
import com.shopgame.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "*")
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping
    public ResponseEntity<List<Game>> getAllGames() {
        return ResponseEntity.ok(gameService.getAllGames());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable Long id) {
        Optional<Game> game = gameService.getGameById(id);
        return game.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Game>> searchGames(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String platform,
            @RequestParam(required = false) String devTeam,
            @RequestParam(required = false) String publisher) {
        
        if (title != null && !title.isEmpty()) {
            return ResponseEntity.ok(gameService.searchGamesByTitle(title));
        } else if (genre != null && !genre.isEmpty()) {
            return ResponseEntity.ok(gameService.searchGamesByGenre(genre));
        } else if (platform != null && !platform.isEmpty()) {
            return ResponseEntity.ok(gameService.searchGamesByPlatform(platform));
        } else if (devTeam != null && !devTeam.isEmpty()) {
            return ResponseEntity.ok(gameService.searchGamesByDevTeam(devTeam));
        } else if (publisher != null && !publisher.isEmpty()) {
            return ResponseEntity.ok(gameService.searchGamesByPublisher(publisher));
        } else {
            return ResponseEntity.ok(gameService.getAllGames());
        }
    }

    @PostMapping
    public ResponseEntity<Game> createGame(@RequestBody Game game) {
        Game createdGame = gameService.createGame(game);
        return ResponseEntity.ok(createdGame);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Game> updateGame(@PathVariable Long id, @RequestBody Game gameDetails) {
        Game updatedGame = gameService.updateGame(id, gameDetails);
        return ResponseEntity.ok(updatedGame);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGame(@PathVariable Long id) {
        gameService.deleteGame(id);
        return ResponseEntity.ok().build();
    }
} 