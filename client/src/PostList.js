import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('http://posts.com/posts');
      console.log(`zavanton - posts from query service`);
      console.log(res.data);
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
        <CommentList comments={post.comments}/>
        <CommentCreate postId={post.id}/>
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
