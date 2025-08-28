// import React from "react";
// import { Link } from "react-router";
// import ScoreCircle from "./ScoreCircle";


// const ResumeCard = ({ resume: {id, companyName, jobTitle, feedback, imagePath} }: { resume: Resume }) => {
//   return (
//     <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
//     <div className="resume-card-header">

//       <div className="flex flex-col gap-2">
//         <h2 className="!text-black font-bold break-words">{companyName}</h2>
//         <h3 className="text-lg text-gray-500 break-words"> {jobTitle}</h3>
//       </div>

//       <div className="flex-shrink-0">
//         <ScoreCircle score={feedback.overallScore} />

//       </div>
//     </div>
//     <div className="gradient-border animate-in fade-in duration-1000">
//         <div className="w-full h-full">
//             <img 
//                 src={imagePath} 
//                 alt="resume"
//                 className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
//                 />
//         </div>

//     </div>
      
//     </Link>
//   );
// };

// export default ResumeCard;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";   // ✅ fix import
import ScoreCircle from "./ScoreCircle";
import { usePuterStore } from "~/lib/puter"; // ✅ assuming you need fs from here

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    let url: string;

    const loadImage = async () => {
      const blob = await fs.read(imagePath); // read file from your virtual FS
      if (!blob) return;
      url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadImage();

    // cleanup to prevent memory leaks
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [fs, imagePath]);

  return (
    <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          {companyName && <h2 className="!text-black font-bold break-words">{companyName}</h2>}
          {jobTitle && <h3 className="text-lg text-gray-500 break-words">{jobTitle}</h3>}
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>

      {resumeUrl && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full h-full">
            <img
              src={resumeUrl}
              alt="resume"
              className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
            />
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;
