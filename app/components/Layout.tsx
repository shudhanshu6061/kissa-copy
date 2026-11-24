import type { ReactNode } from "react";
import { MainLayout, type MainLayoutProps } from "../layouts/MainLayout";

export interface LayoutProps extends MainLayoutProps {
    children?: ReactNode;
    cartCount?: number;
}

export function Layout(props: LayoutProps) {
    return <MainLayout {...props} />;
}

export default Layout;
