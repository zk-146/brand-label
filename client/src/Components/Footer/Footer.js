import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__wrapper">
          <div className="footer__column">
            <p className="header header-footer">ABOUT</p>
            <Link to="/contact-us" className="link link-footer">
              <p>Contact Us</p>
            </Link>
            <Link to="/about-us" className="link link-footer">
              <p>About Us</p>
            </Link>
            <Link to="/terms-of-service" className="link link-footer">
              <p>Terms of Service</p>
            </Link>
          </div>
          <div className="footer__column">
            <p className="header header-footer">OUR POLICY</p>
            <Link to="/privacy-policy" className="link link-footer">
              <p>Privacy Policy</p>
            </Link>
            <Link to="/refund-policy" className="link link-footer">
              <p>Refund Policy</p>
            </Link>
            <Link to="/shipping-policy" className="link link-footer">
              <p>Shipping Policy</p>
            </Link>
          </div>
          <div className="footer__column">
            <p className="header header-footer">GET IN TOUCH</p>
            <a
              className="link link-footer"
              href={"mailto:khanzaid1015@gmail.com"}
            >
              khanzaid1015@gmail.com
            </a>
            <a className="link link-footer" href={"tel: +917718964516"}>
              +917718964516
            </a>
          </div>
        </div>
        <div className="footer__social">
          <a
            className="link link-footer"
            target="_blank"
            rel="noreferrer"
            href="https://facebook.com"
          >
            <FacebookIcon style={{ color: "#979797" }} />
          </a>
          <a
            className="link link-footer"
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/brandlabel_/"
          >
            <InstagramIcon style={{ color: "#979797" }} />
          </a>
          <a
            className="link link-footer"
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com"
          >
            <TwitterIcon style={{ color: "#979797" }} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
