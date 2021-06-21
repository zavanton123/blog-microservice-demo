import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('http://localhost:4000/posts');
      setPosts(res.data);
    }

    fetchPosts();
  }, []);

  console.log(`zavanton - posts:`);
  console.log(posts);

  const renderedPosts = Object.values(posts).map(post => {
    return <div className="card" style={{width: '30%', marginBottom: '20px'}} key={post.id}>
      <div className="card-body">
        <h3>{post.title}</h3>
      </div>

    </div>
  });

  return (
    <>
      <h1>Posts</h1>
      <div className="d-flex flex-row flex-wrap justify-content">
        {renderedPosts}
      </div>
    </>
  )
}
