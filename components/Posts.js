import { query, orderBy, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useContext, useEffect, useState } from 'react';
import Post from './Post';
import { DBContext } from '../DBContext';

function Posts({ posts }) {
  let [querySnapshot, setQuerySnapshot] = useState([]);
  const { update } = useContext(DBContext);

  async function getSnapshot() {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('timestamp', 'desc'));
    const postsSnapshot = await getDocs(q);
    const postsList = postsSnapshot?.docs;
    return postsList;
  }

  useEffect(() => {
    let didCancel = false;

    (async () => {
      const postsSnapshot = await getSnapshot();
      !didCancel && (postsSnapshot ? setQuerySnapshot(postsSnapshot) : setQuerySnapshot(posts));
    })();

    return () => {
      didCancel = true;
    };
  }, [update]);

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
      {console.log(update)}
    </div>
  )
}

export default Posts
