import React from "react";
import { cn } from "./lib/utils";

function SkillList({ skills }) {
  return (
    <div className={cn("w-full p-4 md:p-10")}>

      {skills.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-neutral-900 text-white p-4 rounded-xl shadow-lg border border-neutral-700"
            >
              <h3 className="text-lg font-semibold text-center">
                {skill.name}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">Memuat skill...</p>
      )}
    </div>
  );
}

export default SkillList;
