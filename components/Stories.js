import { useEffect, useState } from "react";
import StoryCard from "./StoryCard";

// {
//   "id": "0",
//   "author": "Alejandro Escamilla",
//   "width": 5616,
//   "height": 3744,
//   "url": "https://unsplash.com/photos/yC-Yzbqy7PY",
//   "download_url": "https://picsum.photos/id/0/5616/3744"
// }

function Stories() {
  let [stories, setStories] = useState([]);

  useEffect(async () => {
    const res = await fetch('https://randomuser.me/api/?results=5');
    const data = await res.json();
    setStories(data.results);
  }, []);

  return (
    <div className="flex justify-center space-x-3 mx-auto">
      {stories.map(story => (
        <StoryCard key={story.email} name={story.name.first + ' ' + story.name.last} src={story.picture.large} profile={story.picture.thumbnail} />
      ))}
    </div>
  );
}

export default Stories;