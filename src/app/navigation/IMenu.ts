import {ReactElement, ReactNode} from "react";

export interface IMenu {
  path?: string;
  name: ReactNode;
  icon?: ReactElement;
  subMenu?: Array<Omit<IMenu, "subMenu">>;
}
