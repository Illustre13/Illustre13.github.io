import React from 'react';

interface Skill {
  icon: string;
  name: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: "Front End Development",
      icon: "fa-solid fa-code",
      skills: [
        { icon: "fa-brands fa-html5", name: "HTML" },
        { icon: "fa-brands fa-css3-alt", name: "CSS" },
        { icon: "fa-brands fa-react", name: "React JS" },
        { icon: "fa-brands fa-js", name: "JavaScript" }
      ]
    },
    {
      title: "Back End Development",
      icon: "fa-solid fa-server",
      skills: [
        { icon: "fa-brands fa-python", name: "Python" },
        { icon: "fa-brands fa-java", name: "Java" },
        { icon: "fa-brands fa-node-js", name: "Node JS" },
        { icon: "fa-brands fa-php", name: "PHP" }
      ]
    },
    {
      title: "Mobile Development",
      icon: "fa-solid fa-mobile-screen-button",
      skills: [
        { icon: "fa-brands fa-react", name: "React Native" },
        { icon: "fa-brands fa-android", name: "Android" },
        { icon: "fa-brands fa-apple", name: "iOS" },
        { icon: "fa-brands fa-flutter", name: "Flutter" }
      ]
    },
    {
      title: "Soft Skills",
      icon: "fa-solid fa-users-gear",
      skills: [
        { icon: "fa-solid fa-users", name: "Team Work" },
        { icon: "fa-solid fa-lightbulb", name: "Problem Solving" },
        { icon: "fa-solid fa-handshake", name: "InterPersonal" },
        { icon: "fa-solid fa-clock", name: "Time Management" }
      ]
    },
    {
      title: "Database Admin & Design",
      icon: "fa-solid fa-database",
      skills: [
        { icon: "fa-solid fa-database", name: "Oracle" },
        { icon: "fa-brands fa-github", name: "PostgreSQL" },
        { icon: "fa-solid fa-leaf", name: "MongoDB" },
        { icon: "fa-solid fa-database", name: "MySQL" }
      ]
    },
    {
      title: "Tools & Software",
      icon: "fa-solid fa-gears",
      skills: [
        { icon: "fa-brands fa-git-alt", name: "Git" },
        { icon: "fa-brands fa-linux", name: "Linux" },
        { icon: "fa-brands fa-figma", name: "Figma" },
        { icon: "fa-brands fa-wordpress", name: "WordPress" }
      ]
    }
  ];

  return (
    <section className="skills brand_section" id="SKILLS">
      <h2 className="section-header">Skills</h2>
      <div className="skill_holder">
        {skillCategories.map((category, index) => (
          <div className="skill_set" key={index}>
            <h3>{category.title}</h3>
            <i className={category.icon} ></i>
            <div className="skill_element">
              {category.skills.map((skill, skillIndex) => (
                <div className="se_001" key={skillIndex}>
                  <i className={skill.icon}></i>
                  <h4>{skill.name}</h4>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
