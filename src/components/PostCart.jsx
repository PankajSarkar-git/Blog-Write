import React from "react";
import appwriiteService from "../appwrite/configation";
import { Link } from "react-router-dom";

const PostCart = ({ $id, title, featuredImages }) => {
  return (
    <Link to={"/post/${$id}"}>
      <div className=" w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
           <img src={appwriiteService.getFilePreviwe(featuredImages)} alt={title} className="rounded-xl" />
        </div>
        <h2 className="font-bold text-xl">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCart;
