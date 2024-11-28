import { footerLinks, socialLinks, website } from "../meta-data";
import CustomButton from "./buttons/CustomButton";
import IconButton from "./buttons/IconButton";
import ProfileButton from "./buttons/ProfileButton";
import {
  LocalHospitalOutlined,
  Mail,
  GitHub,
  X,
  LinkedIn,
  Instagram,
} from "@mui/icons-material";
import CustomLink from "./CustomLink";
import { Divider } from "@mui/material";

const Footer = () => {
  return (
    <section id="contact">
      <div className="flex gap-x-10 p-16 mt-16 bg-primary bg-opacity-70">
        {/* Copyrights  */}
        <div className="space-y-2 text-center">
          <ProfileButton
            label="Clinic Portal"
            to="/"
            icon={<LocalHospitalOutlined />}
          />
          <p className="font-semibold text-lg">Copyright © 2024</p>
          <p className="font-light">{website.tagLine2}</p>
        </div>

        <div className="w-full flex flex-col gap-y-4">
          {/* Contact Actions & NavLinks*/}
          <div className="w-full flex justify-around items-center">
            {/* NavLinks  */}
            <div className="basis-4/6 grid grid-cols-3 gap-4">
              {footerLinks.map((link, index) => (
                <CustomLink
                  key={index}
                  to={link.href}
                  classes={"hover:text-white"}
                >
                  {link.label}
                </CustomLink>
              ))}
            </div>
            {/* Contact Actions */}
            <CustomButton
              variant="filled"
              label="Contact Us"
              startIcon={<Mail />}
              size="large"
            />
          </div>
          <Divider variant="middle" />
          {/* Social Media Links */}
          <div className="mr-12 flex justify-end items-center gap-x-3">
            <h5>Follow Us: </h5>
            {socialLinks.map((link, idx) => {
              const Icon = {
                GitHub: GitHub,
                X: X,
                LinkedIn: LinkedIn,
                Instagram: Instagram,
              }[link.label];
              return (
                <IconButton
                  key={idx}
                  href={link.href}
                  color="text"
                  toolTipText={link.label}
                  icon={<Icon />}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
