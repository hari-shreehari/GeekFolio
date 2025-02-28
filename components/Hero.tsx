"use client"

import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gray-100">
      <h1 className="text-6xl font-bold mb-8 text-gray-800">GeekFolio</h1>
      <TextGenerateEffect
        words="Your all-in-one platform for creating stunning resumes and portfolios"
        className="text-2xl text-center text-gray-600 max-w-2xl mb-8"
      />
    </section>
  )
}

