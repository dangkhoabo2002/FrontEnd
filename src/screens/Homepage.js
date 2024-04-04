import React from "react";
import background1 from "../assets/homeBackground.png";
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
        {/*------------ Opening Backgroud --------------- */}

        <div className="relative">
          <img
            id="imgFadeIn"
            loading="lazy"
            src={hpBr}
            alt="hpBr"
            className="w-full object-cover"
            style={{ height: "600px" }}
          />
          <div className="absolute bottom-1/3 left-60 text-white w-1/3">
            <div className="text-5xl font-semibold w-2/3 pb-6 textChangeColor">
              Sell solutions not products
            </div>
            <div className=" text-lg w-full font-semibold textChangeColor">
              Shift your perspective from pushing products to solving problems.
              Understand the root causes of your customers' challenges and craft
              holistic solutions that address their unique needs. By
              prioritizing solutions over sales pitches, you build lasting
              partnerships founded on mutual trust and value.{" "}
            </div>
          </div>
        </div>

        {/*------------ Body --------------- */}

        <div className="px-60 pb-20">
          {/*------------ Featured News--------------- */}

          <div className="flex flex-col py-12" id="featureNew">
            <div>FEATURED NEWS</div>
            <div className="text-black text-2xl font-semibold">
              Discover what’s happening on MHD
            </div>
          </div>

          <div className="flex flex-row gap-12">
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="">
                <img
                  loading="lazy"
                  class="rounded-t-lg"
                  src={background1}
                  alt="imgCard"
                  style={{
                    borderRadius: "20px",
                    objectFit: "cover",
                    padding: "10px",
                  }}
                />
              </div>
              <div class="p-5 py-14">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Easy to Use
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </div>
            </div>

            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="">
                <img
                  loading="lazy"
                  class="rounded-t-lg"
                  src={background1}
                  alt="imgCard"
                  style={{
                    borderRadius: "20px",
                    objectFit: "cover",
                    padding: "10px",
                  }}
                />
              </div>
              <div class="p-5 ">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Reasonable Price
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </div>
            </div>

            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div>
                <img
                  loading="lazy"
                  class="rounded-t-lg"
                  src={background1}
                  alt="imgCard"
                  style={{
                    borderRadius: "20px",
                    objectFit: "cover",
                    padding: "10px",
                  }}
                />
              </div>
              <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Management capabilities
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  With real-time reflection method along with the ability to
                  store direct impacts on the server side, helping you easily
                  manage and control the actions of members of the organization
                </p>
              </div>
            </div>
          </div>

          {/*------------ SOLUTIONS --------------- */}

          {/* 
          <div className="flex flex-col py-12" id="solution">
            <div>SOLUTIONS</div>
            <div className="text-black text-2xl font-semibold">
              Find solutions for putting your ideas into action
            </div>
          </div>

          <div>
            <Accordion>
              {items.map(({ header, content }, i) => (
                <AccordionItem header={header} key={i}>
                  {content}
                </AccordionItem>
              ))}
            </Accordion>
          </div> */}

          {/*------------ ABOUT US--------------- */}

          <div className="flex flex-col pt-12 " id="aboutUs">
            <div>ABOUT US</div>
            <div className="text-black text-2xl font-semibold">
              MHD, dedicated and enthusiastic people
            </div>
            <AboutUs />
          </div>

          {/* CONTACT */}
          <div className="flex flex-col pb-12" id="contact">
            <div>CONTACT</div>
            <div className="text-black text-2xl font-semibold">
              Contact information to answer questions
            </div>
          </div>
          <div className="w-full border-2 rounded-lg px-20 py-10 flex flex-row justify-between shadow-md bg-white">
            <div className="w-1/4 ">
              <div className="font-semibold border-b-2">CONTACT</div>
              <span>
                <p className="text-slate-600 pt-4">mhd_support@gmail.com</p>
                <p className="text-slate-600">+84 834523322</p>
              </span>
            </div>
            <div className="w-1/3">
              <div className="font-semibold border-b-2">LOCATION</div>
              <div className="text-slate-600 pt-4">
                FPT University, Ho Chi Minh City, High Technology Park, Lot
                E2a-7, Street D1, D. D1, Long Thanh My, Thu Duc City, Ho Chi
                Minh City, Vietnam.
              </div>
            </div>
            <div className="w-1/3">
              <iframe
                id="contact"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.610010537607!2d106.8073027088192!3d10.841127589266979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1704530710413!5m2!1svi!2s"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
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
