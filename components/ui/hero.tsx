import { Button } from "@/components/ui/button";

const Hero = () => {
    return (
        <section className="relative flex justify-center items-center min-h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10 h-full w-full">
                <img
                    alt="background"
                    src="https://shadcnblocks.com/images/block/patterns/square-alt-grid.svg"
                    className="h-full w-full object-cover opacity-90 [mask-image:radial-gradient(75%_75%_at_center,white,transparent)]"
                />
            </div>
            
            {/* Centered Content */}
            <div className="container flex flex-col items-center text-center">
                <h1 className="my-6 text-4xl font-bold lg:text-6xl">CoinSight</h1>
                <p className="text-muted-foreground">Your AI-powered crypto assistant</p>
                {/* Uncomment the button if needed */}
                <Button asChild size="lg" className="mt-10">
                    <a href="/register">Learn more</a>
                </Button>
            </div>
        </section>
    );
};

export { Hero };