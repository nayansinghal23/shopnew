"use client";
import { updateProfilePhoto } from "@/actions/update";
import { useEdgeStore } from "@/lib/edgestore";
import { UpdateProfilePhotoSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const UpdateProfilePhotoPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof UpdateProfilePhotoSchema>>({
    resolver: zodResolver(UpdateProfilePhotoSchema),
    defaultValues: {
      image: "",
    },
  });
  const { edgestore } = useEdgeStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const onSubmit = async (data: z.infer<typeof UpdateProfilePhotoSchema>) => {
    setLoading(true);
    const file = data.image[0];
    const res = await edgestore.myPublicImages.upload({ file });
    if (!res) {
      setError("Something unexpected happened!");
      toast.error("Oops!!!");
      return;
    }
    console.log(res);
    updateProfilePhoto(res.url)
      .then((res: any) => {
        setLoading(false);
        if (res?.error) {
          setError(res?.error);
          toast.error("Try again!");
        }
        if (res?.success) {
          setSuccess(res?.success);
          toast.success("Profile Updated!");
          router.push("/");
        }
      })
      .catch(() => {
        setLoading(false);
        setError("Something unexpected happened!");
      });
  };

  return (
    <div className="bg-sky-500 h-screen min-h-max flex flex-col justify-center items-center">
      <div className="w-full sm:w-[450px] bg-white flex flex-col items-center justify-center rounded-lg gap-4 p-4">
        <h1 className="font-bold">Change Image</h1>
        <form
          className="w-full flex flex-col items-center gap-3 justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="file"
            required
            className="w-full cursor-pointer"
            accept="image/png, image/gif, image/jpeg, image/jpg"
            disabled={loading}
            {...register("image")}
          />
          {errors.image && (
            <p className="text-red-500">{errors.image?.message as string}</p>
          )}
          <button
            disabled={loading}
            type="submit"
            className="w-full text-center p-2 bg-blue-300 rounded-full hover:bg-slate-600 font-semibold cursor-pointer disabled:bg-gray-300"
          >
            UPDATE
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>
    </div>
  );
};

export default UpdateProfilePhotoPage;
