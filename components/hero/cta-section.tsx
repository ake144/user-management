import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LampContainer } from "../ui/lamp"

export function CTASection() {
  return (
    <section className="w-full sm:pt-5 md:pt-7 lg:pt-10 sm:pb-1 md:pb-2 px-5 relative flex flex-col justify-center items-center overflow-visible">
      <LampContainer className="min-h-162.5 ">

      <div className="relative z-10 flex flex-col justify-start items-center gap-9 max-w-4xl mt-10 md:mt-36 mx-auto">
        <div className="flex flex-col justify-start items-center gap-4 text-center">
          <h2 className="text-foreground text-4xl md:text-5xl lg:text-[68px] font-semibold leading-tight md:leading-tight lg:leading-[76px] break-words">
            Start Earning Income Today
          </h2>
          <p className="text-muted-foreground text-sm md:text-base font-medium leading-[18.20px] md:leading-relaxed break-words max-w-2xl">
            Join thousands of creators and businesses already using Esperanza to scale their influence and grow their success.
          </p>
        </div>
        <Link href="/auth/login">
          <Button
            className="px-[30px] py-2 cursor-pointer bg-primary text-primary-foreground text-base font-medium leading-6 rounded-[99px] shadow-[0px_0px_0px_4px_rgba(255,255,255,0.13)] hover:bg-primary/90 transition-all duration-200"
            size="lg"
          >
            Start Earning Now
          </Button>
        </Link>
      </div>
      </LampContainer>

    </section>
  )
}
