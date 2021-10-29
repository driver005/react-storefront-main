import React from "react";
import clsx from "clsx";

const styles = `inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50`;

interface Props {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const Button: React.VFC<Props> = ({ onClick, className, children }) => {
  return (
    <button className={clsx(styles, className)} onClick={onClick}>
      {children}
    </button>
  );
};
