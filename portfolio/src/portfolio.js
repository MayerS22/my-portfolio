/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Mayer Soliman Hedya",
  title: "Hi, I'm Mayer",
  subTitle: emoji(
    "I am an avid believer in personal growth and creative exploration, constantly seeking opportunities to enhance my skills and knowledge. With a passion for self-learning and discovery, I am eager to connect with individuals who share fresh perspectives and diverse experiences. I am excited to both learn from and contribute to this dynamic exchange of ideas, fostering mutual growth and inspiration."
  ),
  resumeLink: "", // Add a link if you have an online resume
  displayGreeting: true
};

// Social Media Links

const socialMediaLinks = {
  github: "", // Add your GitHub if available
  linkedin: "", // Add your LinkedIn if available
  gmail: "", // Add your email if you want
  display: true
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "Passionate about software engineering, mobile and web development, and data engineering.",
  skills: [
    emoji("⚡ Develop secure and user-friendly mobile and web applications"),
    emoji("⚡ Experience with Android (Kotlin), Flutter, React, Node.js, and C++"),
    emoji("⚡ Data engineering, BI, and reporting using Power BI"),
    emoji("⚡ Database design and modeling")
  ],
  softwareSkills: [
    { skillName: "Kotlin", fontAwesomeClassname: "fas fa-mobile-alt" },
    { skillName: "Flutter", fontAwesomeClassname: "fab fa-google" },
    { skillName: "React", fontAwesomeClassname: "fab fa-react" },
    { skillName: "Node.js", fontAwesomeClassname: "fab fa-node" },
    { skillName: "C++", fontAwesomeClassname: "fas fa-code" },
    { skillName: "HTML5", fontAwesomeClassname: "fab fa-html5" },
    { skillName: "CSS3", fontAwesomeClassname: "fab fa-css3-alt" },
    { skillName: "JavaScript", fontAwesomeClassname: "fab fa-js" },
    { skillName: "Python", fontAwesomeClassname: "fab fa-python" },
    { skillName: "Firebase", fontAwesomeClassname: "fas fa-fire" },
    { skillName: "Power BI", fontAwesomeClassname: "fas fa-chart-bar" },
    { skillName: "SQL", fontAwesomeClassname: "fas fa-database" }
  ],
  display: true
};

// Education Section

