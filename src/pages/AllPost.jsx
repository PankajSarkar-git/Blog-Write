import { useState, useEffect } from "react";
import appwriteService from "../appwrite/configation";
import { Container, PostCard } from "../components";

const AllPost = () => {
  const [posts, setPost] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    appwriteService
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPost(posts.documents);
        }
      })
      .catch((err) => setError(err));
  });
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
        {posts.map((post)=> {
          return (
            <div key={post.$id} className="p-2 w-1/4">
                <PostCard post={post}/>
            </div>

        )})}
        </div>
      </Container>
    </div>
  );
};

export default AllPost;
