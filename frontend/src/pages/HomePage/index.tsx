import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="relative h-full flex justify-center items-center bg-present bg-cover">
      <div className="absolute inset-0 bg-present bg-cover filter blur-xs" />
      <div className="flex flex-col w-full gap-6 justify-center items-center z-10 bg-white bg-opacity-90 p-6">
        <h1 className="text-gray-900 text-6xl font-bold">Love Token Advisor</h1>
        <h3 className="text-gray-400 text-2xl">
          What are you looking for Today?
        </h3>
        <div className="flex gap-8 w-full justify-center items-center">
          <Button
            variant="outline"
            className="w-24"
            onClick={() => console.log("clicked")}
          >
            Gift
          </Button>
          <Button
            variant="default"
            className="w-24"
            onClick={() => console.log("clicked")}
          >
            Outfit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