const educationInfo = {
  display: true,
  schools: [
    {
      schoolName: "Ain Shams University",
      logo: require("./assets/images/harvardLogo.png"), // Replace with your university logo if available
      subHeader: "Bachelors of Computer and Information Science",
      duration: "Sept 2021 - July 2025",
      desc: "GPA: 3.025"
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Frontend/Design", //Insert stack or technology you have experience in
      progressPercentage: "90%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Backend",
      progressPercentage: "70%"
    },
    {
      Stack: "Programming",
      progressPercentage: "60%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true,
  experience: [
    {
      role: "Assistant",
      company: "Christian Medical Foundation (CMF)",
      companylogo: require("./assets/images/facebookLogo.png"), // Replace with your logo if available
      date: "Aug. 2023 – Present",
      desc: "Assistant for the manager of the foundation. Making reports, organizing meetings, and events."
    },
    {
      role: "HR Team Leader (Volunteer)",
      company: "Microsoft Tech Club at Ain Shams University (MSP)",
      companylogo: require("./assets/images/quoraLogo.png"),
      date: "Oct 2022 – Oct 2023",
      desc: "Volunteering job."
    },
    {
      role: "Data Entry",
      company: "Christian Medical Foundation (CMF)",
      companylogo: require("./assets/images/airbnbLogo.png"),
      date: "Sept 2022 – Feb 2023",
      desc: "Created a database for the committee using Microsoft Access."
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Projects",
  subtitle: "Key Projects",
  projects: [
    {
      image: require("./assets/images/saayaHealthLogo.webp"),
      projectName: "Speedo Transfer Mobile Application (2024) - Banque Misr",
      projectDesc: "Developed a secure and user-friendly money transfer app during a summer internship at Banque Misr. Features: account authentication, fund transfers, transaction history, profile management. Built with Jetpack Compose, Kotlin, MVVM, Retrofit, Coroutines.",
      footerLink: []
    },
    {
      image: require("./assets/images/nextuLogo.webp"),
      projectName: "Food Ordering Website (2024)",
      projectDesc: "Built a food ordering website using React and Node.js for a university course. Features: user authentication, real-time order tracking.",
      footerLink: []
    },
    {
      image: require("./assets/images/pwaLogo.webp"),
      projectName: "E-Commerce Mobile Application (2023)",
      projectDesc: "Led the creation of an E-Commerce app using Flutter and Firebase. Features: Splash, Sign-In/Up, real-time product data via APIs.",
      footerLink: []
    },
    {
      image: require("./assets/images/codeInLogo.webp"),
      projectName: "Railway Reservation System (2023)",
      projectDesc: "Developed a comprehensive system in C++ using advanced data structures and OOP.",
      footerLink: []
    },
    {
      image: require("./assets/images/pwaLogo.webp"),
      projectName: "Tourism in Egypt Website (2022)",
      projectDesc: "Designed a tourism website using HTML, CSS, JavaScript to showcase Egypt's attractions.",
      footerLink: []
    }
  ],
  display: true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements, Training & Certifications 🏆 "),
  subtitle: "Achievements, training, certifications, and courses.",
  achievementsCards: [
    {
      title: "Data Engineering Training",
      subtitle: "Potenia Ain Shams University (Aug. 2023 – Sept. 2023)",
      image: require("./assets/images/pwaLogo.webp"),
      imageAlt: "Data Engineering",
      footerLink: []
    },
    {
      title: "Flutter Training",
      subtitle: "Support Ain Shams University (Aug. 2023 – Sept. 2023)",
      image: require("./assets/images/googleAssistantLogo.webp"),
      imageAlt: "Flutter",
      footerLink: []
    },
    {
      title: "Software Engineering Training",
      subtitle: "ALX (Feb. 2023 – Apr. 2023)",
      image: require("./assets/images/codeInLogo.webp"),
      imageAlt: "Software Engineering",
      footerLink: []
    },
    {
      title: "Android Internship",
      subtitle: "Banque Misr (Aug. 2024 – Sept. 2024)",
      image: require("./assets/images/saayaHealthLogo.webp"),
      imageAlt: "Android Internship",
      footerLink: []
    },
    {
      title: "Freelancer’s Success Toolkit",
      subtitle: "E-Youth | ITIDA (Mar. 2025)",
      image: require("./assets/images/nextuLogo.webp"),
      imageAlt: "Freelancer Toolkit",
      footerLink: []
    },
    {
      title: "Flutter Course",
      subtitle: "Udemy (Sept. 2023 – Jan. 2024, 53 Hours)",
      image: require("./assets/images/pwaLogo.webp"),
      imageAlt: "Flutter Course",
      footerLink: []
    },
    {
      title: "Python 3 Ultimate Guide",
      subtitle: "Udemy (July. 2023 – Sept. 2023, 13 Hours)",
      image: require("./assets/images/codeInLogo.webp"),
      imageAlt: "Python Course",
      footerLink: []
    }
  ],
  display: true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://blog.usejournal.com/create-a-google-assistant-action-and-win-a-google-t-shirt-and-cloud-credits-4a8d86d76eae",
      title: "Win a Google Assistant Tshirt and $200 in Google Cloud Credits",
      description:
        "Do you want to win $200 and Google Assistant Tshirt by creating a Google Assistant Action in less then 30 min?"
    },
    {
      url: "https://medium.com/@saadpasta/why-react-is-the-best-5a97563f423e",
      title: "Why REACT is The Best?",
      description:
        "React is a JavaScript library for building User Interface. It is maintained by Facebook and a community of individual developers and companies."
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "Build Actions For Google Assistant",
      subtitle: "Codelab at GDG DevFest Karachi 2019",
      slides_url: "https://bit.ly/saadpasta-slides",
      event_url: "https://www.facebook.com/events/2339906106275053/"
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  ],
  display: true // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: true // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle: "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "", // Add your phone number if you want
  email_address: "" // Add your email if you want
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: true // Set true to display this section, defaults to false
};

const isHireable = false; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
