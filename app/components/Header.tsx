import type { ReactNode } from "react";
import { Navbar } from "./navigation/Navbar";
import { AnnouncementBar } from "./landing/AnnouncementBar";
import { NAVIGATION_ITEMS } from "./navigation/NavigationMenu";

export interface HeaderProps {
    cartCount?: number;
    showAnnouncement?: boolean;
}

export const NAV_LINKS = NAVIGATION_ITEMS.map((item) => ({
    label: item.label,
    to: item.to,
}));

export function Header({ cartCount = 1, showAnnouncement = true }: HeaderProps) {
    return (
        <>
            {showAnnouncement && <AnnouncementBar />}
            <Navbar cartCount={cartCount} />
        </>
    );
}

export default Header;
