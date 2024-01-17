import { signin } from "./actions";
import { SigninForm } from "./form";

export default function SignupPage() {
  return (
    <div className="py-32">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Login into your account</h1>
      </div>
      <SigninForm action={signin} />
    </div>
  );
}
