# 7Twenty4 WebApp

## Overview
7Twenty4 WebApp is a comprehensive web application for managing employees, timesheets, invoices, and jobs. It consists of a Spring Boot backend and an Angular frontend.

## Project Structure

### Backend (Spring Boot) - https://github.com/ryancblock3/7Twenty4Backend
- Controllers for handling API requests
- Entity classes representing the data model
- Repositories for database interactions
- Services for business logic

Key components:
- `EmployeeController`: Manages employee-related operations
- `InvoiceController`: Handles invoice creation and management
- `JobController`: Manages job-related operations
- `TimesheetController`: Handles timesheet entries

### Frontend (Angular) - https://github.com/ryancblock3/7Twenty4FrontEnd
- Components for different views (employees, timesheets, invoices, jobs)
- Services for API communication
- Models for data representation
- Routing configuration

Key components:
- `EmployeeInformationComponent`: Displays and manages employee information
- `TimesheetsComponent`: Handles timesheet entries and calculations
- `InvoicesComponent`: Manages invoice creation and display
- `JobsComponent`: Displays and manages job information

## Setup Instructions

### Backend Setup
1. Navigate to the `7Twenty4 - Back End` directory
2. Ensure you have Java 17 and Maven installed
3. Run `mvn clean install` to build the project
4. Start the application using `mvn spring-boot:run`

### Frontend Setup
1. Navigate to the `7Twenty4 - Front End` directory
2. Ensure you have Node.js and npm installed
3. Run `npm install` to install dependencies
4. Start the development server using `ng serve`

## API Endpoints

The backend provides the following main API endpoints:
- `/api/employees`: Employee management
- `/api/invoices`: Invoice operations
- `/api/jobs`: Job management
- `/api/timesheets`: Timesheet entries

## Authentication

The application uses JWT for authentication. To access protected routes:
1. Log in using the `/api/users/login` endpoint
2. Use the returned token in the Authorization header for subsequent requests

## Features

- Employee management (CRUD operations)
- Timesheet entry and management
- Automatic invoice generation based on timesheets
- Job tracking and management
- Employee hours reporting
- Dashboard with key metrics

## Technologies Used

- Backend: Spring Boot, Spring Data JPA, Spring Security
- Frontend: Angular, Bootstrap
- Database: PostgreSQL (assumed, based on JPA usage)
