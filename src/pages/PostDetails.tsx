import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Post } from "../components/PostList";
import { supabase } from "../supabase-client";
import { LikeButton } from "../components/LikeButton";
import { CommentSection } from "../components/CommentSection";

const fetchPostById = async (id: number): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data as Post;
};

export const PostDetails = () => {
  const { postId } = useParams<{ postId: string }>(); // Ensure postId is typed as a string
  const numericPostId = postId ? Number(postId) : NaN; 

  const { data, error, isLoading } = useQuery<Post, Error>({
    queryKey: ["post", numericPostId],
    queryFn: () => fetchPostById(numericPostId),
    enabled: !isNaN(numericPostId), // Only fetch if postId is a valid number
  });

  if (isLoading) {
    return <div>Loading post...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No post found.</div>;
  }

  const formattedDate = data.created_at
    ? new Date(data.created_at).toLocaleDateString()
    : "No date available";

  return (
    <div className="space-y-6">
      <h2 className="text-6xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        {data.title}
      </h2>
      {data.image_url && (
        <img
          src={data.image_url}
          alt={data.title}
          className="mt-4 rounded object-contain h-64"
        />
      )}
      <p className="text-gray-400">{data.content}</p>
      <p className="text-gray-500 text-sm">Posted on: {formattedDate}</p>

      <LikeButton postId={numericPostId} />
      <CommentSection postId={numericPostId} />
    </div>
  );
};
