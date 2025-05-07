import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
    const year = new Date().getFullYear();
  
    return (
      <footer className="bg-zinc-700 text-center text-sm py-6 px-4 text-gray-200 border-t border-gray-700 mt-16">
        <div className="flex flex-col items-center space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-2 tracking-wide">
            © {year}{" "}
            <a
              href="https://andris811.github.io/avdev/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition duration-300 ease-in-out hover:scale-105 text-gray-200"
            >
              AV Dev
            </a>{" "}
            |{" "}
            <a
              href="https://github.com/andris811"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white mx-1"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" className="grayscale" />
            </a>
            <a
              href="https://www.linkedin.com/in/andrasv89/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white mx-1"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" className="grayscale" />
            </a>
          </div>
          <p className="leading-relaxed text-center">
            Designed & Developed with ❤️ by Andras Varga
          </p>
        </div>
      </footer>
    );
  };
  

export default Footer;
