MUST Lecturer System

A web application to facilitate communication between students and lecturers at MUST. Features include viewing available lecturers, adding new lecturers, searching by name/department/specialization, and submitting feedback.

Setup Instructions





Clone the Repository:

git clone <repository-url>
cd must-lecturer-system



Install Dependencies:

npm install



Set up MySQL:





Install XAMPP and start the MySQL module.



Open phpMyAdmin (http://localhost/phpmyadmin) and ensure the must_lecturer_system database is created automatically on server start.



Run the Application Locally:

npm start





Access the app at http://localhost:3000.

Deployment on Render





Push to GitHub:





Create a GitHub repository and push the project:

git init
git add .
git commit -m "Initial commit"
git remote add origin <github-repo-url>
git push -u origin main



Set up Render:





Create a new Web Service on Render.



Connect your GitHub repository.



Configure:





Build Command: npm install



Start Command: npm start



Environment Variables:





DB_HOST: Your MySQL host (e.g., Render's MySQL instance or localhost for testing).



DB_USER: MySQL user (e.g., root).



DB_PASSWORD: MySQL password (leave empty for XAMPP default).



DB_NAME: must_lecturer_system.



Set the port to 3000.



Deploy:





Deploy the service on Render and access the provided URL.

Features





Home: Search lecturers, view available lecturers, add new lecturers, and submit feedback.



Add Lecturer: Form to add lecturer details, stored in the MySQL database.



View Lecturers: Displays all lecturers with their details and a weekly schedule.



Feedback: Submit feedback about lecturers.

Developer

Developed by Andrew-Bot"# andrew12" 
"# andrew12" 
