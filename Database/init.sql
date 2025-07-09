-- ShopGame Database Schema

-- Users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role ENUM('USER', 'ADMIN') DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Games table
CREATE TABLE games (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    genres VARCHAR(255), -- Comma-separated genres
    platforms VARCHAR(255), -- Comma-separated platforms
    dev_team VARCHAR(255),
    publisher VARCHAR(255),
    cover_image_url VARCHAR(500),
    stock_quantity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Cart table
CREATE TABLE cart (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    game_id BIGINT NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_game (user_id, game_id)
);

-- Orders table
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
    payment_method VARCHAR(50),
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Order items table
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    game_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price_per_unit DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);

-- Insert sample admin user
INSERT INTO users (username, email, password, first_name, last_name, role) VALUES
('admin', 'admin@shopgame.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', 'ADMIN');

-- Insert sample regular user
INSERT INTO users (username, email, password, first_name, last_name, role) VALUES
('user', 'user@shopgame.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Regular', 'User', 'USER');

-- Insert sample games
INSERT INTO games (title, description, price, genres, platforms, dev_team, publisher, cover_image_url, stock_quantity) VALUES
('Cyberpunk 2077', 'An open-world action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.', 59.99, 'RPG,Action,Adventure', 'PC,PS4,PS5,Xbox One,Xbox Series X', 'CD Projekt Red', 'CD Projekt', 'https://via.placeholder.com/300x400/000000/FFFFFF?text=Cyberpunk+2077', 50),
('The Witcher 3: Wild Hunt', 'A story-driven open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.', 39.99, 'RPG,Action,Adventure', 'PC,PS4,PS5,Xbox One,Xbox Series X,Nintendo Switch', 'CD Projekt Red', 'CD Projekt', 'https://via.placeholder.com/300x400/000000/FFFFFF?text=The+Witcher+3', 75),
('Red Dead Redemption 2', 'An epic tale of life in America at the dawn of the modern age.', 49.99, 'Action,Adventure,Western', 'PC,PS4,PS5,Xbox One,Xbox Series X', 'Rockstar Games', 'Rockstar Games', 'https://via.placeholder.com/300x400/000000/FFFFFF?text=Red+Dead+Redemption+2', 30),
('Elden Ring', 'An action RPG set in a vast fantasy world where you must become the Elden Lord.', 69.99, 'RPG,Action,Adventure', 'PC,PS4,PS5,Xbox One,Xbox Series X', 'FromSoftware', 'Bandai Namco', 'https://via.placeholder.com/300x400/000000/FFFFFF?text=Elden+Ring', 25),
('God of War Ragnarök', 'Kratos and Atreus must journey to each of the Nine Realms in search of answers.', 69.99, 'Action,Adventure,Hack and Slash', 'PS4,PS5', 'Santa Monica Studio', 'Sony Interactive Entertainment', 'https://via.placeholder.com/300x400/000000/FFFFFF?text=God+of+War+Ragnarok', 40),
('Minecraft', 'A sandbox video game where players can build, explore, and survive in a blocky 3D world.', 26.95, 'Sandbox,Adventure,Survival', 'PC,PS4,PS5,Xbox One,Xbox Series X,Nintendo Switch', 'Mojang Studios', 'Mojang Studios', 'https://via.placeholder.com/300x400/000000/FFFFFF?text=Minecraft', 100),
('Grand Theft Auto V', 'An action-adventure game set in the fictional state of San Andreas.', 29.99, 'Action,Adventure,Open World', 'PC,PS4,PS5,Xbox One,Xbox Series X', 'Rockstar North', 'Rockstar Games', 'https://via.placeholder.com/300x400/000000/FFFFFF?text=GTA+V', 60),
('The Legend of Zelda: Breath of the Wild', 'An action-adventure game where you explore a vast open world.', 59.99, 'Action,Adventure,Puzzle', 'Nintendo Switch,Wii U', 'Nintendo EPD', 'Nintendo', 'https://via.placeholder.com/300x400/000000/FFFFFF?text=Zelda+BotW', 35); 