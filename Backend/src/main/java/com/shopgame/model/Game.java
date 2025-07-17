package com.shopgame.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "games")
public class Game {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotNull
    @DecimalMin("0.0")
    @Column(nullable = false)
    private BigDecimal price;
    
    private String genres; // Comma-separated genres
    
    private String platforms; // Comma-separated platforms
    
    private String devTeam;
    
    private String publisher;
    
    // Stores the remote URL of the cover image
    private String coverImageUrl;

    // New: Stores the local filename of the cover image (if available)
    private String coverImageFilename;

    // New: Stores a reference URL to the game (e.g., Steam, IGDB, Wikipedia)
    private String referenceUrl;
    
    private Integer stockQuantity = 0;

    private boolean featured = false;
    // Stores the filename of the music file in /assets/music/
    private String musicUrl;
    
    // System Requirements
    private String minOs;
    private String minCpu;
    private String minRam;
    private String minGpu;
    private String minStorage;
    private String recOs;
    private String recCpu;
    private String recRam;
    private String recGpu;
    private String recStorage;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Constructors
    public Game() {}
    
    public Game(String title, String description, BigDecimal price) {
        this.title = title;
        this.description = description;
        this.price = price;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public String getGenres() {
        return genres;
    }
    
    public void setGenres(String genres) {
        this.genres = genres;
    }
    
    public String getPlatforms() {
        return platforms;
    }
    
    public void setPlatforms(String platforms) {
        this.platforms = platforms;
    }
    
    public String getDevTeam() {
        return devTeam;
    }
    
    public void setDevTeam(String devTeam) {
        this.devTeam = devTeam;
    }
    
    public String getPublisher() {
        return publisher;
    }
    
    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }
    
    public String getCoverImageUrl() {
        return coverImageUrl;
    }
    
    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }

    public String getCoverImageFilename() {
        return coverImageFilename;
    }

    public void setCoverImageFilename(String coverImageFilename) {
        this.coverImageFilename = coverImageFilename;
    }

    public String getReferenceUrl() {
        return referenceUrl;
    }

    public void setReferenceUrl(String referenceUrl) {
        this.referenceUrl = referenceUrl;
    }
    
    public Integer getStockQuantity() {
        return stockQuantity;
    }
    
    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }
    
    public boolean isFeatured() {
        return featured;
    }
    public void setFeatured(boolean featured) {
        this.featured = featured;
    }
    public String getMusicUrl() {
        return musicUrl;
    }
    public void setMusicUrl(String musicUrl) {
        this.musicUrl = musicUrl;
    }
    
    public String getMinOs() { return minOs; }
    public void setMinOs(String minOs) { this.minOs = minOs; }
    public String getMinCpu() { return minCpu; }
    public void setMinCpu(String minCpu) { this.minCpu = minCpu; }
    public String getMinRam() { return minRam; }
    public void setMinRam(String minRam) { this.minRam = minRam; }
    public String getMinGpu() { return minGpu; }
    public void setMinGpu(String minGpu) { this.minGpu = minGpu; }
    public String getMinStorage() { return minStorage; }
    public void setMinStorage(String minStorage) { this.minStorage = minStorage; }
    public String getRecOs() { return recOs; }
    public void setRecOs(String recOs) { this.recOs = recOs; }
    public String getRecCpu() { return recCpu; }
    public void setRecCpu(String recCpu) { this.recCpu = recCpu; }
    public String getRecRam() { return recRam; }
    public void setRecRam(String recRam) { this.recRam = recRam; }
    public String getRecGpu() { return recGpu; }
    public void setRecGpu(String recGpu) { this.recGpu = recGpu; }
    public String getRecStorage() { return recStorage; }
    public void setRecStorage(String recStorage) { this.recStorage = recStorage; }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
} 