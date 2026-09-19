import LoginForm from '../features/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold">Log in</h1>
      <LoginForm />
    </div>
  );
}
