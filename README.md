# Personal Portfolio Website

A modern, responsive portfolio website built with Node.js, Express, and MySQL to showcase my projects and skills. Features a dynamic contact form with database integration.

## 🚀 Features

- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Interactive UI**: Smooth animations and transitions
- **Dynamic Sections**:
  - About Me
  - Skills & Technologies
  - Project Showcase
  - Certifications
  - Contact Form
- **Backend Integration**: 
  - Node.js/Express server
  - MySQL database for contact form submissions
  - RESTful API endpoints

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Font Awesome Icons

### Backend
- Node.js
- Express.js
- MySQL
- CORS

### Development Tools
- Nodemon
- dotenv
- Git/GitHub

## 📦 Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/Darshanmn27/pf.git
cd pf
```

2. Install dependencies:
```bash
npm install
```

3. Set up MySQL database:
```sql
CREATE DATABASE portfolio;
USE portfolio;

CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. Configure environment variables:
- Create a `.env` file in the root directory
- Add your MySQL configuration:
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=portfolio
```

5. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🌐 API Endpoints

- `GET /`: Home page
- `POST /submit-contact`: Submit contact form
- `GET /api/contact`: Retrieve contact messages

## 📱 Project Structure

## 🔧 Configuration

Update `server/config.js` with your database credentials:
```javascript
const config = {
    database: {
        host: 'localhost',
        user: 'your_username',
        password: 'your_password',
        database: 'portfolio'
    }
};
```

## 🚀 Deployment

1. Ensure all dependencies are installed
2. Configure environment variables
3. Start the server using `npm start`
4. Access the website at `http://localhost:3000`

## 📝 Future Enhancements

- [ ] Add authentication for admin dashboard
- [ ] Implement email notifications
- [ ] Add blog section
- [ ] Enhance form validation
- [ ] Add more interactive features

## 👤 Author

**Darshan MN**
- GitHub: [@Darshanmn27](https://github.com/Darshanmn27)
- LinkedIn: [Darshan MN](https://www.linkedin.com/in/darshan-m-n-7546b632b/)

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- SJC Institute of Technology
- All the libraries and tools used in this project