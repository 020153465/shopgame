package com.shopgame.controller;

import com.shopgame.model.User;
import com.shopgame.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    // --- Self-service endpoints ---

    @GetMapping("/users/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        Optional<User> user = userService.getUserByUsername(username);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/users/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateCurrentUser(Authentication authentication, @RequestBody User userDetails) {
        String username = authentication.getName();
        Optional<User> userOpt = userService.getUserByUsername(username);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        User updated = userService.updateUser(userOpt.get().getId(), userDetails);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/users/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        Optional<User> userOpt = userService.getUserByUsername(username);
        if (userOpt.isEmpty()) return ResponseEntity.notFound().build();
        userService.deleteUser(userOpt.get().getId());
        return ResponseEntity.ok("Account deleted");
    }

    // --- Admin endpoints ---

    @GetMapping("/admin/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/admin/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/admin/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUserById(@PathVariable Long id, @RequestBody User userDetails) {
        User updated = userService.updateUser(id, userDetails);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/admin/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUserById(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
} 