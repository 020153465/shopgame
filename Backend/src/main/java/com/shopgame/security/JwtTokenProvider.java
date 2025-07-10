package com.shopgame.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Key;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret:}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private int jwtExpirationInMs;

    private static final String JWT_SECRET_FILE = "jwt-secret.txt";
    private static final int SECRET_LENGTH_BYTES = 64; // 512 bits for HS512

    private String getOrCreateJwtSecret() {
        // If secret is provided via environment/properties, use it
        if (jwtSecret != null && !jwtSecret.trim().isEmpty() && 
            !jwtSecret.equals("your-secret-key-here-make-it-long-and-secure-in-production")) {
            return jwtSecret;
        }

        // Try to read from file first
        String secretFromFile = readSecretFromFile();
        if (secretFromFile != null) {
            return secretFromFile;
        }

        // Generate new secret
        String newSecret = generateSecureSecret();
        writeSecretToFile(newSecret);
        return newSecret;
    }

    private String readSecretFromFile() {
        try {
            Path secretPath = Paths.get(JWT_SECRET_FILE);
            if (Files.exists(secretPath)) {
                return Files.readString(secretPath).trim();
            }
        } catch (IOException e) {
            System.err.println("Warning: Could not read JWT secret from file: " + e.getMessage());
        }
        return null;
    }

    private void writeSecretToFile(String secret) {
        try {
            Path secretPath = Paths.get(JWT_SECRET_FILE);
            Files.writeString(secretPath, secret);
            System.out.println("Generated new JWT secret and saved to: " + secretPath.toAbsolutePath());
        } catch (IOException e) {
            System.err.println("Warning: Could not write JWT secret to file: " + e.getMessage());
        }
    }

    private String generateSecureSecret() {
        SecureRandom random = new SecureRandom();
        byte[] secretBytes = new byte[SECRET_LENGTH_BYTES];
        random.nextBytes(secretBytes);
        return Base64.getEncoder().encodeToString(secretBytes);
    }

    private Key getSigningKey() {
        String secret = getOrCreateJwtSecret();
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(Authentication authentication) {
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(authToken);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
} 