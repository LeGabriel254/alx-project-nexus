import { useParams } from "react-router-dom";
import { PostDetails } from "../components/PostDetails";

export const PostPage = () => {
  const { postId } = useParams<{ postId: string }>(); 
  const numericPostId = postId ? Number(postId) : NaN; 

  if (isNaN(numericPostId)) {
    return <div>Invalid post ID.</div>;
  }

  return <PostDetails postId={numericPostId} />;
};
