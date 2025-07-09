package com.shopgame.controller;

import com.shopgame.model.Game;
import com.shopgame.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import java.math.BigDecimal;

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
    public ResponseEntity<?> searchGames(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String platform,
            @RequestParam(required = false) String devTeam,
            @RequestParam(required = false) String publisher,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (title != null && !title.isEmpty()) {
            if (page != null && size != null) {
                return ResponseEntity.ok(gameService.searchGamesByTitlePaged(title, PageRequest.of(page, size)));
            }
            return ResponseEntity.ok(gameService.searchGamesByTitle(title));
        } else if (genre != null && !genre.isEmpty()) {
            if (page != null && size != null) {
                return ResponseEntity.ok(gameService.searchGamesByGenrePaged(genre, PageRequest.of(page, size)));
            }
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

    @GetMapping("/featured")
    public ResponseEntity<List<Game>> getFeaturedGames() {
        return ResponseEntity.ok(gameService.getFeaturedGames());
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<Game>> getGamesPaged(Pageable pageable) {
        return ResponseEntity.ok(gameService.getGamesPaged(pageable));
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<Game>> filterAndSortGames(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) String platform,
            @RequestParam(required = false) String publisher,
            @RequestParam(required = false) String devTeam,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Boolean featured,
            @RequestParam(required = false) Boolean inStock,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size) {
        Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size, org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.fromString(sortDir), sortBy));
        return ResponseEntity.ok(gameService.filterAndSortGames(title, genre, platform, publisher, devTeam, minPrice, maxPrice, featured, inStock, sortBy, sortDir, pageable));
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