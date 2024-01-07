import { COMPANY, PHYSICIAN, SUPER_ADMIN, EXPERT } from "../../../api/roles";
import { Home, Edit, Users, Briefcase, Heart } from "react-feather";
let elements = [
  {
    label: "Accueil",
    path: "",
    Icon: Home,
    roles: [COMPANY, SUPER_ADMIN],
  },
  {
    label: "Demandes",
    path: "requests",
    roles: [SUPER_ADMIN],
  },
  {
    label: "Formulaire d'évaluation",
    path: "form",
    roles: [COMPANY, SUPER_ADMIN],
    Icon: Edit,
  },
  {
    label: "Collaborateurs",
    path: "hrs",
    roles: [COMPANY, SUPER_ADMIN],
    Icon: Users,
  },
  {
    label: "Tableau de bord",
    path: "",
    Icon: Home,
    roles: [SUPER_ADMIN, COMPANY],
  },
  {
    label: "Entreprises",
    path: "companies",
    Icon: Briefcase,
    roles: [SUPER_ADMIN, COMPANY],
  },
  {
    label: "Experts",
    path: "experts",
    Icon: Users,
    roles: [SUPER_ADMIN],
  },
  {
    label: "Médecins",
    path: "physicians",
    Icon: Heart,
    roles: [SUPER_ADMIN],
  },
  {
    label: "Collaborateurs",
    path: "hrs",
    Icon: Users,
    roles: [SUPER_ADMIN],
  },
  {
    label: "Gestion de contenu",
    path: "/admin",
    Icon: Edit,
    roles: [SUPER_ADMIN],
    children: [
      {
        label: "Spécialités des médecins",
        path: "physician-specialities",
      },
    ],
  },
];
const getElementsByRole = (role) => {
  let res = [];
  elements
    .filter((e) => (e.roles && e.roles ? e.roles.includes(role) : true))
    .forEach((e) => {
      let obj = {
        path: `/${role === SUPER_ADMIN ? "admin" : role.toLowerCase()}${
          e.path.length ? `/${e.path}` : ""
        }`,
        label: e.label,
        Icon: e.Icon,
        disabled: e.disabled,
      };
      if (e.children) {
        obj.children = [];
        e.children.forEach((c) => {
          let child = {
            label: c.label,
            path: `${e.path}/${c.path}`,
            Icon: e.Icon,
            disabled: c.disabled,
          };
          obj.children.push(child);
        });
      }
      res.push(obj);
    });
  return res;
};
export default getElementsByRole;
