"use client";
import { useState } from 'react';
import { videoList } from './videoData';
import ProfViewer from '../../components/profViewer';

export default function Gallery(){
  const [index, setIndex] = useState(0);

  let hasPrev = index > 0;
  let hasNext = index < videoList.length - 1;

  function handlePrevClick() {
    if (hasPrev) {
      setIndex(index - 1);
    }
  }

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    }
  }
  
  let video = videoList[index];
    return(
        <div className="gallery">
            <h1>Video Gallery</h1>
            <div className='video-container'>
              <iframe
                src={video.url}
                title="video.title"
              >
            </iframe>
            </div>


            <button className='video-button'
            onClick={handlePrevClick}
            disabled={!hasPrev}
            >
            Previous
           </button>
           <button className='video-button'
           onClick={handleNextClick}
           disabled={!hasNext}
           >
           Next
           </button>
           <div className='profile-Viewer'>
          <ProfViewer/>
          </div>  
        </div>
       
    )
}



