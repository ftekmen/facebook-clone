import { query, orderBy, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import Post from './Post';

function Posts() {
  let [querySnapshot, setQuerySnapshot] = useState([]);

  async function getSnapshot() {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('timestamp', 'desc'));
    const postsSnapshot = await getDocs(q);
    const postsList = postsSnapshot?.docs;
    return postsList;
  }

  useEffect(() => {
    (async () => {
      const posts = await getSnapshot();
      setQuerySnapshot(posts);
    })();

    return () => {
      console.log('useEffect return');
    }
  }, []);

  return (
    <div>
      {querySnapshot.map(post => (
        <Post
          key={post.id}
          name={post.data().name}
          message={post.data().message}
          email={post.data().email}
          timestamp={post.data().timestamp}
          image={post.data().image}
          postImage={post.data().postImage}
        />
      ))}
    </div>
  )
}

export default Posts
