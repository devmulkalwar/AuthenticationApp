import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have the cn utility to merge classes
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa"; // Importing React Icons

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground border-t py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-8">
          {/* Twitter */}
          <a
            href="https://x.com/dev_mulkalwar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transform hover:scale-110 transition-all"
          >
            <FaTwitter className="h-8 w-8" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/devmulkalwar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transform hover:scale-110 transition-all"
          >
            <FaGithub className="h-8 w-8" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/dev-mulkalwar-b2745a258/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transform hover:scale-110 transition-all"
          >
            <FaLinkedin className="h-8 w-8" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/dev_mulkalwar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transform hover:scale-110 transition-all"
          >
            <FaInstagram className="h-8 w-8" />
          </a>
        </div>

        {/* Made with Love and Copyright */}
        <div className="mt-6 text-center text-sm text-muted-foreground opacity-80">
          <p>Made with ❤️ &copy; {new Date().getFullYear()} LinkWeb. All rights reserved.</p>
          <p className="opacity-70">
            Designed and developed with care.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
