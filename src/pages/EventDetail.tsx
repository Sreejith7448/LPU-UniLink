// import { useNavigate, useParams } from "react-router-dom";
// import { ArrowLeft, Home } from "lucide-react";

// const EventDetail: React.FC = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // fallback sample data — you can replace with your real fetch later
//   const sample: Record<string, any> = {
//     "1": {
//       title: "23DC",
//       image:
//         "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
//       text:
//         "From walking the beautiful pathways of LPU to shaping skylines worldwide, 23DC Architects...",
//     },
//     // keep other ids if needed...
//   };

//   const event = sample[id as string] ?? {
//     title: `Event ${id}`,
//     image:
//       "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1200&q=80",
//     text: "Event details not found in sample data.",
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <div
//         className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3"
//         style={{ background: "var(--gradient-primary)" }}
//       >
//         <button onClick={() => navigate(-1)} className="text-primary-foreground">
//           <ArrowLeft className="w-6 h-6" />
//         </button>
//         <h1 className="text-lg font-semibold text-primary-foreground flex-1 text-center">Event Details</h1>
//         <button onClick={() => navigate("/app")} className="text-primary-foreground">
//           <Home className="w-6 h-6" />
//         </button>
//       </div>

//       <div className="p-4">
//         <div className="border border-gray-200 rounded-none overflow-hidden shadow-sm">
//           <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
//           <div className="p-4">
//             <h2 className="text-xl font-bold mb-2">{event.title}</h2>
//             <p className="text-sm text-muted-foreground leading-relaxed">{event.text}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetail;



// pages/EventDetail.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const EventDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>No event details found.</p>
        <Button onClick={() => navigate("/events")} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const { title, description, date, image } = state;

  return (
    <div className="min-h-screen bg-[#fffaf5]">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-orange-400 px-4 py-3 text-white font-semibold text-lg">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <span>Event Details</span>
        <button onClick={() => navigate("/events")}>
          <Home size={22} />
        </button>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover"
          />
          <div className="p-5">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-sm text-gray-500 mb-4">{date}</p>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
