/*
import Homepage from "@/components/Homepage/Homepage";

export default function Home() {
  return (
    <div className="bg-black text-white">
      <Homepage/>
    </div>
  );
}
*/

import Link from 'next/link';

function Home() {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to My Awesome App</h1>
        <div className="space-x-4">
          <Link href="/auth/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              Login
          </Link>
          <Link href="/auth/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
