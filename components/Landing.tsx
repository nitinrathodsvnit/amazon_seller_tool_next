import React from 'react';
import GridPattern from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import ShimmerButton from "@/components/magicui/shimmer-button";
import BlurFade from "@/components/magicui/blur-fade";
import HyperText from "@/components/magicui/hyper-text";

const LandingPage = () => {
  return (
    <div>
      <div className="hero h-screen flex flex-col items-center justify-center">
        <div className="mt-10 flex flex-col gap-8 z-[10]">
          <BlurFade delay={0.25} duration={0.8} inView>
            <h1 className="mt-10 scroll-m-20 text-center text-9xl font-extrabold tracking-tight">
              <span className="pointer-events-none dark:from-white dark:to-slate-900/10">
                Get the highest ROI <br />
              </span>
            </h1>
          </BlurFade>
          <BlurFade delay={0.5} duration={0.8} inView>
            <h2 className="scroll-m-20 text-center text-4xl tracking-tight whitespace-nowrap">
              as a marketplace seller with{" "} 
              <span className="font-extrabold inline-block"> SellerROI </span>
              {/* <span className="font-extrabold inline-block">
                <HyperText
                  className="text-center text-4xl tracking-tight"
                  duration={0.5}
                  text="SellerROI"
                />
              </span> */}
            </h2>
          </BlurFade>
        </div>

        <div className="z-10 flex min-h-[10rem] items-center justify-center" onClick={() => {
          return window.location.href = "/calculator";
        }}>
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
};

export default LandingPage;