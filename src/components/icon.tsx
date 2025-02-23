import { ReactSVG } from "react-svg";

export const Icon = ({ name }: { name: string }) => {
  return <ReactSVG src={`/icons/${name}.svg`} />;
};
