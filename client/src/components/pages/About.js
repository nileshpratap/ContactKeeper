import React from "react";

const About = () => {
  return (
    <div className="about">
      <h1 className="fas">About this App</h1>
      <p className="my-1 container">
        Introducing Coult: Your Ultimate Contact Management App!
        <p>
          Stay connected like never before with Coult, the secure web app
          designed exclusively for you. Seamlessly organize and maintain your
          contacts in style.{" "}
          <b>
            <mark>
              {" "}
              Coult goes beyond the ordinary, allowing you to showcase the true
              essence of your connections with profile images or captivating GIF
              files.
            </mark>
          </b>
        </p>
        <p>
          Unleash your creativity and express your unique personality with every
          contact you add. Whether it's your squad of friends, a network of
          professional colleagues, or that special someone who makes your heart
          skip a beat, Coult lets you capture the essence of your relationships
          like never before.
        </p>
        <p>
          With Coult, every interaction becomes an opportunity for
          self-expression. Add a profile image that truly reflects who you are,
          or{" "}
          <b>
            <mark>
              go one step further and enchant your contacts with animated GIFs
              that bring your conversations to life.
            </mark>
          </b>
        </p>
        <p>
          And the Best part? Coult is completely free! We believe that staying
          connected shouldn't cost a dime. Experience the power to create, read,
          update, delete, and filter your contacts effortlessly, all at your
          fingertips. Coult empowers you to manage your relationships with ease,
          making sure you never miss a beat.
        </p>
        <p>
          Say goodbye to boring address books and welcome the era of dynamic and
          engaging connections. Join Coult today and redefine the way you stay
          in touch. It's time to make your contacts truly unforgettable,
          transforming your digital Rolodex into a captivating gallery of
          memories and meaningful connections. Download Coult now and let the
          world know who you are!
        </p>
      </p>
      <div className="footer">Made with ⚡ by Nilesh Pratapwar</div>
      <p className="bg-dark footer">
        <strong>Version </strong>1.1.0
      </p>
    </div>
  );
};

export default About;
