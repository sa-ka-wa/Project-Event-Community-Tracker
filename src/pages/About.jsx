import React from "react";
import './About.css';  // Import the CSS file

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to EventEase! EventEase was created with a simple vision: to connect people through local community events. We believe that every neighborhood is full of inspiring, exciting, and meaningful gatherings, from art exhibitions and music festivals to volunteer drives and networking meetups. Our platform makes it easy to discover, track, and participate in the events that bring communities together.
      </p>
      <p>
        Whether you are looking for something new to experience, a place to meet like-minded people, or an opportunity to give back, EventEase is here to make it effortless. We are passionate about fostering inclusivity, creativity, and positive impact, one event at a time.
      </p>
      <p>
        Thank you for being a part of our journey. Let's build stronger communities, together.
      </p>

      <hr />

      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>If you have any questions, feel free to reach out!</p>
        <ul className="contact-list">
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:communitybuddy3@gmail.com">
              communitybuddy3@gmail.com
            </a>
          </li>
          <li><strong>Phone:</strong> 0740766915</li>
          <li><strong>Address:</strong> Nairobi, Kenya</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
