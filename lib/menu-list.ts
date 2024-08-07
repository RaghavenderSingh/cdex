import {
  Settings,
  LayoutGrid,
  LucideIcon,
  Wallet,
  ArrowDownUp,
  Cable,
  WalletCards,
  BadgeInfo
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Wallet",
          active: pathname.includes("/dashboard"),
          icon: Wallet,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Swap",
          active: pathname.includes("/dashboard"),
          icon: ArrowDownUp,
          submenus: []
        }
      ]
    },

    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Wallet Adpter",
          active: pathname.includes("/dashboard"),
          icon: WalletCards,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Api",
          active: pathname.includes("/dashboard"),
          icon: Cable,
          submenus: []
        }
      ]
    },


    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: []
        },
        {
          href: "/account",
          label: "Help Center",
          active: pathname.includes("/account"),
          icon: BadgeInfo,
          submenus: []
        }
      ]
    }
  ];
}
