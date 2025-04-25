export default function Orders() {
  const events = {
    name: "BALI GP",
    date: "10-02",
    start: "08:00 AM",
    end: "12:00 PM",
    location: "Denpasar, Bali",
    circuit: "Denpasar Racing",
    category: "GP Events",
    image:
      "https://res.cloudinary.com/dtsxir6lv/image/upload/v1744453192/gpjakarta_tklbgd.jpg",
    priceRegular: 250000,
    priceVIP: 500000,
  };
  return (
    <div className="mt-[20px] flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-t-md mt-[20px] bg-blue-950 w-[650px] h-[70px] shadow-md/50">
          <div className="flex items-center gap-[100px]">
            <div className="flex flex-col">
              <div className="flex gap-2 text-[30px] px-3 text-sky-200">
                <p className="font-bold">REGULAR</p>
                <p>PASS</p>
              </div>
              <p className="px-3 text-sky-200">
                this pass only available for {events.name}
              </p>
            </div>
            <div>
              <p className="font-extrabold text-[25px] text-sky-300">
                {events.circuit}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-indigo-950 rounded-b-md w-[650px] h-[125px] px-3 shadow-md/50">
          <div className="flex gap-3">
            <div className="w-[325px] h-[110px] text-white">
              <p className="text-[25px] subpixel-antialiased font-extralight">
                Regular Stand
              </p>
              <p className="text-[25px] subpixel-antialiased font-extralight">
                Seat : 1
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-t-md mt-[20px] bg-black w-[650px] h-[70px]">
          <div className="flex items-center gap-[100px]">
            <div className="flex flex-col">
              <div className="flex gap-2 text-[30px] px-3 text-red-500">
                <p className="font-bold">VIP</p>
                <p>PASS</p>
              </div>
              <p className="px-3 text-red-400">
                this pass only available for {events.name}
              </p>
            </div>
            <div>
              <p className="font-extrabold text-[25px] text-red-500">
                {events.circuit}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-950 rounded-b-md w-[650px] h-[125px] px-3">
          <div className="flex gap-3">
            <div className="w-[325px] h-[110px] text-red-800">
              <p className="text-[25px] subpixel-antialiased font-extralight">
                VIP Stand
              </p>
              <p className="text-[25px] subpixel-antialiased font-extralight">
                Seat : 1
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
