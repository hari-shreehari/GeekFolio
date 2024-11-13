# GeekFolio: Automated Portfolio Generator

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Local Development Setup](#local-development-setup)
- [System Architecture](#system-architecture)
- [Deployment Guide](#deployment-guide)
- [Configuration](#configuration)
- [Testing](#testing)
- [Maintenance](#maintenance)
- [Troubleshooting](#troubleshooting)
- [Production Deployment](#production-deployment)

## Overview

GeekFolio is an automated portfolio generator that transforms resumes into professional portfolio websites using Vultr's cloud infrastructure and AI capabilities. The system provides instant portfolio generation with minimal user interaction, ensuring high availability and scalability.

## Features

### Multi-Format Mastery

- Seamlessly process PDF, DOCX, and even scanned image resumes
- Support for international resume formats and multiple languages
- Smart handling of custom templates and layouts

### Intelligent Data Extraction

- Advanced OCR with 99.9% accuracy for text recognition
- Machine learning algorithms trained on 100,000+ resumes
- Automatic categorization of skills, experiences, and achievements

### Smart Content Enhancement

- AI-driven keyword optimization for better discoverability
- Automatic skill categorization and standardization
- Experience summary generation with impact metrics

### Intelligent Layout Selection

- AI-driven template matching based on industry and career level
- Dynamic content organization optimized for user engagement
- Responsive designs that adapt to any device or screen size

### Professional Customization

- 25+ industry-specific portfolio templates
- Custom color schemes based on personal brand guidelines
- Typography optimization for maximum readability
- Dynamic content blocks that highlight key achievements

### Interactive Elements

- Project showcases with multimedia support
- Skill visualization through interactive charts
- Timeline-based experience presentation
- Real-time portfolio statistics and visitor analytics

## Local Development Setup

### Prerequisites

```bash
# Required software versions
Node.js >= 16.x
Python >= 3.9
Docker >= 20.10
Docker Compose >= 2.0
PostgreSQL >= 13
```

### Environment Setup

1. **Clone the Repository**

```bash
git clone https://github.com/your-org/geekfolio.git
cd geekfolio
```

2. **Frontend Setup (Next.js)**

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create local environment file
cp .env.example .env.local

# Configure local environment variables
# Open .env.local and set the following:
NEXT_PUBLIC_API_URL=http://localhost:8000/extract
NEXT_DATABASE_URL=postgresql://user:password@localhost:5432/geekfolio
NEXT_PUBLIC_UPLOAD_URL=http://localhost:8000/upload
```

3. **Backend Setup (FastAPI)**

```bash
# Navigate to backend directory
cd ../backend

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Unix or MacOS:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Create local environment file
cp .env.example .env

# Configure backend environment variables
# Open .env and set:
DATABASE_URL=postgresql://user:password@localhost:5432/geekfolio
OCR_API_KEY=your_ocr_api_key
LLM_API_KEY=your_llm_api_key
```

4. **Database Setup**

```bash
# Create local PostgreSQL database
createdb geekfolio

# Run database migrations
cd backend
alembic upgrade head
```

5. **Local Docker Setup**

```bash
# Create local Docker network
docker network create geekfolio-network

# Build local Docker images
docker-compose build
```

### Running the Application Locally

1. **Start Database**

```bash
# If using Docker for PostgreSQL
docker-compose up -d postgres

# Wait for database to be ready
sleep 5
```

2. **Start Backend Services**

```bash
# Option 1: Run directly with Python
cd backend
uvicorn main:app --reload --port 8000

# Option 2: Run with Docker
docker-compose up -d backend
```

3. **Start Frontend Development Server**

```bash
# Option 1: Run directly with npm
cd frontend
npm run dev

# Option 2: Run with Docker
docker-compose up -d frontend
```

4. **Start Reverse Proxy (Optional for local development)**

```bash
# Only needed if testing full infrastructure
docker-compose up -d caddy
```

### Verifying Local Setup

1. **Check Services**

```bash
# Verify all containers are running
docker-compose ps

# Check backend health
curl http://localhost:8000/health

# Check frontend
curl http://localhost:3000
```

2. **Test File Upload**

```bash
# Test resume upload endpoint
curl -X POST -F "file=@test/fixtures/sample-resume.pdf" \
  http://localhost:8000/upload
```

## System Architecture

### Frontend Architecture

- **Framework**: Next.js
- **Key Dependencies**:
  ```json
  {
    "next": "^12.0.0",
    "react": "^17.0.2",
    "tailwindcss": "^2.2.19",
    "axios": "^0.24.0"
  }
  ```
- **Directory Structure**:
  ```
  frontend/
  ├── components/
  │   ├── common/
  │   ├── layout/
  │   └── portfolio/
  ├── pages/
  ├── public/
  ├── styles/
  └── utils/
  ```

### Backend Architecture

- **Framework**: FastAPI
- **Key Dependencies**:
  ```requirements.txt
  fastapi==0.68.0
  uvicorn==0.15.0
  python-multipart==0.0.5
  sqlalchemy==1.4.23
  psycopg2-binary==2.9.1
  ```
- **Directory Structure**:
  ```
  backend/
  ├── api/
  │   ├── endpoints/
  │   └── dependencies/
  ├── core/
  ├── db/
  ├── models/
  └── services/
  ```

## Configuration

### Environment Variables

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_UPLOAD_URL=http://localhost:8000/upload
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_DATABASE_URL=postgresql://user:password@localhost:5432/geekfolio
```

#### Backend (.env)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/geekfolio
OCR_API_KEY=your_ocr_api_key
LLM_API_KEY=your_llm_api_key
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
```

### Docker Configuration

#### docker-compose.yml

```yaml
version: "3.8"
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - ./frontend:/app
      - /app/node_modules

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - PYTHONPATH=/app
    volumes:
      - ./backend:/app

  postgres:
    image: postgres:13
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=geekfolio
```

## Testing

### Frontend Testing

```bash
# Run unit tests
cd frontend
npm test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
```

### Backend Testing

```bash
# Activate virtual environment
source venv/bin/activate

# Run unit tests
pytest tests/unit

# Run integration tests
pytest tests/integration

# Run with coverage
pytest --cov=app tests/
```

### Load Testing

```bash
# Install k6
npm install -g k6

# Run load tests
k6 run tests/load/upload_test.js
```

## Maintenance

### Database Maintenance

```bash
# Backup database
pg_dump -U user geekfolio > backup.sql

# Restore database
psql -U user geekfolio < backup.sql

# Run migrations
alembic upgrade head
```

### Log Management

```bash
# View frontend logs
docker-compose logs frontend

# View backend logs
docker-compose logs backend

# Follow logs in real-time
docker-compose logs -f
```

## Troubleshooting

### Common Issues

1. **Database Connection Issues**

```bash
# Check database status
docker-compose ps postgres

# Check database logs
docker-compose logs postgres

# Verify connection
psql -h localhost -U user -d geekfolio
```

2. **Frontend Build Issues**

```bash
# Clear Next.js cache
cd frontend
rm -rf .next
npm run build

# Check for dependency issues
npm audit
```

3. **Backend Service Issues**

```bash
# Check backend logs
docker-compose logs backend

# Verify API health
curl http://localhost:8000/health

# Reset backend container
docker-compose restart backend
```

## Production Deployment

### Prerequisites

- Vultr account with appropriate permissions
- Domain name configured with Vultr DNS
- SSL/TLS certificates
- Vultr API key

### Deployment Steps

1. **Configure Vultr Infrastructure**

```bash
# Set up VPC
vultr-cli vpc create --region ewr --description "GeekFolio VPC"

# Create compute instances
vultr-cli instance create \
  --region ewr \
  --plan vc2-2c-4gb \
  --os 387 \
  --label "geekfolio-prod"
```

2. **Configure DNS**

```bash
# Add DNS records
vultr-cli dns record create \
  --domain geekfolio.site \
  --name @ \
  --type A \
  --data YOUR_INSTANCE_IP
```

3. **Deploy Application**

```bash
# Deploy using Docker
docker-compose -f docker-compose.prod.yml up -d

# Verify deployment
curl https://geekfolio.site/health
```

### Monitoring Setup

```bash
# Install monitoring tools
docker-compose -f docker-compose.monitoring.yml up -d

# Configure alerting
./scripts/setup-alerts.sh
```

## Support and Contributing

For technical support or to contribute to the project:

1. Open an issue in the GitHub repository
2. Submit pull requests for review

## License

© 2024 GeekFolio. All rights reserved.
