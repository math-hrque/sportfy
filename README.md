# sportfy

_An application designed to foster a community of academics from Universidade Federal do Paraná (UFPR) interested in sports, enabling the organization of events and the tracking of athletic achievements._

## Introduction
**Sportfy** is a platform aimed at promoting sports and physical activity within the academic community of UFPR. It provides tools for academics to organize and participate in championships across various sports, set daily fitness goals, and build connections with like-minded individuals. The system is tailored to enhance the athletic experience by offering functionalities for personal and community growth.

- **Mobile**: Built with Ionic, using AuthGuard for route protection.
- **Backend**: Java, Spring Boot, and MySQL.
- **Database Management**: Versioning of transactional databases is handled using Flyway.  
- **Design Pattern**: The architecture is based on the MVC (Model-View-Controller) pattern.  
- **Security**: Implements secure authentication with user passwords hashed using Bcrypt, role-based access control with `@PreAuthorize`, and user session management using Spring Security to identify and retrieve the currently authenticated user.  
- **API Best Practices**: Consistent HTTP status codes and DTOs (Data Transfer Objects) for efficient communication between services.  

The system supports two user profiles, **academics** and **administrators**, with detailed functionality tailored to each, prioritizing security, efficiency, and ease of use.

---

## Features
- **Championship Management**: Academics can organize and participate in championships for various sports.
- **Peer Evaluation**: Users can evaluate and provide feedback to other platform members.
- **Fitness Goals**: Tools to establish daily goals and objectives for physical activity.
- **Community Building**: A platform to connect academics with shared sports interests, enabling event and championship announcements.
- **Profile Privacy Settings**: Users can configure the visibility of their profile information for others.
- **Achievements and Progress Tracking**: View personal and peer achievements in sports and track individual performance in specific sports.
- **Sports Performance Visualization**: Tools to assess individual and team performance in different modalities.

---

## Requirements

- **Docker**

---

## How to Run

### Clone the Repository

1. Clone this repository:

    ```bash
    git clone https://github.com/math-hrque/sportfy.git
    ```
2. Open a terminal and navigate to the directory where the project files are located.

### Run the Project

1. Using the Automated Shell Script:

   1.1. Grant execute permission to the script located in the project's root directory:
    
    ```bash
    chmod +x start.sh
    ```

   1.2. Run the script to build the images and start the services:
    
    ```bash
    ./start.sh
    ```

2. Using Docker Compose Directly:

   2.1. In the project's root directory, execute the following command to build the images and start the services:
    
    ```bash
    docker-compose up --build -d
    ```
---

## Access the Application

- **Mobile (Ionic)**: Access the UI at [http://localhost:3000](http://localhost:3000).
- **Backend**: The server is running on: [http://localhost:8081](http://localhost:8081).

---

## Account Registration

To create a new account, users must have an email address with the **ufpr.br** domain. This ensures that only members of the UFPR community can register.

### Example:
- **Valid Email:** `user@ufpr.br`
- **Invalid Email:** `user@gmail.com`

If you do not have a UFPR email, you can still explore the system using the pre-configured accounts below:

### Pre-Configured Users

- **Academic**:  
  - Username: `math_aa`  
  - Password: `pass`  

- **Administrator**:  
  - Username: `joao_nm`  
  - Password: `pass`  

Use these credentials to explore the system without creating new accounts.

---

## Email Configuration for Account Creation

The system sends a randomly generated 4-digit password to the user's email when they create an account. To enable this feature, you must configure the email settings in the `application.properties` file of the **backend**. 

### Steps to Configure:

1. Open the `application.properties` file in the **backend** directory.
2. Replace the placeholders in the email configuration section with your email credentials:

    ```properties
    spring.mail.username=your-email@gmail.com  # Replace with your email
    spring.mail.password=your-email-password   # Replace with your email password
    ```

4. Ensure that your email account allows less secure app access (or configure an app password if using Gmail with 2FA). Refer to your email provider's documentation for details.

5. Save the changes and restart the **backend** to apply the new configuration.

---

## Access Supporting Services

- **MySQL**:  
  MySQL is running on port `3306`. You can connect using a MySQL client like **MySQL Workbench** or the command line.  
  - **Connection Details**:
    - Host: `localhost`
    - Port: `3306`
    - Username: `root`
    - Password: `admin`

---

## Additional Notes

- Logs: To check service logs, use:
  ```bash
  docker-compose logs -f
  ```

- Stop Services: To stop all running services, execute:
  ```bash
  docker-compose down
  ```

- Rebuild and Restart: If needed, rebuild and restart services:
  ```bash
  docker-compose up --build -d
  ```
