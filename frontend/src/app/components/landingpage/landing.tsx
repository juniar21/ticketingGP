import EventGP from "./events";
import NavbarPage from "../navbar/navbar";

export default function LandingPage() {
  return (
    <div>
      <NavbarPage />
      <video
        className="h-[500px] object-cover"
        width="1550"
        height="720"
        autoPlay
        muted
        loop
      >
        <source src="/videoplayback.mp4" type="video/mp4" />
      </video>
      <div className="bg-black w-[1513px] flex justify-center">
        <p className="font-bold text-[50px] text-white subpixel-antialiased font-audio">
          {" "}
          OFFICIAL TICKET STORE INDONESIA
        </p>
      </div>
      <div className="flex justify-center gap-5 mt-[50px]">
        <div
          role="card"
          className="w-[1400px] h-[600px] bg-white rounded-md shadow-md/20"
        >
          <EventGP />
        </div>
      </div>
    </div>
  );
}
