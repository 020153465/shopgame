package com.shopgame.controller;

import com.shopgame.model.Game;
import com.shopgame.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;
import java.io.File;
import java.io.IOException;

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

    private static final String COVER_UPLOAD_DIR = "src/main/resources/static/assets/covers/";
    private static final String MUSIC_UPLOAD_DIR = "src/main/resources/static/assets/music/";

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

    @GetMapping("/{id}/recommendations")
    public ResponseEntity<List<Game>> getRecommendedGames(@PathVariable Long id, @RequestParam(defaultValue = "4") int limit) {
        if (!gameService.getGameById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        List<Game> recommendations = gameService.getRecommendedGames(id, limit);
        return ResponseEntity.ok(recommendations);
    }

    @PostMapping("/upload/cover")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> uploadCover(@RequestParam("file") MultipartFile file) throws IOException {
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        File dest = new File(COVER_UPLOAD_DIR + filename);
        dest.getParentFile().mkdirs();
        file.transferTo(dest);
        return ResponseEntity.ok("/assets/covers/" + filename);
    }

    @PostMapping("/upload/music")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> uploadMusic(@RequestParam("file") MultipartFile file) throws IOException {
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        File dest = new File(MUSIC_UPLOAD_DIR + filename);
        dest.getParentFile().mkdirs();
        file.transferTo(dest);
        return ResponseEntity.ok("/assets/music/" + filename);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createGame(@RequestPart("game") Game game,
                                        @RequestPart(value = "cover", required = false) MultipartFile cover,
                                        @RequestPart(value = "music", required = false) MultipartFile music) throws IOException {
        // Enforce max 10 featured games
        if (game.isFeatured() && gameService.getFeaturedGames().size() >= 10) {
            return ResponseEntity.badRequest().body("Cannot feature more than 10 games.");
        }
        if (cover != null && !cover.isEmpty()) {
            String coverFilename = StringUtils.cleanPath(cover.getOriginalFilename());
            File dest = new File(COVER_UPLOAD_DIR + coverFilename);
            dest.getParentFile().mkdirs();
            cover.transferTo(dest);
            game.setCoverImageUrl(coverFilename);
        }
        if (music != null && !music.isEmpty()) {
            String musicFilename = StringUtils.cleanPath(music.getOriginalFilename());
            File dest = new File(MUSIC_UPLOAD_DIR + musicFilename);
            dest.getParentFile().mkdirs();
            music.transferTo(dest);
            game.setMusicUrl(musicFilename);
        }
        Game createdGame = gameService.createGame(game);
        return ResponseEntity.ok(createdGame);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateGame(@PathVariable Long id,
                                        @RequestPart("game") Game gameDetails,
                                        @RequestPart(value = "cover", required = false) MultipartFile cover,
                                        @RequestPart(value = "music", required = false) MultipartFile music) throws IOException {
        // Enforce max 10 featured games
        if (gameDetails.isFeatured()) {
            List<Game> featured = gameService.getFeaturedGames();
            boolean isAlreadyFeatured = featured.stream().anyMatch(g -> g.getId().equals(id));
            if (!isAlreadyFeatured && featured.size() >= 10) {
                return ResponseEntity.badRequest().body("Cannot feature more than 10 games.");
            }
        }
        if (cover != null && !cover.isEmpty()) {
            String coverFilename = StringUtils.cleanPath(cover.getOriginalFilename());
            File dest = new File(COVER_UPLOAD_DIR + coverFilename);
            dest.getParentFile().mkdirs();
            cover.transferTo(dest);
            gameDetails.setCoverImageUrl(coverFilename);
        }
        if (music != null && !music.isEmpty()) {
            String musicFilename = StringUtils.cleanPath(music.getOriginalFilename());
            File dest = new File(MUSIC_UPLOAD_DIR + musicFilename);
            dest.getParentFile().mkdirs();
            music.transferTo(dest);
            gameDetails.setMusicUrl(musicFilename);
        }
        Game updatedGame = gameService.updateGame(id, gameDetails);
        return ResponseEntity.ok(updatedGame);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateGameFields(@PathVariable Long id, @RequestBody Game gameDetails) {
        // Enforce max 10 featured games
        if (gameDetails.isFeatured()) {
            List<Game> featured = gameService.getFeaturedGames();
            boolean isAlreadyFeatured = featured.stream().anyMatch(g -> g.getId().equals(id));
            if (!isAlreadyFeatured && featured.size() >= 10) {
                return ResponseEntity.badRequest().body("Cannot feature more than 10 games.");
            }
        }
        Game updatedGame = gameService.updateGame(id, gameDetails);
        return ResponseEntity.ok(updatedGame);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteGame(@PathVariable Long id) {
        gameService.deleteGame(id);
        return ResponseEntity.ok().build();
    }
} 