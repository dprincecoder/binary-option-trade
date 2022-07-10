import React from "react";
import InputForm from "../../helpers/forms/input/Input";
import ButtonHandler from "../../helpers/forms/button/ButtonHandler";
import Nav from "../header/nav/Nav";
import "./contact.css";

const Contact = () => {
  return (
    <div className="contact">
      <Nav />
      <div className="contact-container">
        <div className="contact-head">
          <h1>You Can Connect With Us</h1>
          <h3>
            We are always live 24/7 to make you comfortable in trading with us
          </h3>
        </div>
        <div className="contact-grid">
          <div className="contact-grid-form-container">
            <div className="contact-grid-form-details">
              <h1>Get in touch</h1>
              <p>
                For account enquiries, complaints and special requests, please
                fill the contact form below and send a message. We are always
                ready to assist you.
              </p>
              <form className="contact-grid-form">
                <div className="contact-inputs">
                  <InputForm label="Name" />
                  <InputForm label="Email" />
                </div>
                <InputForm label="Subject" />
                <div className="contact-form-textarea">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    className="textarea"
                  ></textarea>
                </div>
                <div className="contact-form-btn-handler">
                  <ButtonHandler text="Send message" variant="contained" />
                </div>
              </form>
            </div>
          </div>
          <div className="contact-grid-address">
            <div className="contact-address">
              <h2>Office Address</h2>
              <p>1800 W Hillcrest Dr Newbury Park, California(CA), 91320</p>
            </div>
            <div className="contact-address">
              <h2>Contact Mail</h2>
              <p>
                <a href="mailto:Kelvinwilliam9680@gmail.com" className="mail">
                  Contact@binaryoptionstrading.org
                </a>
              </p>
            </div>
            <div className="contact-address">
              <h2>Website</h2>
              <p>
                <a href="https://www.binaryoptionstrading.org" className="web">
                  binaryoptionstrading.org
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="contact-map">
          <div className="mapouter">
            <div className="gmap_canvas">
              <iframe
                width="600"
                height="500"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=800%20W%20Hillcrest%20Dr%20Newbury%20Park,%20California(CA),%2091320&t=&z=13&ie=UTF8&iwloc=&output=embed"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
