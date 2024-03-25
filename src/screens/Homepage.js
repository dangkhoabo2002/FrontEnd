import React from "react";
import background1 from "../assets/homeBackground.png";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import logo from "../assets/logo.png";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import hpBr from "../images/hpBr.png";

// var acc = document.getElementsByClassName("accordion");
// var i;

// for (i = 0; i < acc.length; i++) {
//   acc[i].addEventListener("click", function () {
//     this.classList.toggle("active");
//     var panel = this.nextElementSibling;
//     if (panel.style.maxHeight) {
//       panel.style.maxHeight = null;
//     } else {
//       panel.style.maxHeight = panel.scrollHeight + "px";
//     }
//   });
// }
export default function Homepage() {
  return (
    <>
      <Navigation />

      <div className="bg-[#F3F8FF]">
        {/*------------ Opening Backgroud --------------- */}

        <div className="relative">
          <img
            src={hpBr}
            alt="hpBr"
            className="w-full object-cover"
            style={{ height: "600px" }}
          />
          <div className="absolute bottom-1/3 left-64 text-white w-1/3">
            <div className="text-6xl font-semibold w-2/3 pb-6">
              Learn, connect and explore
            </div>
            <div className=" text-lg w-full font-semibold">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </div>
          </div>
        </div>

        {/*------------ Body --------------- */}

        <div className="px-60 pb-20">
          {/*------------ Featured News--------------- */}

          <div className="flex flex-col py-12 ">
            <div>FEATURED NEWS</div>
            <div className="text-black text-2xl font-semibold">
              Discover what’s happening on MHD
            </div>
          </div>

          <div className="flex flex-row gap-12">
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <div className="">
                  <img
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
              </a>
              <div class="p-5">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Noteworthy technology acquisitions 2021
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                <a
                  href="#"
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <div className="">
                  <img
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
              </a>
              <div class="p-5">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Noteworthy technology acquisitions 2021
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                <a
                  href="#"
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <div>
                  <img
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
              </a>
              <div class="p-5">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Noteworthy technology acquisitions 2021
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                <a
                  href="#"
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/*------------ SOLUTIONS --------------- */}

          <div className="flex flex-col py-12">
            <div>SOLUTIONS</div>
            <div className="text-black text-2xl font-semibold">
              Find solutions for putting your ideas into action
            </div>
          </div>

          {/* <div>
          <h2>Accordion with symbols</h2>
          <button class="accordion">Section 1</button>
          <div class="panel">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <button class="accordion">Section 2</button>
          <div class="panel">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <button class="accordion">Section 3</button>
          <div class="panel">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div> */}

          <div>
            <Accordion>
              {items.map(({ header, content }, i) => (
                <AccordionItem header={header} key={i}>
                  {content}
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/*------------ CONTACT--------------- */}

          <div className="flex flex-col py-12 ">
            <div>SOLUTIONS</div>
            <div className="text-black text-2xl font-semibold">
              Find solutions for putting your ideas into action
            </div>
          </div>

          <div className="w-full border-2 rounded-lg px-20 py-10 flex flex-row justify-between	shadow-md  ">
            <div className="w-1/4 ">
              <div className="font-semibold border-b-2">CONTACT</div>
              <span>
                <p className="text-slate-400 pt-4">mhd_support@gmail.com</p>
                <p className="text-slate-400">+84 834523322</p>
              </span>
            </div>
            <div className="w-1/3">
              <div className="font-semibold border-b-2">LOCATION</div>
              <div className="text-slate-400 pt-4">
                FPT University, Ho Chi Minh City, High Technology Park, Lot
                E2a-7, Street D1, D. D1, Long Thanh My, Thu Duc City, Ho Chi
                Minh City, Vietnam.
              </div>
            </div>
            <div className="w-1/3">
              <iframe
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
