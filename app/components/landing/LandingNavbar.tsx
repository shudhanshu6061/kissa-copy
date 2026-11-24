import { Navbar, type NavbarProps } from "../navigation/Navbar";

export type LandingNavbarProps = NavbarProps;

export function LandingNavbar(props: LandingNavbarProps) {
  return <Navbar {...props} />;
}

export default LandingNavbar;
