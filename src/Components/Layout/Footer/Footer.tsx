import { Footer as FbFooter } from "flowbite-react";

const Footer = () => {
  return (
    <FbFooter container className="bg-slate-100">
      <div className="flex justify-center w-full">
        <FbFooter.Copyright
          href="#"
          by="Ado.css"
          year={2024}
          className="text-dark"
        />
      </div>
    </FbFooter>
  );
};

export default Footer;