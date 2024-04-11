import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const TitlePage = () => {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };
  const navigateToSignUp = () => {
    navigate("/signup");
  };
  return (
    <div className="flex items-center flex-col justify-center h-screen w-full bg-[#229EA3]">
      <h1 className="text-8xl text-center mb-2 text-white">
        <b>CULINARY CRAFT AI!</b>
      </h1>
      <h2 className="text-5xl mb-20 text-white text-center">
        Generate, Create, and Save Recipes
      </h2>
      <Button
        className="font-Montserrat text-2xl bg-[#000088] rounded-full w-96 mb-3"
        onClick={navigateToLogin}
      >
        LOGIN
      </Button>
      <Button
        className="font-Montserrat text-2xl bg-[#000088] rounded-full w-96"
        onClick={navigateToSignUp}
      >
        CREATE NEW ACCOUNT
      </Button>
    </div>
  );
};
export default TitlePage;
