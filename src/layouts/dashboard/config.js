import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import InBoxIcon from "@heroicons/react/24/solid/InboxIcon";
import DocumentIcon from "@heroicons/react/24/solid/DocumentIcon";

import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Overview",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Articles",
    path: "/article/list",
    icon: (
      <SvgIcon fontSize="small">
        <DocumentIcon />
      </SvgIcon>
    ),
  },
  /*
  {
    title: 'Products',
    path: '/product/list',
    icon: (
      <SvgIcon fontSize="small">
        <InBoxIcon />
      </SvgIcon>
    )
  },
  */
  {
    title: "Customers",
    path: "/customers",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
];
