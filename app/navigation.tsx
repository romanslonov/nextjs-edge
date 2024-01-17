import Link from "next/link";

export function Navigation() {
  return (
    <header className="border-b">
      <div className="max-w-7xl p-8 flex items-center justify-between mx-auto">
        <Link href="/">logotype</Link>

        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="font-medium">
            Dashboard
          </Link>
          <Link href="/auth/signin" className="font-medium">
            Sign In
          </Link>
          <Link href="/auth/signup" className="font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
