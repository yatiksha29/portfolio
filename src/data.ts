// Edit this file to add projects, skills, stats and resumes.
import type { Data } from "./types";
import eventGuide from "./assets/event-guide.jpg";
import medaid from "./assets/medaid.jpg";
import petShelter from "./assets/pet-shelter.jpg";

export const DATA: Data = {
  name: "Yatiksha Goyal",
  roles: ["Full Stack Developer (MERN)","React and TypeScript builder","API and database designer","AI feature integrator"],
  tagline: "I build full-stack apps that people can use from day one.",
  summary: "MCA (AI & ML) graduate from Bathinda, Punjab. I ship React, TypeScript, Node and MongoDB products with secure login, cloud uploads and Gemini-powered AI features.",
  location: "Bathinda, Punjab",
  email: "yatiksha.work@gmail.com",
  github: "https://github.com/yatiksha29",
  linkedin: "https://linkedin.com/in/yatiksha-goyal-74ab29302",
  resumes: [["Web developer resume","/resumes/Yatiksha_Goyal_Web_Developer_Resume.pdf"],["Data analyst resume","/resumes/Yatiksha_Goyal_Data_Analyst_Resume.pdf"]],
  stats: [["3","Live projects deployed"],["Top 5","National hackathon, Amritsar"],["Top 45","of 1,000+ teams, Smart India Hackathon (college level)"],["MCA","AI & ML, 2026"]],
  projects: [
    { name: "Event Guide", featured: true, date: "Nov 2026", live: "https://event-guide-frontend.vercel.app/",
      code: [["Frontend","https://github.com/yatiksha29/EventGuide_Frontend"],["Backend","https://github.com/yatiksha29/EventGuide_Backend"]],
      image: eventGuide, color: ["#0E3A6B","#6D4AE0"],
      desc: "A vendor-discovery platform where people find event service providers by city, event type and service.",
      points: ["JWT login with protected routes and bcrypt hashing for users and vendors","Vendor profiles, favourites, ratings and reviews with average scores","Cloudinary image uploads and Gemini OCR on ID images"],
      stack: ["React","TypeScript","Vite","Node","Express","MongoDB","Cloudinary","Gemini"] },
    { name: "MedAid", date: "Jul 2026", live: "https://medaid-87ym.onrender.com",
      code: [["GitHub","https://github.com/yatiksha29/MedAid"]], image: medaid, color: ["#0B4F55","#1FA6A0"],
      desc: "A donation platform that connects medicine and equipment donors with NGOs and people in need.",
      points: ["Three roles (Donor, NGO, Needy) with separate flows","Gemini reads Aadhaar cards and auto-fills profile fields","MySQL schema on Aiven for listings and request tracking"],
      stack: ["Node","Express","MySQL","jQuery","Tailwind CSS","Cloudinary","Gemini"] },
    { name: "Pet Shelter", date: "Dec 2023", live: "https://pet-shelter-8cee.onrender.com/",
      code: [["GitHub","https://github.com/yatiksha29/pet-shelter-nodejs"]], image: petShelter, color: ["#3B2A8C","#C0568C"],
      desc: "A pet-care platform where shelter providers register their shelters and pet owners find a safe stay for their pets while they are at work or away on vacation.",
      points: ["Shelter providers register and manage their shelter profile and pet listings","Pet owners browse registered shelters to find safe care for the days they are at work or travelling","Full-stack CRUD in Node.js, Express and MySQL with validated data, deployed on Render"],
      stack: ["Node","Express","MySQL","Bootstrap"] }
  ],
  analytics: [
    { name: "Sales Analysis Dashboard", tool: "Power BI, personal project",
      desc: "A 6-page interactive dashboard analysing 5,000+ orders (₹2.30M in sales, ₹286K profit) across 531 cities, 4 regions and 3 product categories, 2014 to 2017.",
      points: ["Cleaned and modelled the raw data in Power Query into date, region, category and customer-segment dimensions","KPI cards, slicers, maps and drill-through pages for sales, profit, time series, region and customer analysis","Found that Technology and Office Supplies drove about 94% of profit, while Furniture gave about 6% despite similar sales volume"],
      stack: ["Power BI","Power Query"] },
    { name: "Indian Job Market Analysis", tool: "Tableau, personal project",
      desc: "An interactive dashboard analysing 835 job postings across India by title, salary, state and city.",
      points: ["Drill-down views for job demand, average monthly salary, jobs by state, job location and top postings","Trainee roles led postings by volume, while Medical Representative and Delhi-based roles topped average monthly salary","Bengaluru and Kochi were the top metro hiring hubs, and Remote postings (89) outnumbered any single city"],
      stack: ["Tableau"] },
    { name: "Vehicle Detection and Number Plate Recognition", tool: "Computer vision, personal project",
      desc: "A video pipeline that detects vehicles and reads their number plates.",
      points: ["YOLOv8 for vehicle detection and EasyOCR for text extraction","Frame sampling and bounding-box cropping in OpenCV before running OCR","Live results with bounding boxes and recognised text overlaid for verification"],
      stack: ["Python","YOLOv8","EasyOCR","OpenCV"] }
  ],
  skills: {
    "Frontend": ["React","TypeScript","JavaScript ES6+","React Router","Vite","HTML5","CSS3","Bootstrap","Tailwind CSS","Axios"],
    "Backend": ["Node.js","Express","REST APIs","MVC","JWT","bcryptjs"],
    "Databases": ["MongoDB","Mongoose","MySQL"],
    "Cloud": ["Vercel","Render","Aiven","Cloudinary"],
    "Tools & AI": ["Git","GitHub","Postman","Gemini API"],
    "Data & AI": ["Python","Pandas","NumPy","Matplotlib","SQL","Power BI","Tableau","Excel","OpenCV","YOLOv8"]
  },
  education: [["MCA (AI & ML), Chandigarh University","2024 to 2026, CGPA 7.09"],["BCA, Punjabi University","2020 to 2023, 77.6%"]],
  achievements: [["Smart India Hackathon finalist (college level)","Top 45 of 1,000+ participating teams"],["National hackathon, Amritsar","Reached the top 5 teams"],["Certifications","MERN Stack, Full Stack (Node.js), Postman API Testing"]]
};