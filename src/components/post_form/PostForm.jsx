import React from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Select from "../Select";
import Input from "../Input";
import RTE from "../RTE";
import dbService from "../../Services/dbService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        status: post?.status || "active",
        slug: post?.slug || "",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  // console.log(userData);

  const submit = async (data) => {
    // post exist then update
    if (post) {
      const file = data.image[0]
        ? await dbService.uploadFile(data.image[0])
        : null;

      // deleting old image
      if (file) dbService.deleteFile(post.featuredImage);

      // update post
      const dbPost = await dbService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      //   navigate user
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // new post is created
      const file = data.image[0]
        ? await dbService.uploadFile(data.image[0])
        : null;

      if (file) {
        // update image field
        // console.log(data);
        // console.log(file);
        data.featuredImage = file.$id;

        // create a post
        const newPost = await dbService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (newPost) {
          navigate(`/post/${newPost.$id}`);
        }
      }
    }
  };

  //   memoizing the fn
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    // cleanup of unmount
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap bg-[#4d425f] rounded p-4"
    >
      <div className="w-full order-2 md:order-1 md:w-2/3 px-2">
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-full order-1 md:order-2 md:w-1/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={dbService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg w-full "
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: false })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full bg-[#a364ff] py-2 hover:bg-[#6c35de]"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;

/* 
Overall Explanation of the PostForm Component
The PostForm component is a reusable form for creating or updating blog posts. It integrates with react-hook-form for form handling and uses dbService for interacting with the database.

Key Features
Form Initialization:

The useForm hook initializes the form with default values. If a post is passed as a prop, its values are used to prefill the form fields.
Form Fields:

Title: Input field for the post title.
Slug: Input field for the post slug, which is auto-generated based on the title.
Content: Rich Text Editor (RTE) for the post content.
Featured Image: File input for uploading an image.
Status: Dropdown to select the post status (active or inactive).

Slug Auto-Generation:

The slugTransform function and useEffect ensure that the slug field is automatically updated whenever the title field changes.

Submit Logic:

The submit function handles both creating and updating posts:
If post exists:
Updates the post in the database.
Deletes the old featured image if a new one is uploaded.
If post does not exist:
Creates a new post in the database.
Uploads the featured image if provided.

Navigation:

After successfully creating or updating a post, the user is redirected to the post's detail page using navigate.

File Handling:

The dbService.uploadFile method is used to upload the featured image.
The dbService.deleteFile method is used to delete the old image when updating a post.

Dynamic Button Label:

The submit button label changes based on whether the form is for creating (Submit) or updating (Update) a post.

Component Walkthrough
Props
post: An optional prop that contains the data of the post to be edited. If not provided, the form is used to create a new post.

State Management
Uses react-hook-form for managing form state and validation.
Uses useSelector to get the current user's data from the Redux store.

Form Submission
The submit function handles the form submission logic:
If editing a post, it updates the post in the database.
If creating a new post, it uploads the image (if provided) and creates the post.

Rendering
The form is divided into two sections:
Left Section:
Title, Slug, and Content fields.
Right Section:
Featured Image, Status dropdown, and Submit button.

Code Flow
Initialization:

The form is initialized with default values.
The slugTransform function and useEffect handle slug auto-generation.

User Interaction:

The user fills out the form fields.
The slug field is automatically updated as the user types in the title field.

Form Submission:

When the form is submitted, the submit function is called.
The function determines whether to create or update the post and interacts with the database accordingly.

Navigation:

After successful submission, the user is redirected to the post's detail page.


*/
