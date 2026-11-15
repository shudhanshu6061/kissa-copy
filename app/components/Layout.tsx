import type { ReactNode } from "react";
import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

export interface LayoutProps {
    children?: ReactNode;
    cartCount?: number;
}

export function Layout({ children, cartCount = 1 }: LayoutProps) {
    return (
        <div className="kissa-page-wrapper" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Atmospheric painted wash background */}
            <div className="kissa-wash" />

            {/* Shared Header with Announcement Marquee, Frosted Navbar & Mobile Drawer */}
            <Header cartCount={cartCount} />

            {/* Main Content Area */}
            <main style={{ flex: 1, paddingBottom: 60 }}>
                {children || <Outlet />}
            </main>

            {/* Shared Luxury Footer */}
            <Footer />
        </div>
    );
}

export default Layout;

