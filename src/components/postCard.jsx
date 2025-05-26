import React from "react";
import { Link } from "react-router-dom";
import dbService from "../Services/dbService";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-[#6c35de] rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={dbService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold text-[#ffc7ff] text-center">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
