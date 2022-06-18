import React, { ReactNode } from "react";
import { TagCardProps } from "./TagCard";

interface IProps {
  className?: string;
  children?: ReactNode;
}

const COLORS = [
  "from-pink-400 to-rose-300 shadow-red-200",
  "from-violet-400 to-purple-200 shadow-fuchsia-200",
  "from-cyan-400 to-teal-200 shadow-sky-300",
  "from-amber-400 to-yellow-200 shadow-orange-200",
  "from-lime-300 to-emerald-300 shadow-teal-200",
];

const LEN = COLORS.length;

const TagGroup: React.FC<IProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        const childrenElement =
          child as React.FunctionComponentElement<TagCardProps>;
        const { className } = childrenElement.props;
        return React.cloneElement(childrenElement, {
          className: `${COLORS[index % LEN]} ${className}`,
        });
      })}
    </div>
  );
};

export default TagGroup;
