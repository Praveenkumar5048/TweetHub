"use client";

import { usePathname} from 'next/navigation'
import Sidenav from "@/components/navigation/Sidenav";
import Suggestions from "@/components/timeline/Suggestions/Follwers.js";
import Trending from "@/components/timeline/Suggestions/Trending.js";

export default function ClientLayout({ children }) {
   
    const pathname = usePathname();
    
    // Define routes that should not use the default layout
    const noLayoutRoutes = ["/", "/auth/login", "/auth/register"];
    const isNoLayoutRoute = noLayoutRoutes.includes(pathname);
    
    return (
      <div className={isNoLayoutRoute ? '' : 'flex h-screen'}>
        {isNoLayoutRoute ? (
          <div>{children}</div>
        ) : (
          <>
            <div className="flex-none w-1/5 bg-cyan-300">
              <Sidenav />
            </div>
            <div className="flex-grow overflow-auto">
              {children}
            </div>
            <div className="flex-none w-1/4 bg-cyan-300 p-4 overflow-y-auto custom-scrollbar">
              <div className="mb-4">
                <Suggestions />
              </div>
              <div>
                <Trending />
              </div>
            </div>
          </>
        )}
      </div>
    );
}