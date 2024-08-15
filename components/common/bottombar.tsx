import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";
import { supabase } from "../../utils/useSupabase";
import Twitter from "../../assets/twitter.svg";
import LinkedIn from "../../assets/linkedin.svg";
import Github from "../../assets/github.svg";

export default function BottomBar() {

  const userid = process.env.NEXT_PUBLIC_USER_ID;
  const [name, setName] = useState<string>("");
  const [github, setGithub] = useState<string>("");

  useEffect(() => {
    (async () => {
      let user = await supabase.from("users").select().eq("id", userid);
      let contact = await supabase.from("contacts").select().eq("user_id", userid);
      if (user.status === 200 && contact.status === 200) {
        setName(user.data[0].name);
        setGithub(contact.data.filter((con) => con.toolname === "GitHub")[0].link);
      }
    })();
  }, [name])

  return (
    <footer className="fixed inset-x-[5vw] bottom-[5vh] hidden h-[55px] items-center justify-between rounded-b-[5px] border-[1px] border-t-[1px] border-gray-200 bg-dark-300 px-8 pl-2 text-gray-100 md:flex  md:pl-8">
      <div className="flex h-full items-center">
        <span className="pr-2">Connect with me</span>
        <a
          href="https://twitter.com/lekipising"
          target="_blank"
          rel="noreferrer"
          className="flex h-full items-center justify-center border-l-[1px] border-l-gray-200 px-4"
        >
          <Image
            src={Twitter}
            height="30"
            width="30"
            alt="Twitter"
            className="cursor-pointer"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </a>
        <a
          href="https://www.linkedin.com/in/liplan0lekipising/"
          target="_blank"
          rel="noreferrer"
          className="flex h-full items-center justify-center border-x-[1px] border-x-gray-200 px-4"
        >
          <Image
            src={LinkedIn}
            height="30"
            width="30"
            alt="LinkedIn"
            className="cursor-pointer"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </a>
      </div>

      <a
        href={github}
        target="_blank"
        rel="noreferrer"
        className="flex h-full cursor-pointer items-center gap-2 border-x-[1px] border-x-gray-200 px-4"
      >
        <span className="cursor-pointer">{name}</span>
        <Image
          src={Github}
          height="30"
          width="30"
          alt="Github"
          className="cursor-pointer"
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
      </a>
    </footer>
  );
}
