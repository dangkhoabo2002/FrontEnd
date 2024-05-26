import React from "react";
import pic1 from "../assets/mainpage1.png";
import pic2 from "../assets/mainpage2.png";
import pic3 from "../assets/mainpage3.png";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import hpBr from "../images/hpBr.png";
import AboutUs from "./abouUs";
import "../css/Homepage.css";
export default function Homepage() {
  return (
    <>
      <Navigation />
      <div className="bg-[#F3F8FF]">
        <div className="relative">
          <img
            id="imgFadeIn"
            loading="lazy"
            src={hpBr}
            alt="hpBr"
            className="w-full object-cover h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
          />
          <div className="absolute bottom-1/4 sm:bottom-1/3 left-5 md:left-10 lg:left-60 text-white w-11/12 md:w-2/3 lg:w-1/3">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold pb-4 sm:pb-6 textChangeColor">
              Sell solutions not products
            </div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold textChangeColor">
              Shift your perspective from pushing products to solving problems.
              Understand the root causes of your customers' challenges and craft
              holistic solutions that address their unique needs. By
              prioritizing solutions over sales pitches, you build lasting
              partnerships founded on mutual trust and value.
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-60 pb-20">
          <div className="flex flex-col py-8 md:py-12" id="featureNew">
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl">FEATURED NEWS</div>
            <div className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
              Discover what’s happening on MHD
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
            {[pic1, pic2, pic3].map((pic, index) => (
              <div key={index} className="max-w-xs sm:max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:scale-105 transition-transform">
                <div>
                  <img
                    loading="lazy"
                    className="rounded-t-lg w-full h-[150px] sm:h-[200px] object-cover p-2"
                    src={pic}
                    alt={`imgCard${index + 1}`}
                  />
                </div>
                <div className="p-5">
                  <h5 className="mb-2 text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {["Easy to Use", "Reasonable Price", "Management capabilities"][index]}
                  </h5>
                  <p className="mb-3 text-xs sm:text-sm md:text-base lg:text-lg font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col pt-8 md:pt-12" id="aboutUs">
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl">ABOUT US</div>
            <div className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
              MHD, dedicated and enthusiastic people
            </div>
            <AboutUs />
          </div>

          <div className="flex flex-col pb-8 md:pb-12" id="contact">
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl">CONTACT</div>
            <div className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
              Contact information to answer questions
            </div>
          </div>
          <div className="w-full border-2 rounded-lg px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-10 flex flex-col md:flex-row justify-between shadow-md bg-white">
            <div className="w-full md:w-1/3 lg:w-1/4 pb-4 md:pb-0">
              <div className="font-semibold border-b-2">CONTACT</div>
              <span>
                <p className="text-slate-600 pt-4">mhd_support@gmail.com</p>
                <p className="text-slate-600">+84 834523322</p>
              </span>
            </div>
            <div className="w-full md:w-1/3 pb-4 md:pb-0">
              <div className="font-semibold border-b-2">LOCATION</div>
              <div className="text-slate-600 pt-4">
                FPT University, Ho Chi Minh City, High Technology Park, Lot
                E2a-7, Street D1, D. D1, Long Thanh My, Thu Duc City, Ho Chi
                Minh City, Vietnam.
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <iframe
                id="contact"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.610010537607!2d106.8073027088192!3d10.841127589266979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1704530710413!5m2!1svi!2s"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[200px] rounded-lg"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

const items = [
  {
    header: "What is Lorem Ipsum?",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing...",
  },
  {
    header: "Where does it come from?",
    content: "Quisque eget luctus mi, vehicula mollis lorem...",
  },
  {
    header: "Why do we use it?",
    content: "Suspendisse massa risus, pretium id interdum in...",
  },
];
