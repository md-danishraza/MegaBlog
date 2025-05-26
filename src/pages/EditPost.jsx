import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import PostForm from "../components/post_form/PostForm";
import dbService from "../Services/dbService";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      dbService
        .getPost(slug)
        .then((post) => {
          if (post) setPost(post);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      // if no slug
      navigate("/");
      setLoading(false);
    }
  }, [slug, navigate]);

  if (loading) {
    return <div className="loader"></div>;
  }

  return post ? (
    <div className="py-8  ">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
