import { Link } from "react-router-dom";
import "./hero.css";

function Hero() {
  return (
    <section className="container">
      <div className="hero_container">
        <div className="hero_content">
          <h1>Challenge Your Mind, Conquer The Quest</h1>
          <p>
            Step into the world of QuizQuest where every question is an
            opportunity to challenge your intellect and broaden your horizons.
          </p>
          <p>
            Our platform transforms learning into an exhilarating adventure,
            where each quiz is a quest to conquer.
          </p>
          <Link to="/signIn">
            <button className="btn">Sign In</button>
          </Link>
          <Link to="/signUp">
            <button className="btn">Sign Up</button>
          </Link>
        </div>
        <div className="hero_img">
          <img src="/images/hero.jpg" alt="hero_img" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
