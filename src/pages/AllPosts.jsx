import React from "react";

import Container from "../components/Container";
import PostCard from "../components/postCard";
import dbService from "../Services/dbService";
import { useState, useEffect } from "react";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    dbService
      .getAllPost([])
      .then((posts) => {
        if (posts) setPosts(posts.documents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        {!posts.length && (
          <h1 className="text-2xl font-bold text-[#241b35] text-center">
            No post Exists
          </h1>
        )}
        <div className="flex flex-wrap">
          {posts.map((post) => {
            <div key={posts.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>;
          })}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
