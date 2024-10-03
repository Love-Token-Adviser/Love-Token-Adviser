import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const AlertModal = ({ title }: { title: string }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-white text-sm font-semibold border border-gray-600 w-24 py-1.5 rounded-md hover:bg-gray-100 shadow-sm"
        >
          {title}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-center">
            You Should Sign In First!!
          </AlertDialogTitle>
          <hr />
          <AlertDialogDescription className="flex justify-center text-gray-500">
            You need to sign up or log in to use our service.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <br />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
