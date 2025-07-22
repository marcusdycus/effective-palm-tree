import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome to the Home Page</h1>

        <div className="mt-6">
          <Link
            href="/login"
            className="text-2xl text-blue-600 hover:underline"
          >
            Go to Login
          </Link>
        </div>
      </main>
    </div>
  );
}
