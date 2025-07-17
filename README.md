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
- **Modern UI**: Angular Material design with responsive layout and dark mode support
- **Database**: MySQL with proper relationships and constraints
- **Docker**: Single command deployment with persistent data
- **HTTPS & HTTP**: Access the site securely via HTTPS or plain HTTP, with automatic self-signed certificate generation
- **Production Ready**: Configured for Cloudflare, No-IP, and direct domain access

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
- **Nginx** for serving static files and reverse proxy

### Infrastructure
- **Docker** and **Docker Compose** for containerization
- **MySQL** for data persistence
- **Nginx** for reverse proxy and static file serving
- **Auto-generated JWT secrets** for secure, portable deployment
- **Auto-generated HTTPS certificates** for secure access
- **Cloudflare integration** for production SSL

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- At least 4GB of available RAM
- Ports 80, 4200, 4443, 8080, and 3306 available

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

## Production Deployment

### Port Forwarding Requirements

Your router needs to forward these ports to your server's local IP:

#### **Required Ports:**
- **Port 80** → Your server's local IP (for HTTP/Cloudflare)
- **Port 4443** → Your server's local IP (for HTTPS direct access)

#### **Optional Ports:**
- **Port 4200** → Your server's local IP (alternative HTTP access)
- **Port 8080** → Your server's local IP (direct backend access - not recommended for production)

### Deployment Scenarios

#### **Scenario 1: Cloudflare Flexible SSL (Recommended for Production)**

**Setup:**
1. Point your domain to your server's public IP on port 80
2. Configure Cloudflare with Flexible SSL
3. Forward only port 80 in your router

**URL for testing:** `https://yourdomain.com`

**Advantages:**
- Cloudflare handles SSL certificates
- Better performance with CDN
- DDoS protection
- No SSL warnings for users

#### **Scenario 2: Direct HTTPS Access (No-IP style)**

**Setup:**
1. Point your domain to your server's public IP on port 4443
2. Forward only port 4443 in your router

**URL for testing:** `https://yourdomain.com:4443`

**Note:** Users will see SSL warnings due to self-signed certificates

#### **Scenario 3: Direct HTTP Access (Development)**

**Setup:**
1. Point your domain to your server's public IP on port 80 or 4200
2. Forward port 80 or 4200 in your router

**URL for testing:** `http://yourdomain.com` or `http://yourdomain.com:4200`

### Docker Port Mappings

```yaml
frontend:
  - "80:80"     # HTTP (Cloudflare)
  - "4200:80"   # Alternative HTTP
  - "4443:443"  # HTTPS (direct)

backend:
  - "8080:8080" # Direct backend (not needed for production)

mysql:
  - "3306:3306" # Database (not needed for production)
```

### Testing Instructions for Developers

#### **Local Development Testing:**
```bash
# Start the application
docker-compose up --build

# Test URLs
http://localhost:4200          # Frontend HTTP
https://localhost:4443         # Frontend HTTPS (accept self-signed cert)
http://localhost:8080/api/games # Backend API
```

#### **Network Testing:**
```bash
# Find your local IP
ipconfig  # Windows
ifconfig  # Linux/Mac

# Test from other devices on network
http://<your-local-ip>:4200
https://<your-local-ip>:4443
```

#### **Production Testing:**
1. **Cloudflare Setup:**
   - Domain: `https://yourdomain.com`
   - Router: Forward port 80 only

2. **Direct HTTPS Setup:**
   - Domain: `https://yourdomain.com:4443`
   - Router: Forward port 4443 only

3. **Test Checklist:**
   - [ ] Frontend loads correctly
   - [ ] Game images display properly
   - [ ] User registration/login works
   - [ ] Shopping cart functionality
   - [ ] Admin panel accessible
   - [ ] API endpoints respond correctly

### Troubleshooting

#### **Images Not Loading:**
- Check nginx configuration in `Frontend/nginx.conf`
- Verify `/api/assets/` proxy is working
- Ensure backend is serving assets correctly

#### **SSL Certificate Warnings:**
- **Self-signed certificates**: Normal for development, users can accept warnings
- **Cloudflare**: Use Flexible SSL mode, no warnings for users
- **Production**: Consider Let's Encrypt for proper certificates

#### **Port Access Issues:**
- Verify router port forwarding is configured
- Check firewall settings
- Ensure Docker containers are running: `docker-compose ps`

#### **Database Connection Issues:**
- Check MySQL container health: `docker-compose logs mysql`
- Verify database credentials in `docker-compose.yml`
- Ensure volumes are properly mounted

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
- **HTTPS**: Self-signed certificates are generated automatically during Docker build

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
│   ├── nginx.conf          # Nginx configuration
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
