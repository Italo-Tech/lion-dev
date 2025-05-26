"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Phone, Mail, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const heroSlides = [
  {
    image: "/carrossel-1.png?height=600&width=800",
    title: "Transformamos Ideias em Soluções Digitais",
    subtitle: "Sites institucionais e softwares sob medida para sua empresa",
    description: "Tenha uma presença online que gera valor e resultados reais",
  },
  {
    image: "/carrossel-2.png?height=600&width=800",
    title: "Sua Empresa no Próximo Nível",
    subtitle: "Desenvolvemos soluções digitais que impulsionam negócios",
    description: "Tenha um site profissional e entregue uma experiência de excelência",
  },
  {
    image: "/carrossel-3.png?height=600&width=800",
    title: "Soluções Inteligentes Para Seu Negócio",
    subtitle: "Softwares personalizados e sites profissionais que fazem a diferença",
    description: "Destaque-se no mercado com tecnologia feita para sua empresa",
  },
  {
    image: "/carrossel-4.png?height=600&width=800",
    title: "Presença Digital que Gera Resultados",
    subtitle: "Criamos sites institucionais modernos e eficientes",
    description: "Conquiste mais clientes e fortaleça sua marca online",
  },
  {
    image: "/carrossel-5.png?height=600&width=800",
    title: "Software e Web Que Conectam Você Ao Sucesso",
    subtitle: "Do site ao sistema, entregamos soluções sob medida",
    description: "Seu projeto digital começa aqui, com qualidade, performance e design",
  },
]

const services = [
  {
    icon: "https://img.icons8.com/bubbles/100/000000/web.png",
    title: "Web Design",
    description:
      "Nosso trabalho é garantir que seu site seja atrativo aos olhos de seus clientes, por isso temos como foco a garantia de lhes oferecer um bom design gráfico.",
  },
  {
    icon: "https://img.icons8.com/bubbles/100/000000/domain.png",
    title: "Domínio",
    description:
      "Escolha o domínio de seu site para que seus clientes através dele acessem sua página e conheça mais sobre a sua empresa e os serviços prestados.",
  },
  {
    icon: "https://img.icons8.com/bubbles/100/000000/google-web-search.png",
    title: "SEO",
    description:
      "Usamos estratégias de otimização (SEO) para que seu site venha estar entre os primeiros resultados de busca nos maiores navegadores da internet.",
  },
  {
    icon: "https://img.icons8.com/bubbles/100/000000/stack.png",
    title: "Servidor",
    description:
      "Seu site é hospedado em um servidor, possibilitando seus clientes visitar sua página a qualquer momento e em qualquer lugar onde haja internet.",
  },
]

const projects = [
  {
    title: "Beauty Salon",
    url: "https://italo-tech.github.io/beauty-salon/",
    description:
      "Caravan é um projeto de um Salão de Beleza, desenvolvido com objetivo de aprendizagem e aprimoramento de boas práticas de programação.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Website Institucional",
  },
  {
    title: "Caravan",
    url: "https://italo-tech.github.io/caravan-bootstrap/",
    description:
      "Caravan é um projeto de uma agência de viagens, desenvolvido com objetivo de aprendizagem e aprimoramento de boas práticas de programação.",
    image: "/placeholder.svg?height=300&width=400",
    category: "E-commerce",
  },
  {
    title: "Wildbeast",
    url: "https://italo-tech.github.io/wild-beast/",
    description:
      "Wildbeast é um projeto educacional acerca de lobos, desenvolvido com o objetivo de aprendizagem e aprimoramento de boas práticas de programação.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Portal Educacional",
  },
  {
    title: "Brafé",
    url: "https://italo-tech.github.io/projeto-brafe/",
    description:
      "Brafé é um projeto de uma Cafeteria, desenvolvido com objetivo de aprendizagem e aprimoramento de boas práticas de programação.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Website Comercial",
  },
  {
    title: "D-BOARD",
    url: "#",
    description:
      "O projeto D-BOARD é um site de Dashboard administrativo desenvolvido para aprendizagem de novas tecnologias como VueJS, TailwindCSS, gráfico e componentes visuais.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Dashboard",
  },
  {
    title: "Landing",
    url: "#",
    description:
      "O projeto Landing é site de viagens fake desenvolvido para aprendizagem de novas tecnologias, como por exemplo tailwindcss e boas práticas de layouts.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Landing Page",
  },
]

