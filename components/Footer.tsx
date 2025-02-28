import { Github } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="p-6 border-t flex justify-between items-center bg-white">
      <div>
        <Github className="w-6 h-6 text-gray-600" />
      </div>
      <div className="text-green-600 font-bold text-xl">IT'S FOSS</div>
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
              <Image
                src={`/placeholder.svg?height=32&width=32&text=${i + 1}`}
                alt={`Contributor ${i + 1}`}
                width={32}
                height={32}
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

