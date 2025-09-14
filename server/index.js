const express = require('express');
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and PDFs are allowed'));
    }
  }
});

// Simple in-memory data storage (in production, use a database)
let portfolioData = {
  skills: {
    technical: ['HTML', 'CSS', 'Python', 'JavaScript', 'React', 'Django', 'SQL', 'Git', 'PostgreSQL'],
    professional: ['Critical Thinking', 'Problem Solving', 'Leadership', 'Communication Skills']
  },
  workExperience: [
    {
      id: 1,
      company: "Tech Company",
      position: "Software Developer Intern",
      duration: "2023 - 2024",
      description: "Developed web applications using React and Django. Collaborated with team members on various projects and gained hands-on experience in full-stack development.",
      technologies: ["React", "Django", "JavaScript", "Python", "PostgreSQL"]
    },
    {
      id: 2,
      company: "Freelance Projects",
      position: "Web Developer",
      duration: "2022 - 2023",
      description: "Worked on various client projects including e-commerce websites and CRM systems. Managed project timelines and client communications.",
      technologies: ["HTML", "CSS", "JavaScript", "Python", "SQL"]
    }
  ],
  projects: [
    {
      id: 1,
      title: "Resume Website",
      image: "/assets/project4.png",
      githubUrl: "https://github.com/wanjagi/my-resume"
    },
    {
      id: 2,
      title: "Online Store",
      image: "/assets/project1.png",
      githubUrl: "https://github.com/wanjagi/ecommerce"
    },
    {
      id: 3,
      title: "CRM",
      image: "/assets/project2.png",
      githubUrl: "https://github.com/wanjagi/CRM"
    },
    {
      id: 4,
      title: "JavaScript Music Player",
      image: "/assets/project3.png",
      githubUrl: "https://github.com/wanjagi/music-player"
    }
  ],
  resume: {
    filename: "Francis_Gatonye_Resume.pdf",
    path: "/assets/Francis_Gatonye_Resume.pdf"
  }
};

// Admin credentials (in production, store in database with proper hashing)
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123' // Change this!
};

// JWT Secret (in production, use a strong secret)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// Routes

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Get portfolio data
app.get('/api/portfolio', (req, res) => {
  res.json(portfolioData);
});

// Update skills
app.put('/api/skills', authenticateToken, (req, res) => {
  const { technical, professional } = req.body;
  portfolioData.skills = { technical, professional };
  res.json({ message: 'Skills updated successfully', skills: portfolioData.skills });
});

// Work Experience CRUD
app.get('/api/work-experience', (req, res) => {
  res.json(portfolioData.workExperience);
});

app.post('/api/work-experience', authenticateToken, (req, res) => {
  const newExperience = {
    id: Date.now(),
    ...req.body
  };
  portfolioData.workExperience.push(newExperience);
  res.json({ message: 'Work experience added successfully', experience: newExperience });
});

app.put('/api/work-experience/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const index = portfolioData.workExperience.findIndex(exp => exp.id === parseInt(id));
  
  if (index === -1) {
    return res.status(404).json({ message: 'Work experience not found' });
  }
  
  portfolioData.workExperience[index] = { ...portfolioData.workExperience[index], ...req.body };
  res.json({ message: 'Work experience updated successfully', experience: portfolioData.workExperience[index] });
});

app.delete('/api/work-experience/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const index = portfolioData.workExperience.findIndex(exp => exp.id === parseInt(id));
  
  if (index === -1) {
    return res.status(404).json({ message: 'Work experience not found' });
  }
  
  portfolioData.workExperience.splice(index, 1);
  res.json({ message: 'Work experience deleted successfully' });
});

// Projects CRUD
app.get('/api/projects', (req, res) => {
  res.json(portfolioData.projects);
});

app.post('/api/projects', authenticateToken, upload.single('image'), (req, res) => {
  const newProject = {
    id: Date.now(),
    title: req.body.title,
    githubUrl: req.body.githubUrl,
    image: req.file ? `/uploads/${req.file.filename}` : req.body.image
  };
  portfolioData.projects.push(newProject);
  res.json({ message: 'Project added successfully', project: newProject });
});

app.put('/api/projects/:id', authenticateToken, upload.single('image'), (req, res) => {
  const { id } = req.params;
  const index = portfolioData.projects.findIndex(proj => proj.id === parseInt(id));
  
  if (index === -1) {
    return res.status(404).json({ message: 'Project not found' });
  }
  
  const updatedProject = {
    ...portfolioData.projects[index],
    title: req.body.title,
    githubUrl: req.body.githubUrl
  };
  
  if (req.file) {
    updatedProject.image = `/uploads/${req.file.filename}`;
  }
  
  portfolioData.projects[index] = updatedProject;
  res.json({ message: 'Project updated successfully', project: updatedProject });
});

app.delete('/api/projects/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const index = portfolioData.projects.findIndex(proj => proj.id === parseInt(id));
  
  if (index === -1) {
    return res.status(404).json({ message: 'Project not found' });
  }
  
  portfolioData.projects.splice(index, 1);
  res.json({ message: 'Project deleted successfully' });
});

// Resume upload
app.post('/api/resume', authenticateToken, upload.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  portfolioData.resume = {
    filename: req.file.originalname,
    path: `/uploads/${req.file.filename}`
  };
  
  res.json({ message: 'Resume updated successfully', resume: portfolioData.resume });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
