import React from "react";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const [Open, setOpen] = useState(true);
  const Menu_Item = [
    { title: "Admin" },
    { title: "Home" },
    { title: "OutPass" },
    { title: "Create Outpass" },
    { title: "About Us" },
    { title: "Sign In" },
    { title: "Sign Out" },
  ];
  return (
    <>
      <div className="flex">
        <div>
          <div
            className={`bg-emerald-900 pt-8 p-5
           ${Open ? "w-80" : "w-24"}
             h-screen relative duration-300 `}
          >
            {/* arrow of going in and out */}
            <BsArrowLeft
              className={`bg-white rounded-full  cursor-pointer border-4 border-emerald-900 text-4xl top-1/2 -right-3 absolute hover:scale-125 duration-200
            ${!Open && "rotate-180"}`}
              onClick={() => {
                setOpen(!Open);
              }}
            />

            {/* logo */}
            <div className="text-white">
              <img
                className={`bg-white border-4 border-gray-500
              rounded-xl duration-1000 ${Open && "rotate-[360deg]  "}`}
                src={process.env.PUBLIC_URL + "/iiit_logo.png"}
                alt="IIITL_LOGO"
              />
            </div>

            {/* menu content */}
            <ul className="pt-20  flex-col flex space-evenly ">
              {Menu_Item.map((menu, index) => (
                <>
                  {Open && (
                    <NavLink to={`/${menu.title}`}>
                      <li
                        key={index}
                        className={`text-white flex 
                     text-2xl cursor-pointer hover:bg-emerald-700
                     items-center justify-center
                     hover:rounded-xl pb-5 pt-5 1 duration-300 flex-col  
                     ${!Open ? "scale-0" : ""}
                  `}
                      >
                        {menu.title}
                      </li>
                    </NavLink>
                  )}
                </>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
