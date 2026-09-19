import SignupForm from '../features/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold">Sign up</h1>
      <SignupForm />
    </div>
  );
}
