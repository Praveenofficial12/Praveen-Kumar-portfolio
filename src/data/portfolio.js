// Portfolio Data
export const personalInfo = {
    name: "Praveen Kumar K",
    title: "Front-End Developer | Prompt Engineer | Data Analyst",
    roles: ["Front-End Developer", "Prompt Engineer", "Data Analyst"],
    bio: "Creative and technology-focused Front-End Developer, Prompt Engineer, and Data Analyst. Passionate about designing intuitive digital experiences, engineering intelligent prompts, and building user-centric data-driven applications.",
    location: "Karur, Tamil Nadu",
    phone: "+91 9944924472",
    email: "praveenkumark1204@gmail.com",
    github: "https://github.com/Praveenofficial12",
    linkedin: "https://linkedin.com/in/praveen-kumar-k-developer",
    resume: "/resume.pdf",
};

export const education = [
    {
        degree: "Bachelor of Technology",
        field: "Artificial Intelligence & Data Science",
        institution: "V.S.B Engineering College",
        location: "Karur",
        period: "2023 – Present",
        grade: "CGPA: 8.05",
        icon: "🎓",
    },
    {
        degree: "Higher Secondary Certificate",
        field: "Computer Science",
        institution: "Cheran Matric Hr. Sec. School",
        location: "Punnam Chathiram",
        period: "2022 – 2023",
        grade: "Percentage: 90%",
        icon: "🏫",
    },
];

export const skills = [
    {
        category: "Languages",
        icon: "Languages",
        color: "from-violet-500 to-purple-600",
        items: ["Java", "Python"],
    },
    {
        category: "Tools & Frameworks",
        icon: "Tools",
        color: "from-blue-500 to-indigo-600",
        items: ["React.js"],
    },
    {
        category: "Databases",
        icon: "Databases",
        color: "from-pink-500 to-rose-600",
        items: ["MongoDB", "MySQL"],
    },
    {
        category: "Graphic Design",
        icon: "Graphic",
        color: "from-amber-500 to-orange-600",
        items: ["Canva", "Figma"],
    },
    {
        category: "Other Skills",
        icon: "Other",
        color: "from-emerald-500 to-teal-600",
        items: ["UI & UX Design", "Frontend Development"],
    },
];

export const projects = [
    {
        id: 1,
        title: "AI Powered Heart Disease Risk Predictor",
        category: "AI / ML",
        description: "An AI-driven healthcare web application that predicts heart disease risk using patient health parameters such as blood pressure, cholesterol, heart rate, and age through machine learning models.",
        tech: ["Python", "Flask", "Machine Learning", "MongoDB", "HTML", "CSS"],
        features: [
            "Heart disease prediction using ML",
            "Patient dashboard with analytics",
            "Detailed prediction reports",
            "Responsive and accessible UI",
        ],
        github: "https://github.com/Praveenofficial12/Ai-Heart-Disease-Risk-Predictor",
        demo: "#",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
        color: "from-purple-600 to-pink-600",
        bgColor: "rgba(124, 58, 237, 0.08)",
        tags: ["AI/ML", "Healthcare", "Flask", "MongoDB"],
    },
    {
        id: 2,
        title: "AgriSense AI",
        category: "Software Platform",
        description: "An AI-powered AgriTech platform that monitors crop health and soil conditions, providing real-time analysis of moisture, humidity, pH, and NPK levels through an interactive software dashboard.",
        tech: ["Python", "Machine Learning", "React.js", "MongoDB", "Tailwind CSS"],
        features: [
            "Real-time crop & soil monitoring simulation",
            "Interactive software dashboard",
            "AI-powered crop health insights & alerts",
            "Responsive modern UI with dynamic charts",
        ],
        github: "https://github.com/Praveenofficial12/Agrisense_ai/tree/main/agrisense-ai",
        demo: "#",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200&auto=format&fit=crop",
        color: "from-emerald-600 to-teal-600",
        bgColor: "rgba(16, 185, 129, 0.08)",
        tags: ["Software", "AgriTech", "React", "MongoDB"],
    },
];

