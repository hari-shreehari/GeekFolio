'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, FileText } from "lucide-react"

export function PortfolioComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-6 md:p-12">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Jane Doe</h1>
          <div className="space-x-4">
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Projects</Button>
            <Button variant="ghost">Contact</Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <section className="text-center mb-16">
          <Avatar className="w-32 h-32 mx-auto mb-6">
            <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Jane Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <h2 className="text-4xl font-bold mb-4">Jane Doe</h2>
          <p className="text-xl text-muted-foreground mb-6">Full Stack Developer</p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="icon">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Mail className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <FileText className="h-5 w-5" />
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">About Me</h3>
          <p className="text-muted-foreground">
            I'm a passionate full stack developer with 5 years of experience in creating robust and scalable web applications. 
            My expertise spans across front-end and back-end technologies, with a keen eye for design and user experience.
          </p>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">Skills</h3>
          <div className="flex flex-wrap gap-2">
            <Badge>React</Badge>
            <Badge>Node.js</Badge>
            <Badge>TypeScript</Badge>
            <Badge>Python</Badge>
            <Badge>SQL</Badge>
            <Badge>GraphQL</Badge>
            <Badge>AWS</Badge>
            <Badge>Docker</Badge>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-6">Featured Projects</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>E-commerce Platform</CardTitle>
                <CardDescription>A full-featured online store</CardDescription>
              </CardHeader>
              <CardContent>
                Built with React, Node.js, and MongoDB. Implements user authentication, product management, and secure payment processing.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Task Management App</CardTitle>
                <CardDescription>Streamline your workflow</CardDescription>
              </CardHeader>
              <CardContent>
                Developed using React Native and Firebase. Features real-time updates, push notifications, and team collaboration tools.
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="text-center p-6 text-muted-foreground">
        <p>&copy; 2023 Jane Doe. All rights reserved.</p>
      </footer>
    </div>
  )
}