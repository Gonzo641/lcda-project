"use client";
import { usePathname } from "next/navigation";

import Footer from "../Footer/Footer";

const ConditionalFooter: React.FC = () => {
  const pathname = usePathname();
  const showFooter = pathname !== "/blueprints";

  return showFooter ? <Footer /> : null;
};

export default ConditionalFooter;
