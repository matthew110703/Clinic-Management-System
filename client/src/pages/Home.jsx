import { Divider } from "@mui/material";
import { Footer, Header, Hero } from "../components";
import { FeatureCard } from "../components";
import { about, features, highlights } from "../meta-data";
import { aboutImg, medicalSymbol } from "../assets";
import { LocalHospitalOutlined } from "@mui/icons-material";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Divider variant="middle" />
      {/* Key Features */}
      <section id="features">
        <div className="w-3/4 mx-auto my-16 p-10 bg-primary bg-opacity-80 rounded-3xl">
          <h2 className="font-semibold text-4xl text-white text-center drop-shadow-sm">
            Key Features
          </h2>
          <div className="p-6 mt-4 flex gap-12 justify-center">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                variant="normal"
                classes={`${index % 2 !== 0 && "hidden"}`}
              />
            ))}
          </div>
          <div className="mt-6 flex gap-14 justify-center">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                variant="normal"
                classes={`${index % 2 === 0 && "hidden"}`}
              />
            ))}
          </div>
        </div>
      </section>
      <Divider variant="middle" />
      {/* Why choose our system? (highlights) */}
      <section id="highlights">
        <div className="relative w-5/6 mx-auto rounded-3xl p-32 my-16 bg-primary bg-opacity-60 flex flex-col gap-16 justify-between shadow-xl">
          {/* Hospital Symbol (icon)  */}
          <LocalHospitalOutlined
            className="absolute z-0 text-primary border-4 border-white rounded-lg p-4 shadow-xl"
            sx={{ fontSize: 120, top: "15%", left: "46%" }}
          />
          {/* Medical Symbol (image) */}
          <img
            src={medicalSymbol}
            alt="medical-symbol"
            className="absolute z-0 w-80 object-contain"
            style={{ top: "50%", right: "40%" }}
          />
          <div className="flex justify-between">
            {highlights.map(
              (highlight, index) =>
                index < 2 && (
                  <FeatureCard
                    key={index}
                    title={highlight.title}
                    description={highlight.description}
                    variant="pill"
                  />
                )
            )}
          </div>
          <span className="relatiive z-10 text-center tracking-widest uppercase drop-shadow-2xl text-white font-bold text-4xl">
            Why Choose Our System?
          </span>
          <div className="flex justify-between">
            {highlights.map(
              (highlight, index) =>
                index >= 2 && (
                  <FeatureCard
                    key={index}
                    title={highlight.title}
                    description={highlight.description}
                    variant="pill"
                  />
                )
            )}
          </div>
        </div>
      </section>
      <Divider variant="middle" />
      <section id="about">
        <div className="my-16 p-8 w-4/5 mx-auto flex items-center gap-10 bg-white rounded-3xl">
          <img
            src={aboutImg}
            alt="about-us"
            className="rounded-3xl object-contain w-3/5"
          />
          <div className="flex flex-col gap-6 px-5 text-lg">
            <h3 className="font-semibold text-3xl text-center">About Us</h3>
            <p className="leading-relaxed ">{about.p1}</p>
            <p className="leading-relaxed">{about.p2}</p>
          </div>
        </div>
      </section>
      <Divider variant="middle" />
      <Footer />
    </>
  );
};

export default Home;
