"use client";
import { registerAction } from "@/actions/register";
import Button from "@/components/Button";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const RegisterPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    setError("");
    registerAction(values)
      .then((data: any) => {
        setLoading(false);
        if (data?.error) {
          setError(data?.error);
        }
        if (data?.success && data?.token) {
          router.push(`/auth/verify-token?token=${data?.token}`);
        }
        reset();
      })
      .catch(() => {
        setError("Something unexpected ocuurs!");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (searchParams.get("error") === "OAuthAccountNotLinked") {
      setError("Try with another method or account");
    }
  }, [searchParams]);

  return (
    <Suspense>
      <div className="bg-sky-500 h-screen min-h-max flex flex-col justify-center items-center">
        <div className="w-full sm:w-[450px] bg-white flex flex-col items-center justify-center rounded-lg gap-4 p-4">
          <h1 className="text-2xl font-bold">Register Form</h1>
          <form
            className="flex flex-col gap-3 w-full items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              placeholder="Enter your username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-200"
              required
              disabled={loading}
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
            <input
              type="email"
              placeholder="Enter your email"
              required
              disabled={loading}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-200"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <input
              type="password"
              placeholder="Enter your password"
              required
              disabled={loading}
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-200"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-4 mt-2 border bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-200"
            >
              Register
            </button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
          <Link href="/auth/login" className="text-sm font-semibold underline">
            Already have an account
          </Link>
          <div className="flex flex-col gap-2 justify-between items-center w-full">
            <Button text="Google" isOuth icon={<FcGoogle />} type="google" />
            <Button text="GitHub" isOuth icon={<FaGithub />} type="github" />
            <Button text="Discord" isOuth icon={<FaDiscord />} type="discord" />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default RegisterPage;
