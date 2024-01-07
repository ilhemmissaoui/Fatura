import {
  Users,
  ShoppingCart,
  ShoppingBag,
  Box,
  MessageSquare,
  Globe,
  Activity
} from "react-feather";
import React from "react";

const companyItems = [
  {
    label: "Sale",
    path: "sale",
    icon: <ShoppingCart className="icon icon-sm mr-2" />,
    role: ["COMPANY", "SALES_MANAGER"],
    children: [
      {
        path: "estimate",
        label: "Estimate",
      },
      {
        path: "client_order",
        label: "Client Order",
      },
      {
        path: "delivery_note",
        label: "Delivery Note",
      },
      {
        path: "invoice",
        label: "Invoice",
      },
      {
        path: "issue_note",
        label: "Issue Note",
      },
    ],
  },
  {
    label: "Purchase",
    path: "purchase",
    icon: <ShoppingBag className="icon icon-sm mr-2" />,
    role: ["COMPANY", "PURCHASING_MANAGER"],
    children: [
      {
        path: "supplier_order",
        label: "Supplier Order",
      },
      {
        path: "supplier_delivery_note",
        label: "Supplier Delivery Note",
      },
      {
        path: "supplier_invoice",
        label: "Supplier Invoice",
      },
    ],
  },

  {
    label: "Customers",
    path: "customers",
    icon: <Users className="icon icon-sm mr-2" />,
    role: ["COMPANY", "SALES_MANAGER"],
  },
  {
    label: "Supplier",
    path: "suppliers",
    icon: <Activity className="icon icon-sm mr-2" />,
    role: ["COMPANY", "PURCHASING_MANAGER"],
  },
  {
    label: "Product And Service",
    path: "product_service",
    icon: <Globe className="icon icon-sm mr-2" />,
    role: ["COMPANY", "STORE_KEEPER"],
  },
  {
    label: "Stock",
    path: "stock",
    icon: <Box className="icon icon-sm mr-2" />,
    role: ["COMPANY", "STORE_KEEPER"],
    children: [
      {
        path: "prchase_stock",
        label: "Purchase Stock",
      },
      {
        path: "sale_stock",
        label: "Sale Stock",
      },
    ],
  },
];

const adminItems = [
  {
    label: "Companies",
    icon: <Users className="icon icon-sm mr-2" />,
    path: "companies",
    role: ["SUPER_ADMIN"],
  },
  { label: "Sells", path: "sells", role: ["COMPANY,SUPER_ADMIN"] },
];

const SideBarElements = [
  ...companyItems,
  ...adminItems,
  {
    label: "Messages",
    path: "messages",
    icon: <MessageSquare className="icon icon-sm mr-2" />,
    role: ["SUPER_ADMIN", "COMPANY"],
  },
];

export default SideBarElements;
