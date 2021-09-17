import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';
import { db } from '../firebase';

export default function Home({ session, posts }) {
  if (!session) return <Login />

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook</title>
      </Head>

      <Header />

      <main className="flex">
        <Sidebar />
        <Feed posts={posts} />
        <Widgets />
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  // get the user
  const session = await getSession(context);

  async function getSnapshot() {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('timestamp', 'desc'));
    const postsSnapshot = await getDocs(q);
    const postsList = postsSnapshot?.docs;
    return postsList;
  }

  const posts = await getSnapshot();
  const docs = posts.map(post => ({
    id: post.id,
    ...post.data(),
    timestamp: null
  }))

  return {
    props: {
      session,
      posts: docs
    }
  }
}