export const certifications = [
    {
        title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
        issuer: "Oracle University",
        icon: "🤖",
        logo: "/oracle.svg",
        color: "from-orange-500 to-red-500",
        year: "Oct 6, 2025",
        certificateImage: "/certificates/oracle-genai.png",
    },
    {
        title: "Machine Learning Foundation Certification",
        issuer: "Infosys Springboard",
        icon: "🧠",
        logo: "/infosys.svg",
        color: "from-violet-500 to-purple-600",
        year: "July 5, 2025",
        certificateImage: "/certificates/infosys-ml.png",
    },
    {
        title: "Microsoft Azure SQL Course Certificate",
        issuer: "Microsoft (Coursera)",
        icon: "☁️",
        logo: "/microsoft.svg",
        color: "from-blue-500 to-cyan-500",
        year: "July 6, 2025",
        certificateImage: "/certificates/azure-sql.png",
    },
];

export const internship = {
    company: "Infosys Springboard",
    role: "Artificial Intelligence & ML Virtual Intern",
    type: "Virtual Internship 6.0",
    duration: "Nov 4, 2025 – Jan 10, 2026",
    logo: "/infosys.svg",
    certificateImage: "/certificates/infosys-internship.png",
    description: "Completed an intensive virtual internship focusing on Machine Learning model development, exploratory data analysis, algorithm evaluation, and practical deployment practices within the Infosys Springboard ecosystem.",
    skills: [
        "Machine Learning Model Building",
        "Data Preprocessing & Analysis",
        "Python & Scikit-Learn",
        "Model Evaluation & Tuning"
    ]
};

export const caseStudies = [
    {
        title: "Heart Disease Predictor — UX Case Study",
        tagline: "Designing a lifesaving AI health app",
        phases: [
            { label: "Problem", desc: "Patients lack accessible tools to assess heart disease risk early." },
            { label: "Research", desc: "Interviewed 15 patients; analyzed existing health apps." },
            { label: "Personas", desc: "Created 2 personas: a middle-aged professional & a senior citizen." },
            { label: "User Journey", desc: "Mapped end-to-end flow from login → input → result → report." },
            { label: "Wireframes", desc: "Sketched low-fi screens for onboarding, input form, and results." },
            { label: "High Fidelity", desc: "Designed polished Figma screens with data visualizations." },
            { label: "Key Learnings", desc: "Clarity & trust signals are critical in medical UI design." },
        ],
        color: "from-purple-600 to-pink-600",
    },
    {
        title: "AgriSense AI — UX Case Study",
        tagline: "Re-imagining crop monitoring for farmers",
        phases: [
            { label: "Problem", desc: "Farmers struggle to monitor crop health in real-time efficiently." },
            { label: "Research", desc: "Field surveys with 10 farmers; IoT dashboard benchmarking." },
            { label: "Personas", desc: "Persona: small-scale farmer with limited tech literacy." },
            { label: "User Journey", desc: "Mapped: Farm → Sensor → App → Alert → Action flow." },
            { label: "Wireframes", desc: "Dashboard wireframes focusing on clarity and quick actions." },
            { label: "High Fidelity", desc: "Dark-themed real-time dashboard with vibrant data charts." },
            { label: "Key Learnings", desc: "Simplicity wins. Complex data must be easy to understand." },
        ],
        color: "from-emerald-600 to-teal-600",
    },
];

export const graphicDesignItems = [
    { title: "College Event Poster", category: "Event Design", bg: "from-purple-600/20 to-pink-600/20", icon: "🎪" },
    { title: "Instagram Banner", category: "Social Media", bg: "from-blue-600/20 to-cyan-600/20", icon: "📱" },
    { title: "Marketing Poster", category: "Marketing", bg: "from-orange-600/20 to-amber-600/20", icon: "📢" },
    { title: "Canva Design", category: "Digital Design", bg: "from-emerald-600/20 to-teal-600/20", icon: "🎨" },
    { title: "Tech Fest Banner", category: "Event Design", bg: "from-violet-600/20 to-indigo-600/20", icon: "🏆" },
    { title: "Social Media Post", category: "Social Media", bg: "from-rose-600/20 to-pink-600/20", icon: "✨" },
];
