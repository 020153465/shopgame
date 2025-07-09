package com.shopgame.repository;

import com.shopgame.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findByTitleContainingIgnoreCase(String title);
    
    Page<Game> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    
    @Query("SELECT g FROM Game g WHERE g.genres LIKE %:genre%")
    List<Game> findByGenreContaining(@Param("genre") String genre);
    
    @Query("SELECT g FROM Game g WHERE g.genres LIKE %:genre%")
    Page<Game> findByGenreContaining(@Param("genre") String genre, Pageable pageable);
    
    @Query("SELECT g FROM Game g WHERE g.platforms LIKE %:platform%")
    List<Game> findByPlatformContaining(@Param("platform") String platform);
    
    List<Game> findByDevTeamContainingIgnoreCase(String devTeam);
    
    List<Game> findByPublisherContainingIgnoreCase(String publisher);
    List<Game> findByFeaturedTrue();
    Page<Game> findAll(Specification<Game> spec, Pageable pageable);
} 