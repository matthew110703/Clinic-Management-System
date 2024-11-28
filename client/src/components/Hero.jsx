import { ArrowRightOutlined, EastOutlined } from "@mui/icons-material";
import { website } from "../meta-data";
import CustomButton from "./buttons/CustomButton";
import CustomLink from "./CustomLink";
import { heroImg1, heroImg2 } from "../assets";

const Hero = () => {
  return (
    <section id="hero">
      {/* Hero Container  */}
      <div
        style={{
          height: 720,
        }}
        className="p-10 my-16 mx-auto w-5/6 bg-white rounded-3xl"
      >
        <div className="lg:flex items-center">
          {/* Hero Text Content */}
          <div className="basis-1/2 flex flex-col gap-y-2 text-start">
            <p className="uppercase text-xs">
              Welcome to clinic management system
            </p>
            <h1 className="text-5xl leading-tight font-bold w-2/3">
              {website.tagLine1}
            </h1>
            <p className="text-lg leading-tight w-5/6">{website.description}</p>

            {/* CTA Actions  */}
            <div className="mt-10 flex gap-x-4 items-center">
              <CustomButton
                label="Get Started"
                color="primary"
                variant="filled"
                endIcon={<EastOutlined />}
                to={"/register"}
              />
              <CustomLink
                to="/#features"
                classes="underline text-xs uppercase"
                icon={<ArrowRightOutlined />}
              >
                Learn More
              </CustomLink>
            </div>
          </div>

          {/* Hero Images */}
          <div
            style={{
              height: 640,
            }}
            className="basis-1/2 w-full relative border-primary border-4 border-opacity-20 rounded-3xl"
          >
            {/* Image One  */}
            <div
              className="absolute z-10 -right-6 top-8 bg-white rounded-3xl border shadow-md shadow-primary"
              style={{
                width: 480,
                height: 320,
              }}
            >
              <img
                src={heroImg2}
                alt="hero image 2"
                className="w-full h-full object-contain rounded-3xl"
              />
            </div>
            {/* Image Two  */}
            <div
              className="absolute z-20 -left-10 bottom-8 bg-white rounded-3xl border shadow-md shadow-primary"
              style={{
                width: 500,
                height: 320,
              }}
            >
              <img
                src={heroImg1}
                alt="hero image 1"
                className="w-full h-full object-contain rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
