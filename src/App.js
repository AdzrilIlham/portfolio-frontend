import React, { useState, useEffect } from "react";
import FloatingNav from "./components/ui/FloatingNav";
import ProjectList from "./components/ProjectList";
import SkillList from "./components/SkillList";
import { LampDemo } from "./components/ui/lamp";

function App() {

  const navItems = [
    { name: "Home", link: "#home" },
    { name: "Projects", link: "#projects" },
    { name: "Skills", link: "#skills" },
  ];

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data.data))
      .catch((err) => console.error("Error fetching projects:", err));

    fetch("http://127.0.0.1:8000/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data.data))
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white p-0 m-0">
      <FloatingNav navItems={navItems} />

      <div style={{ minHeight: "200vh", paddingTop: "120px" }}>
        
        {/* HOME SECTION */}
        <section id="home" className="w-full min-h-screen bg-slate-950 p-0 m-0">
          <LampDemo />
        </section>

        {/* PROJECT SECTION */}
        <section id="projects" style={{ marginTop: "120px" }}>
          <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
          <ProjectList projects={projects} />
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" style={{ marginTop: "120px" }}>
          <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
          <SkillList skills={skills} />
        </section>

      </div>
    </div>
  );
}

export default App;
