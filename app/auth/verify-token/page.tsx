import { Suspense } from "react";
import VerifyTokenForm from "./VerifyTokenForm";

const VerifyTokenPage = () => {
  return (
    <Suspense>
      <VerifyTokenForm />
    </Suspense>
  );
};

export default VerifyTokenPage;
