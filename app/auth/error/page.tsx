import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="bg-sky-500 h-screen min-h-max flex flex-col justify-center items-center">
      <div className="w-full sm:w-[450px] bg-white flex flex-col items-center justify-center rounded-lg gap-4 p-4">
        <h1 className="text-2xl font-bold">Error Page</h1>
        <p className="text-red-800 font-semibold">
          Something unexpected occurs!
        </p>
        <Link href="/auth/login" className="text-sm font-semibold underline">
          Login Again
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
