import React from "react";
import { DirectionAwareHover } from "./ui/uiProject";
import { cn } from "./lib/utils";

function ProjectList({ projects }) {
  return (
    <div className={cn("w-full p-4 md:p-10")}>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">

          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <DirectionAwareHover
                imageUrl={`http://127.0.0.1:8000/storage/${project.image}`}
                className="w-full overflow-hidden rounded-xl cursor-pointer"
                imageClassName="object-cover w-full h-auto"
              >


                <div className="flex flex-col space-y-1">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-sm text-gray-200 line-clamp-2">
                    {project.description}
                  </p>
                  <span className="text-blue-400 mt-2 inline-block">
                    Kunjungi Project →
                  </span>
                </div>

              </DirectionAwareHover>
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
