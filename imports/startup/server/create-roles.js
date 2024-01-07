import { CLIENT, SUPER_ADMIN, COMPANY, SALES_MANAGER, PURCHASING_MANAGER, STORE_KEEPER } from "../../api/roles";

/// everytime the server started he will create this roles
/// if the roles exists or not it doesn't matter he will handle that

Object.values({ CLIENT, SUPER_ADMIN, COMPANY, SALES_MANAGER, PURCHASING_MANAGER, STORE_KEEPER }).forEach((e) => {
  Roles.createRole(e, { unlessExists: true });
});


// export const SALES_MANAGER = "SALES_MANAGER";
// export const PURCHASING_MANAGER = "PURCHASING_MANAGER";
// export const STORE_KEEPER = "STORE_KEEPER";