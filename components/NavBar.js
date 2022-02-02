import { memo } from "react";
import ActiveLink from "./ActiveLink";

const NavBar = () => (
  <nav className="bg-gray-800">
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="sm:block sm:ml-6">
            <div className="flex space-x-4">
              <ActiveLink
                href="/"
                className="text-white px-3 py-2 rounded-md text-sm font-medium"
                activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Payments Dashboard
              </ActiveLink>

              <ActiveLink
                href="/users"
                className="text-white px-3 py-2 rounded-md text-sm font-medium"
                activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Users
              </ActiveLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default memo(NavBar);
