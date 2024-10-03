import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useLoginContext } from "@/components/context/useLoginContext";
import { AlertModal } from "@/components/Modals";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [selectedGiftOption, setSelectedGiftOption] = useState("0");
  const [selectedOutfitOption, setSelectedOutfitOption] = useState("male");
  const loginContext = useLoginContext();

  if (!loginContext) {
    return null;
  }

  const { isLoggedIn } = loginContext;

  const handleSelectGiftOption = (value: string) => {
    setSelectedGiftOption(value);
  };

  const handleSelectOutfitOption = (value: string) => {
    setSelectedOutfitOption(value);
  };

  console.log(selectedGiftOption, selectedOutfitOption);

  return (
    <div className="relative h-full flex justify-center items-center bg-present bg-cover">
      <div className="absolute inset-0 bg-present bg-cover filter blur-xs" />
      <div className="flex flex-col w-full gap-6 justify-center items-center z-10 bg-white bg-opacity-90 p-6">
        <h1 className="text-gray-900 text-6xl font-bold">Love Token Advisor</h1>
        <h3 className="text-gray-500 text-2xl">
          What are you looking for Today?
        </h3>
        <div className="flex gap-8 w-full justify-center items-center">
          {isLoggedIn ? (
            <AlertDialog>
              <AlertDialogTrigger className="bg-white text-sm font-semibold border border-gray-600 w-24 py-1.5 rounded-md hover:bg-gray-100 shadow-sm">
                Gift
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl">
                    Who is the special person you will be giving a gift to?
                  </AlertDialogTitle>
                  <hr />
                  <RadioGroup
                    defaultValue="0"
                    className="py-4"
                    onValueChange={handleSelectGiftOption}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="boy-friend" />
                      <Label htmlFor="boy-friend" className="text-xl">
                        Boy Friend
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="girl-friend" />
                      <Label htmlFor="girl-friend" className="text-xl">
                        Girl Friend
                      </Label>
                    </div>
                  </RadioGroup>
                  <AlertDialogDescription />
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>
                    <Link
                      to="/recommendation"
                      state={{ type: "gift", gender: selectedGiftOption }}
                    >
                      Continue
                    </Link>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <AlertModal title="Gift" />
          )}
          {isLoggedIn ? (
            <AlertDialog>
              <AlertDialogTrigger className="bg-black text-sm font-semibold text-white border-2 border-black w-24 py-1.5 rounded-md hover:bg-gray-800 shadow-sm">
                Outfit
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl">
                    What gender's clothes would you like to wear on a date?
                  </AlertDialogTitle>
                  <hr />
                  <RadioGroup
                    defaultValue="male"
                    className="py-4"
                    onValueChange={handleSelectOutfitOption}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="option-one" />
                      <Label htmlFor="option-one" className="text-xl">
                        Male
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="option-two" />
                      <Label htmlFor="option-two" className="text-xl">
                        Female
                      </Label>
                    </div>
                  </RadioGroup>
                  <AlertDialogDescription />
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <AlertModal title="Outfit" />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
