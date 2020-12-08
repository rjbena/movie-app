import React from "react";
import { getPosts } from "../actions";
const posts = ({ posts }) => {
  console.log(posts);
  return (
    <div className="container">
      <h1>I am post page</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <span>{p.id}: </span> <span>{p.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
  };
};

export default posts;
