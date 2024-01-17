import { signup } from "./actions";
import { SignupForm } from "./form";

export default function SignupPage() {
  return (
    <div className="py-32">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Create your account</h1>
      </div>
      <SignupForm action={signup} />
    </div>
  );
}
