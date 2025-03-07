"use client"; 
import { useState } from "react";

export default function ProfViewer() {
  const faces = [
    "/viewer1.jpg",
    "/viewer2.jpg",
    "/viewer3.jpg"
  ];
  
  const randomImage = faces[Math.floor(Math.random() * faces.length)];
  const [randomface,setRandomFace]  =useState(randomImage);

  
  const [bio, setBio] = useState("");

  function handleBioChange(e) {
    setBio(e.target.value);
  }

  return (
    <div className="prof-viewer">
      <img src={randomface} alt="Random Face" className="viewer" />
     
      <div className="bio-section">
        <h3>Bio:</h3>
        <p>{bio}</p>
      </div>

      <textarea className="bio-textarea"
       placeholder="Write your bio here..."
       onChange ={handleBioChange}
       value={bio}>
         </textarea>
    </div>
  );
}
