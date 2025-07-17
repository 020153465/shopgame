# ShopGame - Video Game E-commerce Platform

A complete e-commerce platform for video games built with Spring Boot, Angular, and MySQL. This project demonstrates a full-stack application with modern architecture and best practices.

## Features

### Customer Features
- **Browse Games**: View all available video games with detailed information
- **Search & Filter**: Search by title, filter by genre, platform, developer, or publisher
- **Shopping Cart**: Add games to cart, manage quantities, and remove items
- **User Authentication**: Register and login functionality
- **Game Details**: Detailed view of individual games with all specifications

### Admin Features
- **Game Management**: Add, edit, and delete games
- **User Management**: View and manage user accounts
- **Inventory Management**: Track stock quantities
- **Order Management**: View and process orders

### Technical Features
- **JWT Authentication**: Secure token-based authentication with auto-generated secrets
- **RESTful API**: Complete CRUD operations for all entities
- **Modern UI**: Angular Material design with responsive layout
- **Database**: MySQL with proper relationships and constraints
- **Docker**: Single command deployment with persistent data
- **HTTPS & HTTP**: Access the site securely via HTTPS or plain HTTP, with automatic self-signed certificate generation (no manual steps required)

## Technology Stack

### Backend
- **Java 17** with Spring Boot 3.2.0
- **Spring Security** with JWT authentication
- **Spring Data JPA** for database operations
- **MySQL 8.0** database
- **Flyway** for database migrations
- **Maven** for dependency management

### Frontend
- **Angular 18** with standalone components
- **Angular Material** for UI components
- **TypeScript** for type safety
- **RxJS** for reactive programming
- **Nginx** for serving static files

### Infrastructure
- **Docker** and **Docker Compose** for containerization
- **MySQL** for data persistence
- **Nginx** for reverse proxy and static file serving
- **Auto-generated JWT secrets** for secure, portable deployment
- **Auto-generated HTTPS certificates** for secure access

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- At least 4GB of available RAM
- Ports 4200, 4443, 8080, and 3306 available

### Running the Application

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shopgame
   ```

2. **Start all services with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - **Frontend (HTTP)**: http://localhost:4200
   - **Frontend (HTTPS, self-signed)**: https://localhost:4443
   - **Backend API**: http://localhost:8080
   - **Database**: localhost:3306

   > **Note:** Browsers will warn about the self-signed certificate on HTTPS. You can safely proceed for development/testing.
   > 
   > To access from another device on your network, use your PC's IP address (e.g., `https://<your-pc-ip>:4443`).

4. **Default credentials**
   - **Admin**: username: `admin`, password: `password`
   - **User**: username: `user`, password: `password`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Games
- `GET /api/games` - Get all games
- `GET /api/games/{id}` - Get game by ID
- `GET /api/games/search` - Search games with filters
- `POST /api/games` - Create new game (Admin)
- `PUT /api/games/{id}` - Update game (Admin)
- `DELETE /api/games/{id}` - Delete game (Admin)

### Cart
- `GET /api/cart/{userId}` - Get user's cart
- `POST /api/cart/{userId}/add` - Add item to cart
- `PUT /api/cart/{cartItemId}/quantity` - Update quantity
- `DELETE /api/cart/{cartItemId}` - Remove from cart
- `DELETE /api/cart/{userId}/clear` - Clear cart

## Database Schema

The application uses the following main entities:
- **Users**: User accounts with roles (USER/ADMIN)
- **Games**: Video game products with detailed information
- **Cart**: Shopping cart items for users
- **Orders**: Purchase orders with status tracking
- **OrderItems**: Individual items within orders

## Development

### Backend Development
```bash
cd Backend
mvn spring-boot:run
```

### Frontend Development
```bash
cd Frontend
npm install
npm start
```

### Database
The database is automatically initialized with sample data including:
- Sample games (Cyberpunk 2077, The Witcher 3, etc.)
- Admin and user accounts
- Proper database schema with relationships

### Security
- **JWT Secrets**: Automatically generated secure 512-bit secrets on first run
- **Persistence**: JWT secrets are stored in Docker volumes and persist across deployments
- **Portability**: No manual configuration required - works out of the box on any machine
- **HTTPS**: Self-signed certificates are generated automatically during Docker build; no manual steps required

## Project Structure

```
shopgame/
├── Backend/                 # Spring Boot application
│   ├── src/main/java/
│   │   └── com/shopgame/
│   │       ├── controller/  # REST controllers
│   │       ├── model/       # JPA entities
│   │       ├── repository/  # Data access layer
│   │       ├── service/     # Business logic
│   │       └── security/    # JWT authentication
│   ├── pom.xml
│   └── Dockerfile
├── Frontend/                # Angular application
│   ├── src/app/
│   │   ├── components/      # Angular components
│   │   ├── services/        # API services
│   │   └── app.*           # App configuration
│   ├── package.json
│   └── Dockerfile
├── Database/
│   └── init.sql            # Database initialization
├── docker-compose.yml      # Docker orchestration
└── README.md
```

## Contributing

This is a demonstration project showcasing modern web development practices. Feel free to explore the code and use it as a reference for your own projects.

## License

This project is for educational and demonstration purposes.
