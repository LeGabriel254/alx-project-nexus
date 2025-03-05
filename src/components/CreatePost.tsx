import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { supabase } from "../supabase-client";

// Define the structure of the post input data
interface PostInput {
  title: string;
  content: string;
}

// Function to create a new post with an image upload
const createPost = async (post: PostInput, imageFile: File) => {
  // Generate a unique file path using the post title and timestamp
  const filePath = `${post.title}-${Date.now()}-${imageFile.name}`;
  
  // Upload the image to Supabase storage
  const { error: uploadError } = await supabase.storage.from("post-images").upload(filePath, imageFile);
  if (uploadError) throw new Error(uploadError.message);
  
  // Get the public URL of the uploaded image
  const { data: publicURLData } = supabase.storage.from("post-images").getPublicUrl(filePath);
  
  // Insert the post data into the "posts" table with the image URL
  const { data, error } = await supabase.from("posts").insert({ ...post, image_url: publicURLData.publicUrl });
  
  if (error) throw new Error(error.message);
  
  return data;
};

export const CreatePostPage = () => {
  // State hooks to manage form inputs
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>(""); // Typo: should be setContent
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Use react-query mutation for handling post creation
  const { mutate } = useMutation({ 
    mutationFn: (data: { post: PostInput, imageFile: File }) => {
      return createPost(data.post, data.imageFile);
    } 
  });

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return; // Ensure an image is selected before submission
    mutate({ post: { title, content }, imageFile: selectedFile }); 
  };

  // Handle file input changes
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      <div>
        <label htmlFor="title" className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          id="title"
          required
          onChange={(event) => setTitle(event.target.value)} 
          className="w-full border border-white/10 bg-transparent p-2 rounded"/>
      </div>
      <div>
        <label htmlFor="contnent" className="block mb-2 font-medium">Content</label>
        <textarea
          id="content"
          required
          rows={5}
          onChange={(event) => setContent(event.target.value)} // Typo: should be setContent
          className="w-full border border-white/10 bg-transparent p-2 rounded"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium">Upload Image</label>
        <input
          type="file"
          required
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-gray-200"
        />
      </div>
      <button 
        type="submit"
        className="bg-purple-500 text-white px-4 py-2 rounded cursor-pointer">
        Create Post
      </button>
    </form>
  );
};
