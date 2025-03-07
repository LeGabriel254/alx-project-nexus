import { useParams } from "react-router-dom";
import { PostDetails } from "./PostDetails";

export const PostPage = () => {
  const { postId } = useParams<{ postId: string }>(); // Ensure it's typed as a string
  const numericPostId = postId ? Number(postId) : NaN; // Convert to number

  if (isNaN(numericPostId)) {
    return <div>Invalid post ID.</div>;
  }

  return <PostDetails />;
};
