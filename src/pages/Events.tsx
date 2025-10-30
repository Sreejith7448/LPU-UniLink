
import { useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      title: "23DC",
      description:
        "From walking the beautiful pathways of LPU to shaping skylines worldwide, 23DC Architects are revolutionizing modern architecture.",
      date: "Jan 22, 2025 | 5:00 PM",
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: 2,
      title: "ArtFusion",
      description:
        "A creative showcase bringing together art, technology, and storytelling to ignite inspiration and imagination.",
      date: "Feb 12, 2025 | 6:30 PM",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: 3,
      title: "Ignite Talks",
      description:
        "A speaker series where ideas meet innovation, empowering audiences to think bigger and act bolder.",
      date: "Mar 8, 2025 | 3:00 PM",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: 4,
      title: "TechVerse",
      description:
        "Dive into the latest in AI, robotics, and digital experiences shaping tomorrow’s tech frontier.",
      date: "Mar 28, 2025 | 4:00 PM",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: 5,
      title: "GreenPlanet Expo",
      description:
        "An eco-sustainability event showcasing innovations that preserve our planet’s future.",
      date: "Apr 14, 2025 | 10:00 AM",
      image:
        "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: 6,
      title: "Startup Sprint",
      description:
        "A 48-hour startup hackathon empowering teams to innovate, build, and pitch groundbreaking solutions.",
      date: "May 10, 2025 | 9:00 AM",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      {/* 🔶 Top orange gradient bar with Events and Chats */}
      <div className="bg-gradient-to-b from-orange-400 to-orange-200 py-3 flex justify-center items-center">
        <div className="bg-white/70 rounded-full flex">
          <button
            onClick={() => navigate("/events")}
            className="px-6 py-2 text-sm font-medium text-black bg-orange-300 rounded-full"
          >
            Events
          </button>
          <button
            onClick={() => navigate("/chats")}
            className="px-6 py-2 text-sm font-medium text-black rounded-full hover:bg-orange-300 transition"
          >
            Chats
          </button>
        </div>
      </div>

      {/* 🟧 Original Events heading + grid below */}
      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
              onClick={() => navigate(`/event/${event.id}`, { state: event })}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-56 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <p className="text-sm text-gray-500">{event.date}</p>
                <p className="mt-2 text-gray-700 truncate">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;


