'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PortfolioTemplates() {
  const templates = [
    {
      title: "Minimalist Pro",
      description: "A clean, typography-focused design with ample white space for a modern professional look.",
      color: "bg-gray-100",
      accent: "border-gray-500",
      tags: ["Minimal", "Typography", "Modern"]
    },
    {
      title: "Corporate Edge",
      description: "Sleek and formal design with a subtle color scheme, perfect for corporate environments.",
      color: "bg-blue-50",
      accent: "border-blue-500",
      tags: ["Corporate", "Professional", "Sleek"]
    },
    {
      title: "Creative Formal",
      description: "Balances creativity with professionalism, using geometric shapes and a muted color palette.",
      color: "bg-purple-50",
      accent: "border-purple-500",
      tags: ["Creative", "Geometric", "Balanced"]
    },
    {
      title: "Tech Innovator",
      description: "Modern and tech-focused design with a dark mode option, ideal for IT professionals and developers.",
      color: "bg-green-50",
      accent: "border-green-500",
      tags: ["Tech", "Dark Mode", "Innovative"]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Portfolio Template Ideas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template, index) => (
          <Card key={index} className={`${template.color} border-t-4 ${template.accent} transition-all duration-300 hover:shadow-lg`}>
            <CardHeader>
              <CardTitle>{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Preview</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}