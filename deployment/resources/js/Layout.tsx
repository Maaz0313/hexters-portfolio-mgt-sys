import { useState } from "react";
import DesktopHeader from "./components/DesktopHeader";
import MobileHeader from "./components/MobileHeader";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const toggleSearch = (force?: boolean) => {
    setIsSearchVisible((prev) => (force !== undefined ? force : !prev));
  };

  return (
    <div className="relative">
      <DesktopHeader toggleSearch={toggleSearch} />
      <MobileHeader toggleSearch={toggleSearch} />
      <SearchBar isVisible={isSearchVisible} toggleSearch={toggleSearch} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
