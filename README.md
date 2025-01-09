# Task Management System

A modern and intuitive task management system built with **React (TypeScript)** on the frontend and **.NET Core 8.0 LTS** on the backend. This system helps users efficiently manage their tasks with a clean and user-friendly interface.

---

## Features

- **Task Management**: Add, edit, delete, and mark tasks as complete.
- **Real-Time Updates**: Dynamic updates to task lists without page reloads.

---

## Tech Stack

### Frontend

- **React** with **TypeScript**
- **CSS Modules** for styling
- **Axios** for API communication

### Backend

- **.NET 8.0 Core LTS**
- **Entity Framework Core** for database management
- **MSSQL** for lightweight data storage

---

## Installation

### Prerequisites

- React (TypeScript) + Vite - 18.3.1
- .NET 8.0 SDK
- SQLite (installed and configured)

### Clone the Repository

To clone the repository into your local computer:

```bash
git clone https://github.com/kumararuben03/task-management.git
cd task-management
```

### For Frontend

To install the required dependencies:

```bash
cd frontend
npm install
```

To start the development server:

```bash

npm run dev
```

### For Backend

To install packages:

```bash
dotnet add package <package-name> --version <package-version>
```

To start the backend server:

```bash
cd backend
dotnet watch run
```

### For Database

To generate a migration file that describes changes done to the model:

```bash
dotnet ef migrations add Init
```

To update the database (MSSQL, MYSQL, any database of choice):

```bash
dotnet ef database update
```

## Screenshots

![Alt Text](./frontend/src/assets/sample.png)
_UI of the Task Management System_

![Alt Text](./frontend/src/assets/swagger.png)
_Swagger UI for API Documentation of the Task Management System_
