import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import "./Nav.css";

function Nav() {
  const [open, setOpen] = useState(false);

  const openNav = () => setOpen(!open);

  const menuRef = useRef();

  const width = window.innerWidth;

  //CLickOutside the sidebar to close
  //   useEffect(() => {
  //     document.addEventListener("mousedown", (event) => {
  //       if (!menuRef.current.contains(event.target)) {
  //         setOpen(false);
  //       }
  //     });
  //   }, [open]);
  if (width > "768") {
    return null;
  }

  return (
    <div className="nav">
      <Link to="#" className="toggle-button">
        <FaIcons.FaBars onClick={openNav} />
      </Link>

      {/*The x button if you want to use */}
      {/* <Link to='#'className= 'toggle-close' >
                       <AiIcons.AiOutlineClose onClick={()=>setOpen(false)}/>
                   </Link>
           */}

      <div className="nav-title">Brand Label</div>

      <nav className={open ? "nav-items active" : "nav-items"} ref={menuRef}>
        <ul className="nav-items-list">
          <li>
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/mobileCovers" onClick={() => setOpen(false)}>
              Mobile Covers
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/airpodCovers" onClick={() => setOpen(false)}>
              Airpod Covers
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/smartwatches" onClick={() => setOpen(false)}>
              Smart Watches
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/temperedGlasses" onClick={() => setOpen(false)}>
              Tempered Glasses
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/account" onClick={() => setOpen(false)}>
              Account
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/Wishlist" onClick={() => setOpen(false)}>
              Wishlist
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/Cart" onClick={() => setOpen(false)}>
              Cart
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
