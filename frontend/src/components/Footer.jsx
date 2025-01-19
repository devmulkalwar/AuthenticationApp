import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have the cn utility to merge classes
import { Twitter, Github, Linkedin, Instagram } from "lucide-react"; // Import Lucide icons

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6">
          {/* Twitter */}
          <a
            href="https://x.com/dev_mulkalwar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Twitter className="h-6 w-6" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/devmulkalwar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-6 w-6" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/dev-mulkalwar-b2745a258/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="h-6 w-6" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/dev_mulkalwar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram className="h-6 w-6" />
          </a>
        </div>

        {/* Made with Love and Copyright */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Made with ❤️ &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;