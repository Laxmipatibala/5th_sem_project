import { useState, useEffect } from "react";

export default function Banner() {
  const images = [
    "/images/delhi.jpg",
    "/images/goa.jpg",
    "/images/jk.jpg",
    "/images/rj.jpg",
    "/images/uk.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full h-52 md:h-72 overflow-hidden rounded-3xl shadow-2xl mb-8 bg-black">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-60"
        style={{ backgroundImage: `url(${images[index]})` }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      {/* Foreground Slider */}
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-out"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${index * (100 / images.length)}%)`,
        }}
      >
        {images.map((img, i) => (
          <div key={i} className="w-full flex items-center">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 px-6 md:px-10">
              <img
                src={img}
                className="w-40 md:w-56 rounded-xl shadow-lg object-cover border border-white/20"
              />
              <div className="text-white space-y-2 md:space-y-3 max-w-xl">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  Discover India, one city at a time.
                </h2>
                <p className="text-sm md:text-base text-gray-200 max-w-md">
                  Cinematic routes, curated stays and experiences—plan trips that feel like a movie.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
