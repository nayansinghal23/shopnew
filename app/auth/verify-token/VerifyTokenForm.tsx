"use client";
import { verifyingTokenAndUser } from "@/actions/token";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyTokenForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [verifying, setVerifying] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!token) return;
    setError("");
    verifyingTokenAndUser(token)
      .then((data) => {
        if (data) {
          setError("");
          setVerifying(false);
        } else {
          setError("Something unexpected occurs!");
        }
      })
      .catch(() => {
        setError("Something unexpected occurs!");
      });
  }, [token]);

  return (
    <div className="bg-sky-500 h-screen min-h-max flex flex-col justify-center items-center">
      <div className="w-full sm:w-[450px] bg-white flex flex-col items-center justify-center rounded-lg gap-4 p-4">
        <h1 className="text-2xl font-bold">Verifying your email</h1>
        {verifying && <p>Verifying...</p>}
        {!verifying && (
          <Link href="/auth/login" className="text-sm font-semibold underline">
            You can login successfully
          </Link>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default VerifyTokenForm;
