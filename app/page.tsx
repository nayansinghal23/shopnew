import { auth, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>Signout</button>
      </form>
    </div>
  );
}
