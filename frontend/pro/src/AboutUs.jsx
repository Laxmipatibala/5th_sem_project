export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-10 flex items-center justify-center">
      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">About TravelFlix</h1>
        <p className="text-gray-200 text-sm md:text-base">
          TravelFlix is a cinematic travel planner built to make every journey feel like a story.
          We combine curated stays, local experiences and intelligent routing to help you design
          unforgettable trips in just a few clicks.
        </p>
        <p className="text-gray-300 text-sm md:text-base">
          From weekend getaways to multi-city adventures, our goal is to give you the control of a
          spreadsheet with the beauty of a movie trailer. You choose the destinations, we help you
          stitch them into a seamless itinerary.
        </p>
      </div>
    </div>
  );
}