export default function LionDevWebsite() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero")
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        const scrollPosition = window.scrollY + 100 // offset para transição suave
        setIsHeaderTransparent(scrollPosition < heroBottom)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isHeaderTransparent ? "bg-transparent" : "bg-gray-900 backdrop-blur-sm shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.png?height=50&width=50"
                alt="Lion Dev Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <h1 className="text-2xl font-bold transition-colors duration-300 text-white">
                <span className="text-amber-500">L</span>ION <span className="text-amber-500">D</span>EV
              </h1>
            </div>

            <div className="hidden md:flex space-x-8">
              <Link href="#hero" className="transition-colors duration-300  text-white hover:text-amber-400">
                Início
              </Link>
              <Link href="#services" className="transition-colors duration-300  text-white hover:text-amber-400">
                Serviços
              </Link>
              <Link href="#projects" className="transition-colors duration-300  text-white hover:text-amber-400">
                Projetos
              </Link>
              <Link href="#about" className="transition-colors duration-300  text-white hover:text-amber-400">
                Sobre
              </Link>
              <Link href="#contact" className="transition-colors duration-300  text-white hover:text-amber-400">
                Contato
              </Link>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div
                  className={`w-full h-0.5 transition-colors duration-300 ${
                    isHeaderTransparent ? "bg-white" : "bg-gray-700"
                  }`}
                ></div>
                <div
                  className={`w-full h-0.5 transition-colors duration-300 ${
                    isHeaderTransparent ? "bg-white" : "bg-gray-700"
                  }`}
                ></div>
                <div
                  className={`w-full h-0.5 transition-colors duration-300 ${
                    isHeaderTransparent ? "bg-white" : "bg-gray-700"
                  }`}
                ></div>
              </div>
            </button>
          </nav>

          {isMenuOpen && (
            <div
              className={`md:hidden py-4 border-t transition-colors duration-300 ${
                isHeaderTransparent ? "border-white/20 bg-black/20 backdrop-blur-sm" : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex flex-col space-y-4">
                <Link
                  href="#hero"
                  className={`transition-colors duration-300 ${
                    isHeaderTransparent ? "text-white hover:text-amber-400" : "text-gray-700 hover:text-amber-500"
                  }`}
                >
                  Início
                </Link>
                <Link
                  href="#services"
                  className={`transition-colors duration-300 ${
                    isHeaderTransparent ? "text-white hover:text-amber-400" : "text-gray-700 hover:text-amber-500"
                  }`}
                >
                  Serviços
                </Link>
                <Link
                  href="#projects"
                  className={`transition-colors duration-300 ${
                    isHeaderTransparent ? "text-white hover:text-amber-400" : "text-gray-700 hover:text-amber-500"
                  }`}
                >
                  Projetos
                </Link>
                <Link
                  href="#about"
                  className={`transition-colors duration-300 ${
                    isHeaderTransparent ? "text-white hover:text-amber-400" : "text-gray-700 hover:text-amber-500"
                  }`}
                >
                  Sobre
                </Link>
                <Link
                  href="#contact"
                  className={`transition-colors duration-300 ${
                    isHeaderTransparent ? "text-white hover:text-amber-400" : "text-gray-700 hover:text-amber-500"
                  }`}
                >
                  Contato
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with Carousel */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>

        {/* Background Images */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">{heroSlides[currentSlide].title}</h1>
            <h2 className="text-2xl md:text-3xl mb-4 text-amber-400">{heroSlides[currentSlide].subtitle}</h2>
            {/* <p className="text-xl mb-8 text-gray-200">{heroSlides[currentSlide].description}</p> */}
          </div>
          <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 text-lg">
            <Link href="#projects">Ver Portfólio</Link>
          </Button>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-amber-500" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Serv<span className="text-amber-500">i</span>ços
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              O Lion Dev é uma empresa de criação de sites institucionais com a finalidade de registrar a marca de sua
              empresa no mundo digital. Tenha o encanto de seus clientes por sua prestação de serviço através de um
              clique.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <Image
                      src={service.icon || "/placeholder.svg"}
                      alt={service.title}
                      width={80}
                      height={80}
                      className="mx-auto"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - New Layout */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Projetos <span className="text-amber-500">Recentes</span>
            </h2>
            <p className="text-xl text-gray-600">Conheça alguns dos nossos trabalhos mais recentes</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm">{project.category}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  {project.url !== "#" && (
                    <div className="flex items-center text-amber-500 mb-3">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      <Link href={project.url} target="_blank" className="text-sm hover:underline">
                        Ver projeto online
                      </Link>
                    </div>
                  )}
                  <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Image
                src="/perfil.png?height=400&width=400"
                alt="Ítalo - Desenvolvedor"
                width={400}
                height={400}
                className="rounded-lg mx-auto lg:mx-0"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Sobre <span className="text-amber-500">mim</span>
              </h2>
              <h3 className="text-2xl text-amber-500 mb-6">Full Stack Developer</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Sou Analista em Desenvolvimento de Sistemas, formado pela Universidade Nove de Julho, e atuo como Desenvolvedor Full Stack, especializado na criação e manutenção de softwares e soluções web sob medida.
                Ao longo da minha trajetória, venho ajudando empresas e empreendedores a potencializar seus negócios através de tecnologia, automação e presença digital de alta performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Dados para <span className="text-amber-500">contato</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Phone className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Telefone</h3>
                <p className="text-gray-600">+55 11 98411-1337</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Mail className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-600">liondevelopeer@gmail.com</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <MapPin className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Endereço</h3>
                <p className="text-gray-600">Rua Castro Lopes 660 - SP - São Paulo</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">
            <span className="text-amber-500">L</span>ion <span className="text-amber-500">D</span>ev
          </h2>
          <p className="text-xl mb-8 text-gray-300">Sua Solução Web Completa</p>

          <div className="flex justify-center space-x-6 mb-8">
            <Link href="https://www.linkedin.com/in/italo-tech/" target="_blank">
              <Image
                src="https://img.icons8.com/bubbles/50/000000/linkedin.png"
                alt="LinkedIn"
                width={50}
                height={50}
                className="hover:scale-110 transition-transform"
              />
            </Link>
            <Link href="https://www.instagram.com/italo_santos_tech/" target="_blank">
              <Image
                src="https://img.icons8.com/bubbles/50/000000/instagram-new.png"
                alt="Instagram"
                width={50}
                height={50}
                className="hover:scale-110 transition-transform"
              />
            </Link>
            <Link href="https://twitter.com/taloHenrique20" target="_blank">
              <Image
                src="https://img.icons8.com/bubbles/50/000000/twitter-circled.png"
                alt="Twitter"
                width={50}
                height={50}
                className="hover:scale-110 transition-transform"
              />
            </Link>
            <Link href="https://github.com/Italo-Tech" target="_blank">
              <Image
                src="https://img.icons8.com/bubbles/50/000000/github.png"
                alt="GitHub"
                width={50}
                height={50}
                className="hover:scale-110 transition-transform"
              />
            </Link>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400">Copyright © 2025 Lion Dev. Todos os direitos reservados</p>
            <p className="text-gray-500 mt-2">v.2.1.0</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <Link
        href="https://wa.me/5511984111337" // coloque seu número com DDD
        target="_blank"
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="relative">
          {/* Círculo de animação */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
          {/* Ícone */}
          <Image
            src="/whatsapp.png" // use o ícone que desejar
            alt="WhatsApp"
            width={60}
            height={60}
            className="rounded-full shadow-lg hover:scale-110 transition-transform"
          />
        </div>
      </Link>
    </div>
  )
}