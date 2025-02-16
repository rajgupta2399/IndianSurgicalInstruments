"use client";
import { useState } from "react";
import {
  Code2,
  ChevronDown,
  Menu,
  X,
  Zap,
  Heart,
  BookOpen,
  FileText,
  CodeSquare,
  PenTool,
  Grid,
  Users,
  Shield,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white shadow-sm">
      <nav className="mx-auto h-16 max-w-7xl px-4">
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 text-gray-900 transition-colors hover:text-blue-600"
          >
            <Code2 className="h-6 w-6" />
            <span className="text-lg font-semibold">CodeBox</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="rounded-md p-2 hover:bg-gray-100 lg:hidden"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Navigation Links */}
          <div
            className={`fixed inset-x-0 top-16 bg-white transition-all duration-300 ease-in-out lg:static lg:flex lg:items-center lg:gap-8 lg:bg-transparent ${isMenuOpen ? "block" : "hidden"} h-[calc(100vh-4rem)] overflow-auto border-t border-gray-100 lg:h-auto lg:overflow-visible lg:border-t-0`}
          >
            <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
              <li>
                <a href="#" className="nav-link">
                  Home
                </a>
              </li>

              {/* Discover Dropdown */}
              <li className="group relative">
                <button
                  onClick={() => toggleDropdown("discover")}
                  className="nav-link flex w-full items-center justify-between lg:w-auto"
                >
                  Discover
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === "discover" ? "rotate-180" : ""} lg:group-hover:rotate-180`}
                  />
                </button>

                <div
                  className={`dropdown-container ${activeDropdown === "discover" ? "block" : "hidden lg:group-hover:block"} `}
                >
                  <div className="dropdown-content">
                    <DropdownGroup
                      icon={<Zap className="h-6 w-6" />}
                      title="Most viewed courses"
                      links={[
                        { href: "#", label: "HTML for beginners" },
                        { href: "#", label: "Advanced CSS" },
                        { href: "#", label: "JavaScript OOP" },
                      ]}
                    />
                    <DropdownGroup
                      icon={<Heart className="h-6 w-6" />}
                      title="Popular courses"
                      links={[
                        { href: "#", label: "Development with Flutter" },
                        { href: "#", label: "Web development with React" },
                        { href: "#", label: "Backend development expert" },
                      ]}
                    />
                    <DropdownGroup
                      icon={<BookOpen className="h-6 w-6" />}
                      title="Careers"
                      links={[
                        { href: "#", label: "Web development" },
                        { href: "#", label: "Applications development" },
                        { href: "#", label: "UI/UX design" },
                      ]}
                    />
                    <DropdownGroup
                      icon={<FileText className="h-6 w-6" />}
                      title="Certifications"
                      links={[
                        { href: "#", label: "Course certificates" },
                        { href: "#", label: "Free certifications" },
                      ]}
                    />
                  </div>
                </div>
              </li>

              {/* Resources Dropdown */}
              <li className="group relative">
                <button
                  onClick={() => toggleDropdown("resources")}
                  className="nav-link flex w-full items-center justify-between lg:w-auto"
                >
                  Resources
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === "resources" ? "rotate-180" : ""} lg:group-hover:rotate-180`}
                  />
                </button>

                <div
                  className={`dropdown-container ${activeDropdown === "resources" ? "block" : "hidden lg:group-hover:block"} `}
                >
                  <div className="dropdown-content">
                    <DropdownGroup
                      icon={<CodeSquare className="h-6 w-6" />}
                      title="Web templates"
                      links={[
                        { href: "#", label: "Free templates" },
                        { href: "#", label: "Premium templates" },
                      ]}
                    />
                    <DropdownGroup
                      icon={<PenTool className="h-6 w-6" />}
                      title="Designs"
                      links={[
                        { href: "#", label: "Web designs" },
                        { href: "#", label: "App designs" },
                        { href: "#", label: "Component design" },
                      ]}
                    />
                    <DropdownGroup
                      icon={<Grid className="h-6 w-6" />}
                      title="Others"
                      links={[
                        { href: "#", label: "Recent blogs" },
                        { href: "#", label: "Tutorial videos" },
                        { href: "#", label: "Webinar" },
                      ]}
                    />
                  </div>
                </div>
              </li>

              <li>
                <a href="#" className="nav-link">
                  Pricing
                </a>
              </li>

              {/* Company Dropdown */}
              <li className="group relative">
                <button
                  onClick={() => toggleDropdown("company")}
                  className="nav-link flex w-full items-center justify-between lg:w-auto"
                >
                  Company
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === "company" ? "rotate-180" : ""} lg:group-hover:rotate-180`}
                  />
                </button>

                <div
                  className={`dropdown-container ${activeDropdown === "company" ? "block" : "hidden lg:group-hover:block"} `}
                >
                  <div className="dropdown-content">
                    <DropdownGroup
                      icon={<Users className="h-6 w-6" />}
                      title="About us"
                      links={[
                        { href: "#", label: "About us" },
                        { href: "#", label: "Support" },
                        { href: "#", label: "Contact us" },
                      ]}
                    />
                    <DropdownGroup
                      icon={<Shield className="h-6 w-6" />}
                      title="Safety and quality"
                      links={[
                        { href: "#", label: "Cookie settings" },
                        { href: "#", label: "Privacy Policy" },
                      ]}
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

interface DropdownGroupProps {
  icon: React.ReactNode;
  title: string;
  links: Array<{ href: string; label: string }>;
}

const DropdownGroup = ({ icon, title, links }: DropdownGroupProps) => (
  <div className="rounded-lg p-4 transition-colors duration-200 hover:bg-gray-50">
    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
      <div className="text-blue-600">{icon}</div>
    </div>
    <h3 className="mb-2 text-sm font-semibold text-gray-900">{title}</h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className="block text-sm text-gray-600 transition-colors hover:text-blue-600"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Header;
