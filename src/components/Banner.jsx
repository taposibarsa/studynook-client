"use client";

import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="bg-[#FAE8CE] dark:bg-zinc-950 transition-colors duration-300 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-14 lg:py-24">
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <h1 className="text-4xl sm:text-4xl lg:text-6xl font-bold leading-tight text-black dark:text-white">
              Find Your Perfect 
              <br />
              Study Room
            </h1>

            <p className="mt-6 text-gray-700 dark:text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed">
             Browse and book quiet, private study rooms in your <br /> library. List your own room and earn.
            </p>

            {/* Buttons */}

              
              <Link href={'/rooms'}>
              <button className="border-2 bg-[#F59E0B] border-black dark:border-white text-black text-lg dark:text-white mt-10 px-8 py-4 rounded-xl font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
                Explore More
              </button>
              </Link>
     </div>
          {/* Right Image */}
          <div className="relative flex justify-center  lg:justify-end">
            
            {/* Background Blur */}
            <div className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] bg-orange-300/30 dark:bg-cyan-500/20 blur-3xl rounded-full"></div>

            {/* Main Image */}
            <div className="relative">
              
              <Image
                src="/car.jpg"
                alt="Book Banner"
                width={550}
                height={550}
                priority
                className="w-full max-w-[500px] object-contain drop-shadow-2xl rounded-2xl"
              />

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;