import React from "react";

import Container from "../components/Container";
import PostCard from "../components/postCard";
import dbService from "../Services/dbService";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Query } from "appwrite";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useSelector((store) => store.auth);

  // console.log(userData.$id);

  useEffect(() => {
    dbService
      .getAllPost([
        Query.equal("status", "active"),
        Query.equal("userId", String(userData.$id)),
      ])
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

  return (
    <div className="w-full min-h-[100vh] py-8">
      <Container>
        {!posts.length && (
          <h1 className="text-2xl font-bold text-[#241b35] text-center">
            No post Exists
          </h1>
        )}
        <div className="flex flex-wrap">
          {posts.map((post) => {
            return (
              <div key={posts.$id} className="p-2 w-full md:w-1/2">
                <PostCard {...post} />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
