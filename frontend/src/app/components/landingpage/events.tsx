import Image from "next/image";

export default function EventGP() {
  const event = [
    {
      name: "BALI GP",
      date: "10-02",
      image:
        "https://res.cloudinary.com/dtsxir6lv/image/upload/v1744453192/gpjakarta_tklbgd.jpg",
    },
    {
      name: "Jakarta GP",
      date: "08-05",
      image:
        "https://res.cloudinary.com/dtsxir6lv/image/upload/v1744453138/gpbali_tktpfk.jpg",
    },
    {
      name: "Bandung RoadRace",
      date: "05-10",
      image:
        "https://res.cloudinary.com/dtsxir6lv/image/upload/v1744453138/gpbali_tktpfk.jpg",
    },
    {
      name: "Purwadhika GP",
      date: "15-12",
      image:
        "https://res.cloudinary.com/dtsxir6lv/image/upload/v1744453138/gpbali_tktpfk.jpg",
    },
  ];
  return (
    <div className="mt-[30px] flex gap-10 justify-center">
      {event.map((events, idx) => (
        <div
          key={idx}
          className="bg-white w-[300px] h-[400px] shadow-md/30 flex flex-col rounded-md hover:scale-110"
        >
          <Image
            className="rounded-t-md"
            src={events.image}
            alt={events.name}
            width={300}
            height={100}
          />
          <div className="flex flex-col items-center justify-center">
            <p className="text-[25px] text-black font-audio font-bold">
              {events.name}
            </p>
            <p className="text-red-500 font-bold font-audio">{events.date}</p>
            <button className="subpixel-antialiased font-extralight bg-red-500 w-[200px] h-[50px] rounded-4xl shadow-md/50 hover:bg-red-300 hover:cursor-pointer">
              {" "}
              Buy Now
            </button>
            <button className="mt-[10px] subpixel-antialiased font-extralight bg-slate-300 w-[200px] h-[50px] rounded-4xl shadow-md/50 hover:bg-amber-300 hover:cursor-pointer">
              {" "}
              VIP Pass
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
