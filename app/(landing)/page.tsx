import { Button } from "@/components/ui/button";
import Heading from "./_components/Heading";
import Logo from "./_components/Logo";

const LandingPage = () => {
    return (
        <div className="min-h-full flex flex-col">
            <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
                <Heading/>
            </div>
            <div className="flex items-center w-full p-6 bg-background z-50">
                <Logo/>
                <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
                    <Button variant="ghost" size="sm">
                        Privacy Policy
                    </Button>
                    <Button variant="ghost" size="sm">
                        Terms & Conditions
                    </Button>
                </div>
            </div>
        </div>
    );
}
 
export default LandingPage;