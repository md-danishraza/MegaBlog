import React from "react";
import Container from "../components/Container";
import dbService from "../Services/dbService";
import { useState, useEffect } from "react";
import PostCard from "../components/postCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dbService
      .getAllPost()
      .then((posts) => {
        // console.log(posts);
        if (posts) setPosts(posts.documents);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loader"></div>;
  }
  if (posts.length === 0) {
    return (
      <div className="w-full min-h-[100vh] py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold text-[#241b35]">
                No Post Available
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full  min-h-[100vh]  py-8 ">
      <Container>
        <h1 className="text-center font-extrabold  text-2xl">Welcome Home</h1>
        <div className="flex flex-wrap mt-4">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full md:w-1/2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
