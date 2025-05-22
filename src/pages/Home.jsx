import React from "react";
import Container from "../components/Container";
import dbService from "../Services/dbService";
import { useState, useEffect } from "react";
import PostCard from "../components/postCard";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    dbService
      .getAllPost()
      .then((posts) => {
        console.log(posts);
        if (posts) setPosts(posts.documents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No post available
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <h1 className="text-center text-2xl">Welcome Home</h1>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
