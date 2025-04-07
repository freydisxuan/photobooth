import Link from 'next/link';

export default function Home() {
  return (
    <div className="welcome">
      <h1>Welcome!</h1>
      <p>You have <strong>3 seconds</strong> for each shot — no retakes!</p>
      <p>This photobooth captures <strong>4 pictures</strong> in a row.</p>
      <Link href="/capture">
        <button>Start</button>
      </Link>
    </div>
  );
}
