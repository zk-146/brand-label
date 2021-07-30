import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="aboutUs">
      <div className="aboutUs__container">
        <h1 className="pageHeader header">About Us</h1>
        <hr />
        <div className="aboutUs__content">
          <p className="aboutUs__para">
            {" "}
            Welcome to Brandlabel, Our number one source for all Mobile
            Accessories. We're dedicated to providing you the very best of
            Mobile Accessories. Founded in 2020 by <b>Faiz Shaikh</b>,
            Brandlabel has come a long way from its beginnings in,{" "}
            <b>
              Diamond Apartment, Jasmine Mill Road, Mahim(East), Dharavi,
              Mumbai, Maharashtra 400017
            </b>
            .
          </p>
          <p className="aboutUs__para">
            When Faiz Shaikh first started, his passion for Online Business
            drove them to start their own business. We hope you enjoy our
            products as much as we enjoy offering them to you. If you have any
            questions or comments, please don't hesitate to contact us.
          </p>{" "}
          <p className="aboutUs__para">Sincerely,</p>
          <p className="aboutUs__para"> [Faiz Shaikh]</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
