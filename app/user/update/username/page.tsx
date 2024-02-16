"use client";
import { updateUsername } from "@/actions/update";
import { UpdateUsernameSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const UpdateUsernamePage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof UpdateUsernameSchema>>({
    resolver: zodResolver(UpdateUsernameSchema),
    defaultValues: {
      username: "",
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSubmit = async (data: z.infer<typeof UpdateUsernameSchema>) => {
    setLoading(true);
    updateUsername(data)
      .then((res: any) => {
        console.log(res);
        setLoading(false);
        if (res?.success) {
          toast.success("Updated!");
          setSuccess(res?.success);
          router.push(`/`);
        }
        if (res?.error) {
          toast.error("Try again!");
          setError(res?.error);
        }
      })
      .catch(() => {
        setError("Something unexpected occurred!");
        setLoading(false);
      });
  };

  return (
    <div className="bg-sky-500 h-screen min-h-max flex flex-col justify-center items-center">
      <div className="w-full sm:w-[450px] bg-white flex flex-col items-center justify-center rounded-lg gap-4 p-4">
        <h1 className="font-bold">Update Username</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-3 justify-center"
        >
          <input
            type="text"
            placeholder="Enter new username"
            required
            disabled={loading}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-200"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
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

export default UpdateUsernamePage;
