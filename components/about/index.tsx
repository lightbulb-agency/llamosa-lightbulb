import React, { useState, useEffect, useRef } from "react";

import { motion } from "framer-motion";
import useIntersect from "../../utils/useIntersectionObserver";
import { supabase } from "../../utils/useSupabase";

export default function AboutMe({
  setIsVisible,
}: {
  setIsVisible: () => void;
}) {
  // Call the useIntersect hook and receive the setNode and entry variables
  const { entry, setNode } = useIntersect({
    root: null, // The element used as the viewport for checking visibility, null means the browser viewport
    rootMargin: "0px", // Margin around the root element (in pixels)
    threshold: 0.5, // A threshold value between 0 and 1, indicating the percentage of the target element that should be visible before the callback is invoked
  });

  const observeRef = useRef(null);
  const [about, setAbout] = useState<string[]>([]);
  const [skills, setSkills] = useState<{ name: string, symbol: string }[]>([]);

  useEffect(() => {
    (async () => {
      setNode(observeRef.current);
      let getAbout = await supabase
        .from("informations")
        .select()
        .eq("user_id", process.env.NEXT_PUBLIC_USER_ID);
      let getSkills = await supabase
        .from("skills")
        .select()
        .eq("user_id", process.env.NEXT_PUBLIC_USER_ID)
        .order('id', { ascending: true });
      if (getAbout.status === 200 && getSkills.status === 200) {
        setAbout(getAbout.data[0].about.split("\n"));
        setSkills(getSkills.data.map((skill) => ({ name: skill.name, symbol: skill.symbol })))
      }
    })();
  }, []);

  useEffect(() => {
    if (!!entry?.isIntersecting) {
      setIsVisible();
    }
  }, [entry?.isIntersecting]);

  return (
    <motion.section
      id="_about-me"
      ref={observeRef}
      className="relative mt-8 cursor-default bg-dark-100/20 p-6 text-[13px] font-medium leading-[150%] text-gray-100 shadow-lg transition-all duration-300 ease-in hover:bg-dark-100/40 md:relative md:m-auto md:mb-32 md:mt-0 md:w-max md:rounded-[30px] md:p-16 md:text-[16px] !w-[64%]"
    >
      <div className="absolute -top-12 left-1/2 w-[315px] -translate-x-1/2">
        <motion.h2 className="heading-gradient text-lg font-semibold text-white">
          From Code to Coffee: About Me
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          className="heading-gradient-underline h-[1px]"
        />
      </div>
      <br />

      <p className="!leading-loose transition-all duration-300 ease-in hover:text-white/70 w-full indent-4">
        {about[0]}
      </p>
      <br />
      <p className="!leading-loose transition-all duration-300 ease-in hover:text-white/70 w-full indent-4">
        {about[1]}
      </p>
      <br />
      <p className="!leading-loose transition-all duration-300 ease-in hover:text-white/70 w-full indent-4">
        {about[2]}
      </p>
      <br />
      <p className="!leading-loose transition-all duration-300 ease-in hover:text-white/70 w-full indent-4">
        {about[3]}
      </p>
      <br />
      <p className="!leading-loose transition-all duration-300 ease-in hover:text-white/70 w-full indent-4">
        {about[4]}
      </p>
      <br />
      <p className="!leading-loose transition-all duration-300 ease-in hover:text-white/70 w-full indent-4">
        {"I build awesome 3D web apps using:"}
      </p>
      <div className="flex gap-4 justify-center mt-4">
        {skills.map((skill, id) =>
          <img key={`my-skills-${id}`} src={skill.symbol} alt={skill.name} className="w-12 h-12 bg-white border border-white rounded-xl opacity-80" />
        )}
      </div>
    </motion.section>
  );
}
