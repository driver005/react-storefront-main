import { Navbar } from ".";
import Spinner from "./Spinner";

export interface BaseTemplateProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  error?: boolean;
}

export const BaseTemplate: React.VFC<BaseTemplateProps> = ({
  children,
  isLoading,
}) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white align-middle flex flex-col flex-grow">
        {isLoading ? <Spinner /> : children}
      </div>
    </>
  );
};

export default BaseTemplate;
