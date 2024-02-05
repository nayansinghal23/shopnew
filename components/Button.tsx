import { oAuth } from "@/actions/login";

interface ButtonProps {
  text: string;
  isOuth?: boolean;
  icon?: any;
  type: "github" | "discord" | "google";
}

const Button = ({ text, isOuth, icon, type }: ButtonProps) => {
  return (
    <button
      className={`w-full flex items-center justify-center gap-4 mt-2 ${
        isOuth
          ? "border border-black hover:bg-slate-200"
          : "bg-blue-500 hover:bg-blue-700 text-white"
      } font-bold py-2 px-4 rounded-full`}
      onClick={async () => {
        await oAuth(type);
      }}
    >
      {isOuth && icon}
      {text}
    </button>
  );
};

export default Button;
