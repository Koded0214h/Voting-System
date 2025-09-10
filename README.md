# Voting System

A full-stack web application for managing elections, allowing users to register, view elections, vote for candidates, and view results. Designed for educational institutions or organizations to conduct secure and fair voting processes.

## Features

### User Management
- User registration with matric number (unique identifier)
- Secure authentication using JWT tokens
- User profiles with username and matric number

### Election Management
- Create and manage multiple elections
- Control election status (active/inactive)
- Manage result visibility (show/hide results)

### Candidate Management
- Register candidates for specific elections
- View candidate lists per election
- Link candidates to user accounts

### Voting System
- Secure voting mechanism with one-vote-per-election rule
- Timestamp tracking for votes
- Prevention of duplicate votes through database constraints

### Results & Analytics
- Real-time vote counting
- Results display with vote counts per candidate
- Controlled result visibility by election administrators

### User Interface
- Responsive React frontend
- Intuitive navigation with React Router
- Clean, modern UI with CSS styling
- Landing page for new users

## Tech Stack

### Backend
- **Django** - Web framework
- **Django REST Framework** - API development
- **SQLite** - Database (development)
- **PostgreSQL** - Database (production via DATABASE_URL)
- **JWT Authentication** - Secure token-based auth
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **ESLint** - Code linting

## Project Structure

```
voting-system/
├── backend/                    # Django backend
│   ├── backend/               # Django project settings
│   ├── core/                  # Main app
│   │   ├── models.py         # Database models
│   │   ├── views.py          # API views
│   │   ├── serializers.py    # Data serialization
│   │   ├── urls.py           # URL routing
│   │   └── migrations/       # Database migrations
│   ├── manage.py             # Django management script
│   └── db.sqlite3            # SQLite database
├── voting-frontend/           # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── api.js           # API client
│   │   └── App.jsx          # Main app component
│   ├── package.json         # Dependencies
│   └── vite.config.js       # Vite configuration
└── README.md                # This file
```

## Database Models

### CustomUser
- Extends Django's AbstractUser
- Additional field: matric_number (unique)

### Election
- title: Election name
- description: Election details
- active_status: Boolean for voting status
- show_results: Boolean for result visibility

### Candidate
- user: Foreign key to CustomUser
- election: Foreign key to Election

### Vote
- user: Foreign key to CustomUser
- candidate: Foreign key to Candidate
- timestamp: Automatic timestamp
- Unique constraint: (user, candidate.election) prevents multiple votes per election

## API Endpoints

### Authentication
- `POST /api/register/` - User registration
- `POST /api/token/` - JWT token obtain
- `POST /api/token/refresh/` - JWT token refresh

### Elections
- `GET /api/elections/` - List all elections

### Candidates
- `GET /api/elections/{id}/candidates/` - List candidates for election

### Voting
- `POST /api/vote/` - Cast a vote

### Results
- `GET /api/elections/{id}/results/` - Get election results (if enabled)

## Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
Create a `.env` file with:
```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3  # or PostgreSQL URL
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Create superuser (optional):
```bash
python manage.py createsuperuser
```

7. Start development server:
```bash
python manage.py runserver
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd voting-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:8000`

## Usage

1. **Registration**: New users register with username and matric number
2. **Login**: Authenticate to access the voting system
3. **View Elections**: Browse available elections on the elections page
4. **View Candidates**: See candidates for each election
5. **Vote**: Cast your vote for a candidate (one vote per election)
6. **View Results**: Check results when enabled by administrators

## Security Features

- JWT token authentication
- Unique matric number for user identification
- One-vote-per-election constraint
- CORS protection
- Password hashing
- Input validation through serializers

## Development

### Running Tests
```bash
# Backend tests
cd backend
python manage.py test

# Frontend linting
cd voting-frontend
npm run lint
```

### Building for Production
```bash
# Frontend build
cd voting-frontend
npm run build

# Backend static files
cd backend
python manage.py collectstatic
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues, please open an issue on the GitHub repository.
