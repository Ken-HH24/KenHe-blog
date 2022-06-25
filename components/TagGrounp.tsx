import React, { ReactNode } from "react";
import { getTagCardBgColor } from "utils/tagUtils";
import { TagCardProps } from "./TagCard";

interface IProps {
  className?: string;
  children?: ReactNode;
}

const TagGroup: React.FC<IProps> = ({ children, className }) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        const childrenElement =
          child as React.FunctionComponentElement<TagCardProps>;
        const { className, title } = childrenElement.props;
        return React.cloneElement(childrenElement, {
          className: `${getTagCardBgColor(title)} ${className}`,
        });
      })}
    </div>
  );
};

export default TagGroup;
