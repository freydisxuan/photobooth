import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
      <p className="text-lg mb-2">
        You have <strong>3 seconds</strong> for each shot — no retakes!
      </p>
      <p className="text-lg mb-6">
        This photobooth captures <strong>4 pictures</strong> in a row.
      </p>
      <a href="/booth">
        <button className="border-2 border-black px-4 py-2 rounded-full bg-white hover:bg-pink-200 transition">
          Start
        </button>
      </a>
    </div>
  );
}

