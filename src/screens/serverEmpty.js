import React from "react";
import { RiServerFill } from "react-icons/ri";
// import { Container } from 'tailwind-react-ui'
import Empty from "../images/empty.png";
import Footer from "../components/userFooter";
import ButtonAddServer from "./buttonAddServer";

export default function ServerEmpty() {
  return (
    <div>
        <div className="px-20">
          {/* BodyContainer */}
          <div
            className=" py-6 text-center border-stone-200"
            style={{ borderBottom: "1px solid", color: "#D9D9D9" }}
          >
            <div className="header flex flex-row items-center gap-x-3">
              <RiServerFill
                style={{ width: "32px", height: "32px", color: "#637381" }}
              />
              <p
                className="font-semibold"
                style={{ fontSize: "28px", color: "#637381" }}
              >
                MY SERVERS
              </p>
            </div>
          </div>

          <div
            className=""
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src={Empty}
              className="img items-center justify-center"
              alt="empty"
              style={{
                width: "652px",
                height: "652px",
                opacity: "50%",
                objectFit: "center",
              }}
            />
          </div>
          <ButtonAddServer />
        </div>

      <Footer />
    </div>
  );
}
