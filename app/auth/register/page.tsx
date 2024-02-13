import { Suspense } from "react";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
};

export default RegisterPage;
