import { auth } from "@/auth";

const UserDetails = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <h1 className="text-2xl font-bold">User Page</h1>
      <p className="font-semibold">Name: {user?.name}</p>
      <p className="font-semibold">Email: {user?.email}</p>
      <p className="font-semibold">
        Image: {user?.image ? user.image : "No image added"}
      </p>
    </>
  );
};

export default UserDetails;
