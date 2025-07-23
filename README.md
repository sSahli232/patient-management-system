# Patient Management System

A full-stack application for managing patient records built with Angular and NestJS.

## 🚀 Features

- User authentication and authorization
- Patient CRUD operations
- Responsive design for mobile and desktop
- Role-based access control (Admin/User)
- Secure API endpoints

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI
- NestJS CLI

## 🛠 Installation

1. Clone the repository:
```bash
git clone https://github.com/sSahli232/patient-management-system.git
cd patient-management-system
```

2. Install dependencies for both frontend and backend:
```bash
npm run install:all
```

## 💻 Development

Start both frontend and backend servers:
```bash
npm run dev
```

### Frontend Only
```bash
cd frontend
npm run start
```

### Backend Only
```bash
cd backend
npm run start:dev
```

## 🔑 Environment Variables

### Backend
Create a `.env` file in the backend directory:
```env
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_HOUR=your_database_url
```

### Frontend
Create a `environment.ts` file in `frontend/src/environments`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

## 🔒 API Endpoints

### Authentication
- `POST /auth/login` - User login

### Patients
- `GET /patients` - Get all patients
- `POST /patients` - Create a new patient
- `PUT /patients/:id` - Update a patient
- `DELETE /patients/:id/edit` - Delete a patient
