import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import Image from "next/image"

interface FeatureSectionProps {
  title: string
  description: string
  shortDescription: string
  imageSrc: string
  imageAlt: string
  direction: "left" | "right"
}

export default function FeatureSection({
  title,
  description,
  shortDescription,
  imageSrc,
  imageAlt,
  direction,
}: FeatureSectionProps) {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 bg-white">
      <div
        className={`flex flex-col ${direction === "left" ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-between w-full max-w-6xl mx-auto px-4 gap-8`}
      >
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{title}</h2>
          <TextGenerateEffect words={description} className="text-lg text-gray-600 mb-4" />
          <p className="text-sm text-gray-500">{shortDescription}</p>
        </div>
        <div className="w-full md:w-1/2">
          <ContainerScroll
            users={[]}
            titleComponent={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-[80%] h-[80%] relative">
                  <Image
                    src={imageSrc || "/placeholder.svg"}
                    alt={imageAlt}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  )
}
