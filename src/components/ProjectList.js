import React from "react";
import { cn } from "./lib/utils";
import { FocusCards } from "./ui/focus-cards";

function ProjectList({ projects }) {
  return (
    <div className={cn("w-full p-4 md:p-10")}>
      <h2 className="text-3xl font-bold text-center my-8 text-white">
        Proyek Saya
      </h2>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link} // <-- INI DIAMBIL DARI DATABASE
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <FocusCards className="h-72 cursor-pointer">
                <img
                  src={`http://127.0.0.1:8000/storage/${project.image}`}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />

                <h3 className="text-xl font-semibold">{project.title}</h3>

                <p className="text-sm text-gray-300 line-clamp-3">
                  {project.description}
                </p>

                <span className="text-blue-400 mt-2 inline-block">
                  Kunjungi Project →
                </span>
              </FocusCards>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">Memuat proyek...</p>
      )}
    </div>
  );
}

export default ProjectList;
