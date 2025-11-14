import React, { useState, useEffect } from "react";
import FloatingNav from "./components/ui/FloatingNav";
import ProjectList from "./components/ProjectList";
import SkillList from "./components/SkillList";

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
      .then((data) => setProjects(data.data));

    fetch("http://127.0.0.1:8000/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data.data));
  }, []);

  return (
    <div className="App">

      {/* Floating Navbar */}
      <FloatingNav navItems={navItems} />

      {/* Tambahkan height supaya scroll bekerja */}
      <div style={{ minHeight: "200vh", paddingTop: "120px" }}>

        <section id="home">
          <h1 className="text-4xl text-center font-bold">Halo, Ini Portofolio Saya</h1>
        </section>

        <section id="projects" style={{ marginTop: "80px" }}>
          <ProjectList projects={projects} />
        </section>

        <section id="skills" style={{ marginTop: "80px" }}>
          <SkillList skills={skills} />
        </section>

      </div>

    </div>
  );
}

export default App;
