import type { UiKey } from "@i18n/ui";

export const navItems: { key: UiKey; label: string; href: string; active: boolean }[] = [
    { key: "nav.home",       label: "Home",       href: "#hero-section",       active: true  },
    { key: "nav.projects",   label: "Projects",   href: "#projects-section",   active: false },
    { key: "nav.about",      label: "About",      href: "#about-section",      active: false },
    { key: "nav.experience", label: "Experience", href: "#experience-section", active: false },
    // { key: "nav.contact", label: "Contact",    href: "#contact-section",    active: false },
];
