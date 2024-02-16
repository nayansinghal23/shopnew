import Link from "next/link";
import UserDetails from "../../../components/user/UserDetails";

const UserProfilePage = () => {
  return (
    <div className="bg-sky-500 h-screen min-h-max flex flex-col justify-center items-center">
      <div className="w-full sm:w-[450px] bg-white flex flex-col items-center justify-center rounded-lg gap-4 p-4">
        <UserDetails />
        <Link
          href="/user/update/username"
          className="w-full text-center p-2 bg-blue-300 rounded-full hover:bg-slate-600 font-semibold cursor-pointer disabled:bg-gray-300"
        >
          Change Username
        </Link>
        <Link
          href="/user/update/profile-photo"
          className="w-full p-2 text-center bg-blue-300 rounded-full hover:bg-slate-600 font-semibold cursor-pointer disabled:bg-gray-300"
        >
          Change Image
        </Link>
      </div>
    </div>
  );
};

export default UserProfilePage;
