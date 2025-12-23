export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-10 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-2xl space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Contact us</h1>
          <p className="text-gray-300 text-sm md:text-base">
            Have feedback, feature ideas or issues with a booking? Reach out and we’ll get back to you.
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks for reaching out! This demo form doesn't send emails, but your UI is ready.");
          }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col text-sm md:text-base">
              <label className="mb-1 text-gray-200">Name</label>
              <input
                type="text"
                className="px-3 py-2 rounded-xl bg-black/70 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div className="flex flex-col text-sm md:text-base">
              <label className="mb-1 text-gray-200">Email</label>
              <input
                type="email"
                className="px-3 py-2 rounded-xl bg-black/70 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          <div className="flex flex-col text-sm md:text-base">
            <label className="mb-1 text-gray-200">Message</label>
            <textarea
              rows={4}
              className="px-3 py-2 rounded-xl bg-black/70 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition-all text-sm md:text-base"
          >
            Send message
          </button>
        </form>

        <div className="text-xs md:text-sm text-gray-400">
          Or email us at <span className="text-gray-200">support@travelplanner.com</span> ·
          Call: <span className="text-gray-200">+91 9876543210</span>
        </div>
      </div>
    </div>
  );
}
