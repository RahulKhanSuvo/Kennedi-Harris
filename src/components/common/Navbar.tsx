import * as React from "react";
import { useState } from "react";
import { Menu, ChevronRight, LogOut } from "lucide-react";
import { Link, NavLink } from "react-router";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

export interface UserProfile {
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
}

export interface NavbarProps {
  className?: string;
  logo?: React.ReactNode;
  logoUrl?: string;
  menu?: MenuItem[];
  user?: UserProfile | null;
  userDropdownMenu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
  onLogout?: () => void | Promise<void>;
  isLogoutLoading?: boolean;
  themeToggle?: React.ReactNode;
  renderUserMenu?: (user: UserProfile) => React.ReactNode;
}

const Navbar = ({
  logoUrl = "/",
  logo,
  menu = [],
  user = null,
  userDropdownMenu = [],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
  onLogout,
  isLogoutLoading = false,
  themeToggle,
  renderUserMenu,
  className,
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const userImage = user?.avatar;
  const userInitial = user?.name?.[0]?.toUpperCase() || "U";

  // Mobile drawer trigger callback
  const handleMobileNavClick = () => setIsOpen(false);

  const defaultRenderUserMenu = (userProfile: UserProfile) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative size-10 rounded-full border border-border shadow-sm hover:bg-muted p-0"
          >
            <Avatar className="size-full">
              <AvatarImage src={userImage} alt={userProfile.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                {userInitial}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold leading-none">
                {userProfile.name}
              </p>
              {userProfile.email && (
                <p className="text-xs leading-none text-muted-foreground">
                  {userProfile.email}
                </p>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {userDropdownMenu.map((item) => (
            <DropdownMenuItem key={item.title} asChild>
              <Link
                to={item.url}
                className="flex items-center w-full gap-2 cursor-pointer"
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </DropdownMenuItem>
          ))}
          {onLogout && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onLogout}
                disabled={isLogoutLoading}
                className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 cursor-pointer flex items-center gap-2"
              >
                <LogOut className="size-4" />
                <span>{isLogoutLoading ? "Logging out..." : "Log out"}</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <section
      className={cn(
        "py-4 bg-white dark:bg-slate-950 shadow-sm border-b border-border",
        className,
      )}
    >
      <div className="max-w-[1905px] mx-auto px-4 lg:px-10">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Logo container */}
          <div className="flex-1 flex items-center">
            <Link to={logoUrl} className="flex items-center gap-2">
              {logo}
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center justify-center flex-1">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Action Area */}
          <div className="flex justify-end flex-1 items-center gap-2.5">
            {themeToggle && <div>{themeToggle}</div>}
            {!user ? (
              <>
                <Button
                  className="rounded-lg h-10 px-5"
                  asChild
                  variant="outline"
                  size="sm"
                >
                  <Link to={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button className="rounded-lg h-10 px-5" asChild size="sm">
                  <Link to={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                {renderUserMenu
                  ? renderUserMenu(user)
                  : defaultRenderUserMenu(user)}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={logoUrl} className="flex items-center gap-2">
              {logo}
            </Link>

            <div className="flex items-center gap-2">
              {themeToggle && themeToggle}
              {user && (
                <Link to={logoUrl}>
                  <Avatar className="size-9 border border-border">
                    <AvatarImage src={userImage} alt={user?.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              )}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="size-9">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] sm:w-[350px] p-0 flex flex-col"
                >
                  <SheetHeader className="p-6 border-b text-left border-border">
                    <SheetTitle className="flex items-center justify-between font-bold">
                      <Link to={logoUrl} onClick={handleMobileNavClick}>
                        {logo}
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto">
                    {/* User Profile Section at Top (if logged in) */}
                    {user && (
                      <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-b border-border">
                        <div className="flex items-center gap-4">
                          <Avatar className="size-12 border border-border shadow-sm">
                            <AvatarImage src={userImage} alt={user?.name} />
                            <AvatarFallback className="bg-primary text-white font-bold">
                              {userInitial}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col min-w-0">
                            <p className="text-base font-bold text-slate-900 dark:text-white truncate">
                              {user.name}
                            </p>
                            {user.email && (
                              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                {user.email}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="p-4 flex flex-col gap-8">
                      {/* Unified Navigation links */}
                      <div className="flex flex-col gap-4">
                        <Accordion
                          type="single"
                          collapsible
                          className="flex w-full flex-col gap-4"
                        >
                          {menu.map((item) =>
                            renderMobileMenuItem(item, handleMobileNavClick),
                          )}
                        </Accordion>

                        {/* User Specific links (if logged in) */}
                        {user && userDropdownMenu.length > 0 && (
                          <div className="flex flex-col gap-4 pt-4 border-t border-border">
                            {userDropdownMenu.map((item) => (
                              <NavLink
                                key={item.url}
                                to={item.url}
                                onClick={handleMobileNavClick}
                                className={({ isActive }) =>
                                  cn(
                                    "text-md font-bold transition-colors hover:text-primary flex items-center gap-2",
                                    isActive
                                      ? "text-primary"
                                      : "text-slate-900 dark:text-white",
                                  )
                                }
                              >
                                {item.icon}
                                <span>{item.title}</span>
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Auth Buttons (if not logged in) */}
                      {!user && (
                        <div className="flex flex-col gap-3 pt-4 border-t border-border">
                          <Button
                            asChild
                            variant="outline"
                            className="w-full justify-center h-11"
                            onClick={handleMobileNavClick}
                          >
                            <Link to={auth.login.url}>{auth.login.title}</Link>
                          </Button>
                          <Button
                            asChild
                            className="w-full justify-center h-11"
                            onClick={handleMobileNavClick}
                          >
                            <Link to={auth.signup.url}>
                              {auth.signup.title}
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Action (Logout) */}
                  {user && onLogout && (
                    <div className="p-4 mt-auto border-t border-border">
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 px-3 h-12 rounded-xl transition-colors"
                        onClick={async () => {
                          await onLogout();
                          handleMobileNavClick();
                        }}
                        disabled={isLogoutLoading}
                      >
                        <div className="size-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                          <LogOut className="size-4" />
                        </div>
                        <span className="font-bold text-sm">
                          {isLogoutLoading ? "Logging out..." : "Log out"}
                        </span>
                      </Button>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="text-sm font-bold uppercase hover:text-primary transition-colors bg-transparent">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="p-4 bg-popover text-popover-foreground min-w-[350px] rounded-lg shadow-xl border border-border">
          <div className="grid grid-cols-1 gap-1">
            {item.items.map((subItem) => (
              <SubMenuLink key={subItem.title} item={subItem} />
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavLink
        to={item.url}
        className={({ isActive }) =>
          cn(
            "group inline-flex h-10 w-max items-center justify-center rounded-md uppercase px-4 py-2 text-sm font-bold transition-colors hover:text-primary",
            isActive ? "text-primary" : "text-slate-600 dark:text-slate-300",
          )
        }
      >
        {item.title}
      </NavLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem, onItemClick?: () => void) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-sm py-2 font-bold hover:no-underline uppercase text-slate-900 dark:text-white">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 flex flex-col gap-1 pl-2 border-l-2 border-slate-100 dark:border-slate-800 ml-1">
          {item.items.map((subItem) => (
            <NavLink
              key={subItem.title}
              to={subItem.url}
              onClick={onItemClick}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 p-2 rounded-md transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900",
                )
              }
            >
              {subItem.icon && <div className="shrink-0">{subItem.icon}</div>}
              <span className="text-sm">{subItem.title}</span>
            </NavLink>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <NavLink
      key={item.title}
      to={item.url}
      onClick={onItemClick}
      className={({ isActive }) =>
        cn(
          "text-md font-bold transition-colors hover:text-primary py-2 block",
          isActive ? "text-primary" : "text-slate-900 dark:text-white",
        )
      }
    >
      {item.title}
    </NavLink>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <NavLink
      to={item.url}
      className={({ isActive }) =>
        cn(
          "group flex w-full items-start gap-4 rounded-lg p-3 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-100 dark:hover:border-slate-800",
          isActive &&
            "bg-slate-50 dark:bg-slate-900 text-primary border-slate-100 dark:border-slate-800",
        )
      }
    >
      {item.icon && (
        <div className="flex size-10 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 transition-colors group-hover:bg-white dark:group-hover:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-800">
          {item.icon}
        </div>
      )}
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold leading-none text-slate-900 dark:text-slate-100">
            {item.title}
          </p>
          <ChevronRight className="size-4 text-slate-400 opacity-0 transition-all -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
        </div>
        {item.description && (
          <p className="text-xs leading-snug text-slate-500 dark:text-slate-400 line-clamp-1">
            {item.description}
          </p>
        )}
      </div>
    </NavLink>
  );
};

export { Navbar };
