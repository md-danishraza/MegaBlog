import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbService from "../Services/dbService";
import Button from "../components/Button";
import Container from "../components/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state) => state.auth.userData);

  // if author then show edit and delete
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  // fetching the post
  useEffect(() => {
    if (slug) {
      dbService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");

        setLoading(false);
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    dbService.deletePost(post.$id).then((status) => {
      if (status) {
        dbService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (loading) {
    return <div className="loader"></div>;
  }

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full  flex justify-center mb-4 relative border rounded-xl p-2 bg-[#4d425f] ">
          <img
            src={dbService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl md:w-[50%]"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="mr-3  bg-[#a364ff] p-1 px-2 hover:bg-[#6c35de]">
                  Edit
                </Button>
              </Link>
              <Button
                onClick={deletePost}
                className=" bg-[#a364ff] p-1 px-2  hover:bg-[#6c35de]"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full  mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="browser-css">{parse(post.content)}</div>
        </div>
      </Container>
    </div>
  ) : null;
}
