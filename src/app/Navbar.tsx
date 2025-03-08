import * as React from "react";
import {
  Home,
  User,
  LayoutGrid,
  ShoppingCart,
  CodesandboxIcon,
} from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Logo from "../assets/logo1.png";
import { Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import whatsapp from "../assets/whatsapp.png";
import ProfileIcon from "@/components/_components/ProfileIcon";
// import { MoonIcon } from "@/components/_components/Icons/MoonIcon";
import { SunIcon } from "@/components/_components/Icons/SunIcon";
import { getCart } from "@/wix-api/cart";
import BabyCare from "../assets/babyCare.png";
import CriticalCare from "../assets/criticalCare.png";
import DigitalInstrument from "../assets/digitalInstrument.png";
import GauzeProducts from "../assets/gauzeProduct.png";
import HomePersonal from "../assets/homeAndPersonal.png";
import HomePatient from "../assets/home-patient-care.png";
import LabortoryProducts from "../assets/laboratory-products.png";
import OrthoProducts from "../assets/ortho.png";
// import Pediatric from "../assets/pediatric.png";
import Surgical from "../assets/surgical.png";
import SurgicalSutures from "../assets/surgical-sutures.png";
import SyringeNeedles from "../assets/syringe.png";
import Urology from "../assets/urology.png";

interface ComponentItem {
  title: string;
  href: string;
  description?: string;
  icon: string | StaticImageData; // Correct TypeScript type for JSX Elements
}

export default async function Header() {
  const components: ComponentItem[] = [
    {
      title: "Baby Care",
      href: "/baby-care",
      icon: BabyCare, // Use the imported image URL
    },
    {
      title: "Critical Care",
      href: "/docs/primitives/hover-card",
      icon: CriticalCare, // Use the imported image URL
    },
    {
      title: "Digital Instruments",
      href: "/docs/primitives/progress",
      icon: DigitalInstrument, // Use the imported image URL
    },
    {
      title: "Gauze Products",
      href: "/docs/primitives/progress",
      icon: GauzeProducts, // Use the imported image URL
    },
    {
      title: "Home and Personal Protection",
      href: "/docs/primitives/progress",
      icon: HomePersonal, // Use the imported image URL
    },
    {
      title: "Home Patient care",
      href: "/docs/primitives/progress",
      icon: HomePatient, // Use the imported image URL
    },
    {
      title: "Laboratory Products",
      href: "/docs/primitives/progress",
      icon: LabortoryProducts, // Use the imported image URL
    },
    {
      title: "Orthopaedic Supplies",
      href: "/docs/primitives/progress",
      icon: OrthoProducts, // Use the imported image URL
    },
    // {
    //   title: "Pediatrician",
    //   href: "/docs/primitives/progress",
    //   icon: Pediatric, // Use the imported image URL
    // },
    {
      title: "Surgical",
      href: "/docs/primitives/progress",
      icon: Surgical, // Use the imported image URL
    },
    {
      title: "Surgical Sutures",
      href: "/docs/primitives/progress",
      icon: SurgicalSutures, // Use the imported image URL
    },
    {
      title: "Syringe & Needles",
      href: "/docs/primitives/progress",
      icon: SyringeNeedles, // Use the imported image URL
    },
    {
      title: "Urology",
      href: "/docs/primitives/progress",
      icon: Urology, // Use the imported image URL
    },
  ];

  const brands: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ];

  const cart = await getCart();
  const totalQuantity =
    cart?.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;

  return (
    <>
      {/* Top Navbar for Large Screens */}
      <header className="fixed left-0 top-0 z-50 hidden w-full bg-white shadow-lg lg:block">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-10 py-6">
          {/* Left Side - Logo & Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 text-gray-900">
              <Image width={125} height={100} src={Logo} alt="logo" />
            </a>

            {/* Navigation Links */}
            <ul className="flex gap-0">
              <li>
                <Link
                  href="#"
                  className="nav-link flex items-center gap-1 align-middle"
                >
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>
                          <Link
                            href={""}
                            className="flex items-center gap-1 align-middle"
                          >
                            <LayoutGrid className="h-4 w-4" />
                            <span className="text-sm font-semibold uppercase">
                              Browse Categories
                            </span>
                          </Link>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-4 p-4 md:w-[500px] md:grid-cols-4 lg:w-[850px]">
                            {components.map((component) => (
                              <Link
                                key={component.title}
                                title={component.title}
                                href={component.href}
                                className="flex flex-col items-center justify-center gap-2"
                              >
                                <div className="flex flex-col items-center justify-center gap-2">
                                  <Image
                                    src={component.icon}
                                    alt={component.title}
                                    className="h-16 w-16 object-cover" // Larger image size
                                  />
                                  <span className="text-center text-sm pb-2 font-semibold transition-colors duration-300 ease-in-out hover:text-blue-500">
                                    {component.title}
                                  </span>
                                  {/* Title below the image */}
                                </div>
                              </Link>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="nav-link flex items-center gap-1 align-middle"
                >
                  {/* <LayoutGrid className="h-4 w-4" />
                  <span className="text-sm font-semibold uppercase">
                    Browse Categories
                  </span> */}
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>
                          <Link
                            href={""}
                            className="flex items-center gap-1 align-middle"
                          >
                            <CodesandboxIcon className="h-4 w-4" />
                            <span className="text-sm font-semibold uppercase">
                              Popular Brands
                            </span>
                          </Link>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[700px]">
                            {brands.map((component) => (
                              <ListItem
                                key={component.title}
                                title={component.title}
                                href={component.href}
                              >
                                {component.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </Link>
              </li>
            </ul>
          </div>

          {/* Center - Search Bar */}
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search for products, brands..."
              className="w-full rounded-full border border-gray-300 px-5 py-2 pl-12 text-sm shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>

          {/* Right Side - Icons */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <a href="#" className="flex flex-col items-center text-gray-700">
                <ShoppingCart className="h-6 w-8" />
              </a>
              {/* Badge for Cart Quantity */}
              {totalQuantity > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  {totalQuantity}
                </span>
              )}
            </div>
            <ProfileIcon />
            {/* <a href="#" className="">
              <Image src={whatsapp} alt="whatsapp" width={35} height={50} />
            </a> */}
            <div className="flex w-6">
              <SunIcon className="" />
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation (Logo + Menu Button) */}
      <header className="fixed left-0 top-0 z-50 w-full bg-slate-50 shadow-lg lg:hidden">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 text-gray-900">
            <Image width={100} height={100} src={Logo} alt="logo" />
          </a>
          <div className="flex items-center gap-3 align-middle">
            <a href="#" className="">
              <Image src={whatsapp} alt="whatsapp" width={28} height={50} />
            </a>

            <a href="#" className="flex flex-col items-center text-gray-700">
              <ShoppingCart className="h-6 w-8" />
            </a>
          </div>
        </nav>
      </header>

      {/* Bottom Navigation Bar for Mobile */}
      <nav className="fixed bottom-0 left-0 z-50 w-full bg-slate-50 shadow-lg lg:hidden">
        <ul className="flex justify-around py-3">
          <li>
            <a href="#" className="flex flex-col items-center text-gray-700">
              <Home className="h-5 w-5" />
              <span className="text-xs font-semibold">Home</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex flex-col items-center text-gray-700">
              <LayoutGrid className="h-5 w-5" />
              <span className="text-xs font-semibold">Categories</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex flex-col items-center text-gray-700">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-xs font-semibold">Cart</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex flex-col items-center text-gray-700">
              <User className="h-5 w-5" />
              <span className="text-xs font-semibold">Profile</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
