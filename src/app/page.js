import Image from "next/image";
import Link from "next/link";
// import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center  bg-gradient-to-r from-gray-300 to-gray-400   "> 
    <div className="contianer mx-auto flex flex-col justify-center items-center ">
     <h2 className="text-4xl text-slate-800 font-bold mb-4">Add and Explore Students Record</h2>
     <Link className="text-white text-xl bg-slate-800  py-2 font-bold px-6 rounded-lg" href={'/record'}>Get Started</Link>
    </div>
  </div>

  );
}
