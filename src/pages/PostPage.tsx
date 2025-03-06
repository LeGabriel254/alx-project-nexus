import { useParams } from "react-router";
import { PostDetails } from "./PostDetails";



export const Home = () => {
  const {id} = useParams<{id: string }>()
  return (
    <div className="pt-10">
    
        <PostDetails postId={Number(id)}/>
      
    </div>
  );
};