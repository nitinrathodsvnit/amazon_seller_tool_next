import GridPattern from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import ShimmerButton from "@/components/magicui/shimmer-button";
import BlurFade from "@/components/magicui/blur-fade";
import HyperText from "@/components/magicui/hyper-text";
import TypingAnimation from "@/components/magicui/typing-animation";




export default function () {
  return (
    <div>
      <div className="hero h-screen flex flex-col items-center justify-center">
        <div className="mt-10 flex flex-col gap-8 z-[10]">
          <BlurFade delay={0.25} duration={0.8} inView>
            <h1 className="mt-10 scroll-m-20 text-center text-9xl font-extrabold tracking-tight">
            <span className="pointer-events-none  dark:from-white dark:to-slate-900/10">
            Get the highest ROI <br />
            
      </span>
              
            </h1>
          </BlurFade>
          <BlurFade delay={0.5} duration={0.8} inView>
          <h2 className="scroll-m-20 text-center text-4xl tracking-tight whitespace-nowrap">
            as a marketplace seller with{" "}
            <span className="font-extrabold inline-block">
            <HyperText
                className="text-center text-4xl tracking-tight"
                duration={0.5}
                text="SellerROI"
            />
            </span>
        </h2>
          </BlurFade>
        </div>

        {/* <div
        className={cn(
          "mt-20 group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
        )}
      >
        <AnimatedShinyText className="text-xl inline-flex items-center justify-center px-10 py-3 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span className="text-black dark:text-white">Get Started</span>
          <ArrowRightIcon className="ml-1 size-6 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div> */}

        <div className="z-10 flex min-h-[10rem] items-center justify-center">
          <BlurFade delay={0.75} duration={0.8} inView>
            <ShimmerButton className="shadow-2xl py-5 px-8">
              <span className="whitespace-pre-wrap text-center text-xl font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Get Started
              </span>
            </ShimmerButton>
          </BlurFade>
        </div>
      </div>
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
        )}
      />
    </div>
  );
}
