import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { ContactInfo, FooterCols } from "../utils/constants";
import Logo from "./ui/Logo";
import { FacebookIcon, GithubIcon, InstagramIcon } from "./ui/Icons";

function Footer() {
  return (
    <footer className="pt-10 pb-6">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo and Socials */}
          <div className="space-y-4">
            <Logo className="w-50" />
            <p className="text-sm text-gray-600">
              Protect your skin. Check any spot that feels concerning.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="group"
                aria-label="Facebook Page"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon className="h-5 w-5 text-[#4A90E2] group-hover:text-[#4a7fe2]" />
              </a>
              <a
                href="https://instagram.com"
                className="group"
                aria-label="Instagram Page"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="h-5 w-5 text-[#4A90E2] group-hover:text-[#4a7fe2]" />
              </a>
              <a
                href="https://github.com"
                className="group"
                aria-label="Github Repo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="h-5 w-5 text-[#4A90E2] group-hover:text-[#4a7fe2]" />
              </a>
            </div>
          </div>

          {FooterCols.map((col) => (
            <nav
              aria-labelledby={col.ariaLabel}
              key={col.ariaLabel}
              className="space-y-2"
            >
              <h2
                id={col.ariaLabel}
                className="mb-2 text-lg font-semibold text-gray-900"
              >
                {col.title}
              </h2>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.path}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact Us */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Contact Us</h2>
            <p className="text-gray-600">
              <EnvelopeIcon className="mr-2 inline-block h-5 w-5 text-gray-600" />
              <a
                href={`mailto:${ContactInfo.email}`}
                className="text-sm hover:text-gray-900"
              >
                {ContactInfo.email}
              </a>
            </p>
            <p className="text-gray-600">
              <PhoneIcon className="mr-2 inline-block h-5 w-5 text-gray-600" />
              <a
                href={`tel:+${ContactInfo.phone}`}
                className="text-sm hover:text-gray-900"
              >
                {ContactInfo.phone}
              </a>
            </p>
            <address className="not-italic">
              <span className="flex items-start">
                <MapPinIcon className="mr-2 inline-block h-7 w-7 text-gray-600" />
                <p className="inline text-sm text-gray-600">
                  {ContactInfo.address}
                </p>
              </span>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
