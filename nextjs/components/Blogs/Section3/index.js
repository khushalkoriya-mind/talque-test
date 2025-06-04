import React, { useState } from "react";
import { errorToast, successToast, classes } from "@/utils/helper";
import validator from "validator";
import { Api } from "@/api";

const Section3 = ({ data }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLatestEmailUpdate = async () => {
    if (validator.isEmpty(email.trim())) {
      setError("Please enter email address.");
    } else if (!validator.isEmail(email)) {
      setError("Please enter valid email address.");
    } else {
      const payload = {
        data: { email: email.toLowerCase() },
      };
      const response = await Api.addLatestUpdateMail(payload);
      if (response?.status === 200) {
        successToast("You are subscribed to this email successfully");
        setEmail("");
      } else {
        if (
          response?.error?.details?.errors[0]?.message ===
          "This attribute must be unique"
        ) {
          errorToast("Your email is already registered with us.");
        } else {
          errorToast(
            response?.error?.details?.errors[0]?.message ||
              "Something went wrong!"
          );
        }
      }
    }
  };

  return (
    <section>
      <div className="homepage_get_latest_update_bg flex flex-col md:items-center md:justify-center justify-start lg:py-20 py-12 lg:px-0 px-4">
        <div
          className={`text-talque-primary-color ${"xl:text-5xl lg:text-4xl md:text-3xl text-2xl xl:!leading-66 lg:!leading-10 md:!leading-9 !leading-8 font-semibold"} capitalize mb-10`}>
          Don’t miss anything with our newsletter!
        </div>
        <div className="md:flex items-start justify-center gap-[19px]">
          <div className="md:mb-0 mb-4 flex flex-col">
            <input
              className="rounded-full px-7 py-3.5 xl:w-[480px] lg:w-[430px] md:w-[400px] w-full focus-within:outline-none placeholder:text-talque-secondary-color"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e) => {
                const { value } = e?.target;
                setEmail(value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  handleLatestEmailUpdate();
                }
              }}
              autoComplete="new-password"
            />

            <div className="text-red-500">{error}</div>
          </div>
          <div>
            <button
              className="relative overflow-hidden bg-gradient-to-r from-[#D17FE7] to-[#798DDE] rounded-full px-7 py-3.5 text-base text-white cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-gradient-to-tr hover:from-[#798DDE] hover:to-[#D17FE7]"
              onClick={() => handleLatestEmailUpdate()}>
              Subscribe
              <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 transition-opacity duration-300 hover:opacity-20"></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;
