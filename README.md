# Geekfolio - Resume to Portfolio Converter

Welcome to **Geekfolio**, the next-gen resume to portfolio converter! With Geekfolio, you can seamlessly convert your resume data into a personalized portfolio hosted on a custom domain.

Your portfolio will be accessible at `geekfolio.site/portfolio/username`, where `username` is your unique identifier. Built with the power of [Next.js](https://nextjs.org), Geekfolio is designed to bring your professional journey to life through a beautiful, interactive web experience.

![Geekfolio Header Image](https://via.placeholder.com/1500x500?text=Geekfolio)

---

## 🌟 Key Features

- **Dynamic Resume to Portfolio Conversion**: Automatically transforms your resume data (JSON format) into a stunning portfolio.
- **Fully Customizable**: Tailor your portfolio with your name, skills, projects, and more.
- **User-Friendly Interface**: Modern design, optimized for both desktop and mobile screens.
- **Dark Mode Toggle**: Seamlessly switch between light and dark themes for the best viewing experience.
- **SEO Optimized**: Boost your visibility and ranking on search engines with best practices in SEO.
- **Custom URL**: Access your portfolio via your unique URL on our platform, `geekfolio.site/portfolio/username`.
- **Framer Motion Animations**: Enjoy smooth transitions and animations, enhancing the user experience.
- **Tailwind CSS for Styling**: Easily customizable and responsive layout with Tailwind CSS.

---

## Architecture

![geekfolio-architecture](https://raw.githubusercontent.com/Geekfolio/VULTR_WEB/refs/heads/main/ass-ets/architecture.png)

## 📸 Screenshots

### Home Page

![Home Page](https://raw.githubusercontent.com/Geekfolio/VULTR_WEB/refs/heads/main/ass-ets/homepage.png)

### Generated Portfolio

![Portfolio](https://raw.githubusercontent.com/Geekfolio/VULTR_WEB/refs/heads/main/ass-ets/portfolio.png)

You can access it live here:- [geekfolio.site/lovelin](https://geekfolio.site/portfolio/lovelin)

### Templates

![Templates](https://raw.githubusercontent.com/Geekfolio/VULTR_WEB/refs/heads/main/ass-ets/templates.png)

---

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

1. **Test File Upload**

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

## Production Deployment

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

---

## 🧩 Built With

- [Next.js](https://nextjs.org) - The React Framework for building fast and scalable web applications.
- [Framer Motion](https://www.framer.com/motion/) - Animation library for smooth user interactions and animations.
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework for styling the portfolio.
- [Lucide Icons](https://lucide.dev/) - An icon library for customizable and lightweight icons.

---

## 📚 Documentation

- **API Documentation**: Comprehensive details on how to integrate your resume data and customize your portfolio are available [here](./docs/README.md).
- **Guides**: Step-by-step tutorials on setting up your portfolio and making it truly your own.

---

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js and its features.
- [Framer Motion](https://www.framer.com/motion/) - Animations for React-based applications.
- [Tailwind CSS](https://tailwindcss.com/docs) - Design your portfolio with utility-first CSS classes.
- [Lucide Icons](https://lucide.dev/) - Beautiful, minimalist icons to enrich your portfolio.

---

## 📝 Contributing

Contributions to Geekfolio are welcome! Whether it’s bug fixes, enhancements, or features, your contribution will help make this project even better.

### Steps to Contribute:

1. **Fork the Repository**: Start by forking the project on GitHub.
2. **Create a New Branch**:

   ```bash
   git checkout -b feature/new-feature
   ```

3. **Make Your Changes**: Add your feature, fix bugs, or improve the documentation.
4. **Commit Your Changes**:

   ```bash
   git commit -m 'Add a new feature'
   ```

5. **Push to Your Branch**:

   ```bash
   git push origin feature/new-feature
   ```

6. **Open a Pull Request**: Once your feature is ready, open a pull request to merge it into the main branch.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgements

- **Unsplash** for the beautiful images that adorn the site.
- **Next.js** for providing an excellent React framework.
- **Tailwind CSS** for giving us the power to create beautiful designs quickly.
- **Framer Motion** for making animations smooth and easy to implement.

---

✨ _Thank you for being a part of Geekfolio! Craft your portfolio, showcase your talent, and inspire the world!_ ✨
