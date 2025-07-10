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
    featured BOOLEAN DEFAULT FALSE,
    music_url VARCHAR(500),
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
INSERT INTO games (title, description, price, genres, platforms, dev_team, publisher, cover_image_url, stock_quantity, featured, music_url) VALUES
('Cyberpunk 2077', 'An open-world action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.', 59.99, 'RPG,Action,Adventure', 'PC,PS4,PS5,Xbox One,Xbox Series X', 'CD Projekt Red', 'CD Projekt', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co7497.png', 50, TRUE, 'https://www.youtube.com/watch?v=8X2kIfS6fb8'),
('The Witcher 3: Wild Hunt', 'A story-driven open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.', 39.99, 'RPG,Action,Adventure', 'PC,PS4,PS5,Xbox One,Xbox Series X,Nintendo Switch', 'CD Projekt Red', 'CD Projekt', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png', 75, TRUE, 'https://www.youtube.com/watch?v=2-Xw0_2eMJg'),
('Red Dead Redemption 2', 'An epic tale of life in America at the dawn of the modern age.', 49.99, 'Action,Adventure,Western', 'PC,PS4,PS5,Xbox One,Xbox Series X', 'Rockstar Games', 'Rockstar Games', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.png', 30, TRUE, 'https://www.youtube.com/watch?v=gmA6MrX81z4'),
('Elden Ring', 'An action RPG set in a vast fantasy world where you must become the Elden Lord.', 69.99, 'RPG,Action,Adventure', 'PC,PS4,PS5,Xbox One,Xbox Series X', 'FromSoftware', 'Bandai Namco', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.png', 25, TRUE, 'https://www.youtube.com/watch?v=E3Huy2cdih0'),
('God of War Ragnarök', 'Kratos and Atreus must journey to each of the Nine Realms in search of answers.', 69.99, 'Action,Adventure,Hack and Slash', 'PS4,PS5', 'Santa Monica Studio', 'Sony Interactive Entertainment', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.png', 40, TRUE, 'https://www.youtube.com/watch?v=EE-4GvjKcfs'),
('Minecraft', 'A sandbox video game where players can build, explore, and survive in a blocky 3D world.', 26.95, 'Sandbox,Adventure,Survival', 'PC,PS4,PS5,Xbox One,Xbox Series X,Nintendo Switch', 'Mojang Studios', 'Mojang Studios', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co8fu7.png', 100, FALSE, NULL),
('Grand Theft Auto V', 'An action-adventure game set in the fictional state of San Andreas.', 29.99, 'Action,Adventure,Open World', 'PC,PS4,PS5,Xbox One,Xbox Series X', 'Rockstar North', 'Rockstar Games', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.png', 60, FALSE, NULL),
('The Legend of Zelda: Breath of the Wild', 'An action-adventure game where you explore a vast open world.', 59.99, 'Action,Adventure,Puzzle', 'Nintendo Switch,Wii U', 'Nintendo EPD', 'Nintendo', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.png', 35, FALSE, NULL),
('Hollow Knight', 'A challenging and atmospheric action-adventure set in a vast, ruined kingdom of insects and heroes.', 14.99, 'Action,Adventure,Metroidvania', 'PC,PS4,PS5,Xbox One,Nintendo Switch', 'Team Cherry', 'Team Cherry', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co93cr.png', 50, FALSE, 'https://www.youtube.com/watch?v=UAO2urG23S4'),
('Persona 5 Royal', 'A critically acclaimed JRPG about rebellious high schoolers and their alter egos.', 59.99, 'RPG,JRPG,Turn-Based', 'PC,PS4,PS5,Xbox One,Xbox Series X,Nintendo Switch', 'Atlus', 'Atlus', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1nic.png', 40, FALSE, 'https://www.youtube.com/watch?v=Oa1bYtQvQ7g'),
('Super Mario Odyssey', 'Mario embarks on a massive, globe-trotting 3D adventure.', 49.99, 'Platformer,Adventure', 'Nintendo Switch', 'Nintendo EPD', 'Nintendo', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1mxf.png', 30, FALSE, 'https://www.youtube.com/watch?v=5kcdRBHM7kM'),
('Sekiro: Shadows Die Twice', 'A brutal action-adventure game set in Sengoku Japan.', 39.99, 'Action,Adventure,Soulslike', 'PC,PS4,PS5,Xbox One', 'FromSoftware', 'Activision', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2a23.png', 25, FALSE, 'https://www.youtube.com/watch?v=4OgoTZXPACo'),
('Stardew Valley', 'A relaxing farming and life simulation game with deep mechanics and charm.', 14.99, 'Simulation,RPG,Indie', 'PC,PS4,PS5,Xbox One,Xbox Series X,Nintendo Switch,Mobile', 'ConcernedApe', 'ConcernedApe', 'https://images.igdb.com/igdb/image/upload/t_cover_big/xrpmydnu9rpxvxfjkiu7.png', 100, FALSE, 'https://www.youtube.com/watch?v=ot7uXNQskhs'),
('Final Fantasy VII Remake', 'A reimagining of the iconic original with modern graphics and gameplay.', 59.99, 'RPG,Action', 'PS4,PS5,PC', 'Square Enix', 'Square Enix', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1qxr.png', 40, FALSE, NULL),
('Animal Crossing: New Horizons', 'Create your own paradise on a deserted island brimming with possibility.', 59.99, 'Simulation,Social', 'Nintendo Switch', 'Nintendo EPD', 'Nintendo', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3wls.png', 50, FALSE, NULL),
('DOOM Eternal', 'Rip and tear through hordes of demons in this fast-paced shooter.', 39.99, 'Shooter,Action', 'PC,PS4,PS5,Xbox One,Xbox Series X,Nintendo Switch', 'id Software', 'Bethesda Softworks', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3p5n.png', 30, FALSE, NULL),
('Hades', 'Battle out of hell in this rogue-like dungeon crawler from Supergiant Games.', 24.99, 'Roguelike,Action,Indie', 'PC,PS4,PS5,Xbox One,Xbox Series X,Nintendo Switch', 'Supergiant Games', 'Supergiant Games', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co39vc.png', 40, FALSE, NULL),
('Celeste', 'A platformer about climbing a mountain, facing your inner demons, and overcoming challenges.', 19.99, 'Platformer,Indie', 'PC,PS4,PS5,Xbox One,Xbox Series X,Nintendo Switch', 'Matt Makes Games', 'Matt Makes Games', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3byy.png', 30, FALSE, NULL),
('Resident Evil Village', 'Survive the horrors of a mysterious village in the latest Resident Evil.', 59.99, 'Horror,Action', 'PC,PS4,PS5,Xbox One,Xbox Series X', 'Capcom', 'Capcom', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2zpu.png', 25, FALSE, NULL),
('Spider-Man: Miles Morales', 'Experience the rise of Miles Morales as the new hero masters incredible powers.', 49.99, 'Action,Adventure', 'PS4,PS5,PC', 'Insomniac Games', 'Sony Interactive Entertainment', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2dwe.png', 35, FALSE, NULL); 