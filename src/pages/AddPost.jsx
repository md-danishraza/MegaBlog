import React from "react";

import Container from "../components/Container";
import PostForm from "../components/post_form/PostForm";

function AddPost() {
  return (
    <div className="p-8">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
