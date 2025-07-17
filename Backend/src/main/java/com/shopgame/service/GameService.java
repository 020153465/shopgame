package com.shopgame.service;

import com.shopgame.model.Game;
import com.shopgame.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
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
        game.setCoverImageFilename(gameDetails.getCoverImageFilename());
        game.setReferenceUrl(gameDetails.getReferenceUrl());
        game.setStockQuantity(gameDetails.getStockQuantity());
        game.setFeatured(gameDetails.isFeatured());
        game.setMusicUrl(gameDetails.getMusicUrl());
        // System Requirements
        game.setMinOs(gameDetails.getMinOs());
        game.setMinCpu(gameDetails.getMinCpu());
        game.setMinRam(gameDetails.getMinRam());
        game.setMinGpu(gameDetails.getMinGpu());
        game.setMinStorage(gameDetails.getMinStorage());
        game.setRecOs(gameDetails.getRecOs());
        game.setRecCpu(gameDetails.getRecCpu());
        game.setRecRam(gameDetails.getRecRam());
        game.setRecGpu(gameDetails.getRecGpu());
        game.setRecStorage(gameDetails.getRecStorage());

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

    public List<Game> getFeaturedGames() {
        return gameRepository.findByFeaturedTrue();
    }

    public Page<Game> getGamesPaged(Pageable pageable) {
        return gameRepository.findAll(pageable);
    }

    public Page<Game> searchGamesByTitlePaged(String title, Pageable pageable) {
        return gameRepository.findByTitleContainingIgnoreCase(title, pageable);
    }
    public Page<Game> searchGamesByGenrePaged(String genre, Pageable pageable) {
        return gameRepository.findByGenreContaining(genre, pageable);
    }

    public Page<Game> filterAndSortGames(
            String title, String genre, String platform, String publisher, String devTeam,
            BigDecimal minPrice, BigDecimal maxPrice, Boolean featured, Boolean inStock,
            String sortBy, String sortDir, Pageable pageable) {
        Specification<Game> spec = Specification.where(null);
        if (StringUtils.hasText(title)) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%"));
        }
        if (StringUtils.hasText(genre)) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("genres")), "%" + genre.toLowerCase() + "%"));
        }
        if (StringUtils.hasText(platform)) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("platforms")), "%" + platform.toLowerCase() + "%"));
        }
        if (StringUtils.hasText(publisher)) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("publisher")), "%" + publisher.toLowerCase() + "%"));
        }
        if (StringUtils.hasText(devTeam)) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("devTeam")), "%" + devTeam.toLowerCase() + "%"));
        }
        if (minPrice != null) {
            spec = spec.and((root, query, cb) -> cb.ge(root.get("price"), minPrice));
        }
        if (maxPrice != null) {
            spec = spec.and((root, query, cb) -> cb.le(root.get("price"), maxPrice));
        }
        if (featured != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("featured"), featured));
        }
        if (inStock != null && inStock) {
            spec = spec.and((root, query, cb) -> cb.greaterThan(root.get("stockQuantity"), 0));
        }
        // Sorting is handled by Pageable
        return gameRepository.findAll(spec, pageable);
    }

    public List<Game> getRecommendedGames(Long id, int limit) {
        Optional<Game> currentOpt = gameRepository.findById(id);
        if (currentOpt.isEmpty()) return List.of();
        Game current = currentOpt.get();
        String[] genres = current.getGenres() != null ? current.getGenres().split(",") : new String[0];
        List<Game> all = gameRepository.findAll();
        return all.stream()
            .filter(g -> !g.getId().equals(id))
            .sorted((g1, g2) -> {
                int overlap1 = countOverlap(genres, g1.getGenres());
                int overlap2 = countOverlap(genres, g2.getGenres());
                return Integer.compare(overlap2, overlap1);
            })
            .limit(limit)
            .toList();
    }
    private int countOverlap(String[] genres, String otherGenres) {
        if (otherGenres == null) return 0;
        int count = 0;
        for (String g : genres) {
            for (String og : otherGenres.split(",")) {
                if (g.trim().equalsIgnoreCase(og.trim())) count++;
            }
        }
        return count;
    }
} 