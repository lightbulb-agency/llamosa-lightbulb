import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../utils/useSupabase";

export const scrollIntoId = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

const NavBar = ({activeSection} : {activeSection: string}) => {

  const [name, setName] = useState<string>("");

  useEffect(() => {
    (async () => {
      let { data, status } = await supabase.from("users").select().eq("id", process.env.NEXT_PUBLIC_USER_ID);
      if (status === 200) {
        setName(data[0].name)
      }
    })();
  }, [name])

  return (
    <header className="relative m-auto flex h-[55px] w-full items-center rounded-[8px] border-[1px] border-gray-200 nav-blur pl-2 text-gray-100 md:pl-8">
      <nav className="md:w-[18vw]">
        <span
          role="link"
          onClick={() => scrollIntoId("_hello")}
          className="heading-gradient cursor-pointer text-lg font-bold leading-[120.4%] tracking-wider transition-all duration-150 ease-in"
        >
          {name}
        </span>
      </nav>
      <nav className="hidden h-full items-center gap-2 md:flex">
        <OneNavItem text="_hello" delay={1} isActive={activeSection === "_hello"} />
        <OneNavItem text="_about-me" delay={2} isActive={activeSection === "_about-me"} />
        <OneNavItem text="_projects" delay={3} isActive={activeSection === "_projects"} />
        <OneNavItem text="_contact-me" delay={4} isActive={activeSection === "_contact-me"} />
      </nav>

      <a
        id="download-resume"
        href="/Lekipising-Liplan-Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-8 flex w-max items-center justify-center rounded-full border-[2px] border-white px-4 py-2 font-medium text-white transition-all duration-150 ease-in hover:border-yellow hover:text-yellow"
      >
        View resume
      </a>
    </header>
  );
}

function OneNavItem({ text, delay, isActive }: { text: string; delay?: number; isActive?: boolean  }) {
  return (
    <motion.nav
      initial={{ x: 20 }}
      whileInView={{ x: 0 }}
      transition={{ duration: 0.3, ease: "easeIn", delay: delay * 0.1 }}
      onClick={() => scrollIntoId(text)}
      className={`flex h-[90%] cursor-pointer items-center justify-center rounded border-[0.5px]  px-4 font-medium transition-all duration-150 ease-in hover:border-yellow hover:text-yellow ${isActive ? "border-yellow text-yellow" : "border-gray-200 text-gray-100"}`}
    >
      {text}
    </motion.nav>
  );
}

export default NavBar;
