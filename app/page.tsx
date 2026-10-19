"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import Image from "next/image"
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code2,
  CreditCard,
  FlaskConical,
  Github,
  GraduationCap,
  Instagram,
  Languages,
  Layers,
  LayoutTemplate,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Palette,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Twitter,
  Wallet,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const WHATSAPP_NUMBER = "5511984111337"
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá, Ítalo! Vim pelo site da Lion Dev e gostaria de conversar sobre um projeto.",
)}`

const navLinks = [
  { id: "hero", label: "Início" },
  { id: "services", label: "Serviços" },
  { id: "projects", label: "Projetos" },
  { id: "about", label: "Sobre" },
  { id: "contact", label: "Contato" },
]

const heroSlides = [
  {
    image: "/carrossel-1.png?height=600&width=800",
    title: "Transformamos Ideias em Soluções Digitais",
    subtitle: "Sites institucionais e softwares sob medida para sua empresa",
  },
  {
    image: "/carrossel-2.png?height=600&width=800",
    title: "Sua Empresa no Próximo Nível",
    subtitle: "Desenvolvemos soluções digitais que impulsionam negócios",
  },
  {
    image: "/carrossel-3.png?height=600&width=800",
    title: "Soluções Inteligentes Para Seu Negócio",
    subtitle: "Softwares personalizados e sites profissionais que fazem a diferença",
  },
  {
    image: "/carrossel-4.png?height=600&width=800",
    title: "Presença Digital que Gera Resultados",
    subtitle: "Criamos sites institucionais modernos e eficientes",
  },
  {
    image: "/carrossel-5.png?height=600&width=800",
    title: "Software e Web Que Conectam Você Ao Sucesso",
    subtitle: "Do site ao sistema, entregamos soluções sob medida",
  },
]

const services = [
  {
    icon: Code2,
    title: "Sistemas sob medida",
    description:
      "Sistemas web e painéis administrativos desenhados para o seu processo: automatizam tarefas, organizam dados e reduzem o retrabalho da equipe.",
    items: ["Painéis administrativos", "Integração com APIs", "Relatórios e indicadores"],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce e pagamentos",
    description:
      "Lojas e plataformas de venda com checkout seguro e conciliação financeira, já validadas em uma operação com receita prevista de R$ 2 milhões.",
    items: ["Pix, cartão parcelado e split", "Asaas, Cielo e Stripe", "Controle de estoque e reservas"],
  },
  {
    icon: LayoutTemplate,
    title: "Sites e landing pages",
    description:
      "Sites institucionais rápidos, responsivos e preparados para o Google, pensados para transformar visitantes em clientes.",
    items: ["Design responsivo", "SEO para buscadores", "Domínio e hospedagem"],
  },
  {
    icon: Palette,
    title: "Design e materiais gráficos",
    description:
      "Currículos, cartões de visita e peças para redes sociais com a mesma identidade visual da sua presença digital.",
    items: ["CVs personalizados", "Cartões de visita", "Flyers e posts"],
  },
]

const processSteps = [
  { title: "Conversa inicial", description: "Entendo o seu negócio, o objetivo e o problema a resolver." },
  { title: "Proposta", description: "Escopo, prazo e investimento definidos de forma clara." },
  { title: "Desenvolvimento", description: "Entregas parciais para você acompanhar cada etapa." },
  { title: "Entrega e suporte", description: "Publicação, ajustes finais e acompanhamento." },
]

const featuredProject = {
  title: "Loja e bilheteria para eventos corporativos",
  client: "KUMON / I Go",
  category: "E-commerce · Software",
  summary:
    "Plataforma de venda de pacotes de hospedagem e inscrições para a convenção do KUMON, com cerca de 2.400 convidados e tickets de R$ 4,4 mil a R$ 7,8 mil. Usa três gateways de pagamento: Asaas (Pix e cartão parcelado), Cielo (cartão em até 10x) e Stripe (cartões internacionais).",
  stats: [
    { value: "+R$ 60 mil", label: "nos 4 primeiros dias" },
    { value: "R$ 2 mi", label: "de receita prevista" },
    { value: "~2.400", label: "convidados" },
    { value: "1.700+", label: "testes automatizados" },
  ],
  stack: ["Vue 3", "Vuetify", "Pinia", ".NET Core", "SQL Server"],
  intro:
    "E-commerce com painel administrativo para o ecossistema I Go. Vende inscrições e pacotes de hospedagem e se conecta ao credenciamento por QR code no check-in.",
  details: [
    {
      icon: Wallet,
      title: "Pagamentos com três gateways",
      body: "Asaas para Pix, cartão parcelado e split de pagamento; Cielo para cartão em até 10x; Stripe para convidados internacionais. Os três confirmam o pagamento só pelo webhook, que é idempotente e ignora eventos repetidos.",
    },
    {
      icon: ShieldCheck,
      title: "Sem venda acima do estoque",
      body: "A vaga é reservada com um UPDATE condicional atômico, e uma reserva vencida volta ao estoque sozinha.",
    },
    {
      icon: CreditCard,
      title: "Financeiro",
      body: "O painel separa a taxa do gateway da taxa da casa, concilia o que foi cobrado com o líquido e trata estorno e parcelas.",
    },
    {
      icon: Languages,
      title: "Multi-idioma e precificação por plano",
      body: "Titular e acompanhante dividem a mesma vaga.",
    },
    {
      icon: FlaskConical,
      title: "Qualidade",
      body: "Mais de 1.700 testes automatizados, com scripts de banco idempotentes e versionados.",
    },
  ],
}

const projects = [
  {
    title: "OSESP",
    url: "#",
    description:
      "Software desenvolvido para a OSESP (Orquestra Sinfônica do Estado de São Paulo) para otimizar a gestão de concertos: controle de repertórios, registro de apresentações e emissão de relatórios, tornando os processos mais ágeis e eficientes.",
    image: "/osesp-1.png?height=300&width=400",
    category: "Software",
  },
  {
    title: "DIRTEC",
    url: "https://dirtec-landing-page.vercel.app/",
    description:
      "Site para uma empresa de soluções de energia, com venda, manutenção e assistência técnica em nobreaks. Apresenta os serviços, transmite credibilidade e facilita o contato de quem busca segurança energética.",
    image: "/dirtec.png?height=300&width=400",
    category: "Website Institucional",
  },
  {
    title: "Beauty Salon",
    url: "https://italo-tech.github.io/beauty-salon/",
    description:
      "Projeto educacional de um salão de beleza, criado para aplicar boas práticas de programação e de layout responsivo.",
    image: "/beauty.png?height=300&width=400",
    category: "Website Institucional",
  },
  {
    title: "Wildbeast",
    url: "https://italo-tech.github.io/wild-beast/",
    description:
      "Projeto educacional sobre o estudo dos lobos, unindo conteúdo científico com boas práticas de desenvolvimento.",
    image: "/wildbeast.png?height=300&width=400",
    category: "Portal Educacional",
  },
  {
    title: "Brafé",
    url: "https://italo-tech.github.io/projeto-brafe/",
    description:
      "Site de uma cafeteria, desenvolvido para aprendizagem e aprimoramento de boas práticas de programação.",
    image: "/brafe.png?height=300&width=400",
    category: "Website Institucional",
  },
  {
    title: "Landing",
    url: "#",
    description:
      "Site de viagens fictício desenvolvido para estudar novas tecnologias, como Tailwind CSS, e boas práticas de layout.",
    image: "/landing.png?height=300&width=400",
    category: "Landing Page",
  },
]

const highlights = [
  { icon: Briefcase, value: "5+ anos", label: "como Desenvolvedor Full Stack" },
  { icon: Layers, value: "Full Cycle", label: "do banco de dados ao deploy" },
  { icon: GraduationCap, value: "UNINOVE", label: "Análise e Desenvolvimento de Sistemas" },
]

const skillGroups = [
  {
    title: "Front-end",
    skills: ["Vue.js 2 e 3", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Web design responsivo"],
  },
  { title: "Back-end e dados", skills: ["Node.js", "Sequelize", "APIs REST", "SQL", "MySQL"] },
  { title: "DevOps", skills: ["Git e GitHub", "CI/CD", "Docker"] },
  { title: "IA aplicada", skills: ["IA generativa", "Agentes de IA", "Claude"] },
  { title: "Ferramentas", skills: ["VS Code", "Postman", "Insomnia", "Jira", "Notion", "Trello"] },
  { title: "Em evolução", skills: ["C# e .NET", "Engenharia de Software", "Inglês", "Espanhol"] },
]

const softSkills = [
  "Resolução de problemas",
  "Aprendizado rápido",
  "Atenção aos detalhes",
  "Colaboração em equipe",
  "Comunicação clara e objetiva",
]

const socialLinks = [
  { href: "https://www.linkedin.com/in/italo-tech/", label: "LinkedIn", icon: Linkedin },
  { href: "https://github.com/Italo-Tech", label: "GitHub", icon: Github },
  { href: "https://www.instagram.com/italo_lion_dev/", label: "Instagram", icon: Instagram },
  { href: "https://twitter.com/taloHenrique20", label: "X (Twitter)", icon: Twitter },
]

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

// Anima o conteúdo quando ele entra na tela (desligado para quem prefere menos movimento)
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  )
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description?: string }) {
  return (
    <Reveal className="text-center mb-14 max-w-3xl mx-auto">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600 mb-3">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 text-balance">{title}</h2>
      {description && <p className="text-lg text-gray-600 leading-relaxed">{description}</p>}
    </Reveal>
  )
}

export default function LionDevWebsite() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero")
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        const scrollPosition = window.scrollY + 100 // offset para transição suave
        setIsHeaderTransparent(scrollPosition < heroBottom)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Destaca no menu a seção que está no centro da tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    navLinks.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [currentSlide])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const isHeaderSolid = !isHeaderTransparent || isMenuOpen

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-gray-900">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isHeaderSolid ? "bg-gray-950/95 backdrop-blur-md shadow-lg shadow-black/10" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-4" aria-label="Navegação principal">
            <a href="#hero" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
              <Image src="/logo.png?height=50&width=50" alt="" width={44} height={44} className="rounded-full" />
              <span className="text-xl md:text-2xl font-bold tracking-wide text-white">
                <span className="text-amber-500">L</span>ION <span className="text-amber-500">D</span>EV
              </span>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  aria-current={activeSection === link.id ? "page" : undefined}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-amber-400 ${
                    activeSection === link.id ? "text-amber-400" : "text-white/90"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-amber-400 transition-transform duration-300 origin-left ${
                      activeSection === link.id ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              ))}
              <Button asChild size="sm" className="ml-4 bg-amber-500 hover:bg-amber-600 text-gray-950 font-semibold">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  Fale comigo
                </a>
              </Button>
            </div>

            <button
              className="md:hidden p-2 -mr-2 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>

          {isMenuOpen && (
            <div className="md:hidden pb-6 border-t border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col pt-4">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`py-3 text-base font-medium transition-colors hover:text-amber-400 ${
                      activeSection === link.id ? "text-amber-400" : "text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                <Button asChild className="mt-4 bg-amber-500 hover:bg-amber-600 text-gray-950 font-semibold">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    Fale comigo no WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with Carousel */}
      <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30 z-10"></div>

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
              alt=""
              fill
              style={{ transitionDuration: "8000ms" }}
              className={`object-cover transition-transform ease-linear ${
                index === currentSlide ? "scale-105" : "scale-100"
              }`}
              priority={index === 0}
            />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm text-white/90 mb-8">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Ítalo Henrique · Desenvolvedor Full Stack
          </p>
          <div key={currentSlide} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-balance">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-amber-300 text-balance">{heroSlides[currentSlide].subtitle}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-semibold px-8 h-12 text-base"
            >
              <a href="#projects">
                Ver portfólio <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/5 text-white hover:bg-white hover:text-gray-950 px-8 h-12 text-base"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Solicitar orçamento
              </a>
            </Button>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          aria-label="Slide anterior"
          className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/25 backdrop-blur-sm rounded-full p-3 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Próximo slide"
          className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/25 backdrop-blur-sm rounded-full p-3 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ir para o slide ${index + 1}`}
              aria-current={index === currentSlide}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentSlide ? "w-8 bg-amber-400" : "w-3 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        <a
          href="#services"
          aria-label="Rolar para os serviços"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-white/70 hover:text-white transition-colors animate-bounce"
        >
          <ChevronDown className="w-7 h-7" />
        </a>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Serviços"
            title={
              <>
                Do primeiro site ao sistema que <span className="text-amber-500">sustenta a operação</span>
              </>
            }
            description="Soluções digitais sob medida, construídas com o mesmo cuidado técnico usado em projetos de grande volume de vendas."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 100} className="h-full">
                <Card className="group h-full p-2 border-gray-200 hover:border-amber-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="pt-6 flex flex-col h-full">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                      <service.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-5">{service.description}</p>
                    <ul className="mt-auto space-y-2 border-t border-gray-100 pt-4">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                          <Check className="h-4 w-4 shrink-0 text-amber-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          {/* Como trabalho */}
          <Reveal className="mt-20">
            <h3 className="text-center text-2xl font-bold mb-10">Como funciona</h3>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <li key={step.title} className="relative text-center">
                  {index < processSteps.length - 1 && (
                    <span className="hidden lg:block absolute top-6 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-px bg-amber-200" />
                  )}
                  <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-amber-400 font-bold text-lg">
                    {index + 1}
                  </span>
                  <h4 className="font-semibold mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="mt-16 text-center">
            <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 h-12">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Conversar sobre meu projeto <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Portfólio"
            title={
              <>
                Projetos <span className="text-amber-500">recentes</span>
              </>
            }
            description="Uma seleção de sistemas e sites desenvolvidos para clientes e estudos."
          />

          {/* Projeto em destaque */}
          <Reveal className="mb-12">
            <article className="relative overflow-hidden rounded-2xl bg-gray-950 text-white shadow-2xl">
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
              <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
              <div className="relative grid lg:grid-cols-5 gap-10 p-8 md:p-12">
                <div className="lg:col-span-3">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="bg-amber-500 text-gray-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                      Destaque
                    </span>
                    <span className="text-sm text-white/60">{featuredProject.category}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{featuredProject.title}</h3>
                  <p className="text-amber-400 font-medium mb-5">{featuredProject.client}</p>
                  <p className="text-white/75 leading-relaxed mb-6">{featuredProject.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featuredProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/85"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-semibold">
                        Ver detalhes do projeto <ArrowRight className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                      <DialogHeader>
                        <p className="text-sm font-semibold text-amber-600">{featuredProject.client}</p>
                        <DialogTitle className="text-2xl">{featuredProject.title}</DialogTitle>
                        <DialogDescription className="text-base leading-relaxed">
                          {featuredProject.intro}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-3 my-2">
                        {featuredProject.stats.map((stat) => (
                          <div key={stat.label} className="rounded-lg bg-amber-50 p-4">
                            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-sm text-gray-600">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">
                        Tickets de R$ 4,4 mil a R$ 7,8 mil, com mais de R$ 60 mil vendidos nos 4 primeiros dias.
                      </p>
                      <ul className="space-y-5 mt-2">
                        {featuredProject.details.map((detail) => (
                          <li key={detail.title} className="flex gap-4">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-amber-400">
                              <detail.icon className="h-5 w-5" />
                            </span>
                            <div>
                              <h4 className="font-semibold text-gray-900">{detail.title}</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">{detail.body}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 pt-4 border-t">
                        {featuredProject.stack.map((tech) => (
                          <span key={tech} className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="lg:col-span-2 grid grid-cols-2 gap-4 content-center">
                  {featuredProject.stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                      <p className="text-2xl md:text-3xl font-extrabold text-amber-400">{stat.value}</p>
                      <p className="mt-1 text-sm text-white/65">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Reveal key={project.title} delay={(index % 3) * 100} className="h-full">
                <Card className="group h-full flex flex-col overflow-hidden border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={`Tela do projeto ${project.title}`}
                      width={400}
                      height={300}
                      className="w-full h-52 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gray-950/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{project.description}</p>
                    {project.url !== "#" && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700"
                      >
                        Ver projeto online
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <Reveal className="lg:col-span-2 lg:sticky lg:top-28">
              <div className="relative mx-auto w-full max-w-[20rem] lg:max-w-sm">
                {/* Brilho suave atrás da foto */}
                <div className="absolute inset-4 rounded-full bg-amber-400/40 blur-3xl" />
                {/* Anel tracejado decorativo */}
                <div className="absolute -inset-4 rounded-full border-2 border-dashed border-amber-300/70" />
                {/* Anel dourado + foto (o leve zoom esconde a borda branca do recorte original) */}
                <div className="relative aspect-square rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-1.5 shadow-2xl shadow-amber-900/20">
                  <div className="relative h-full w-full overflow-hidden rounded-full bg-gray-900 ring-4 ring-white">
                    <Image
                      src="/perfil-italo.png"
                      alt="Ítalo Henrique, Desenvolvedor Full Stack"
                      fill
                      sizes="(min-width: 1024px) 384px, 320px"
                      className="object-cover scale-[1.04]"
                    />
                  </div>
                </div>
                {/* Selo de experiência */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 flex items-center gap-2 whitespace-nowrap rounded-full bg-gray-950 px-4 py-2 text-sm font-semibold text-white shadow-xl">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  5+ anos de experiência
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-3">
              <Reveal>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600 mb-3">Sobre mim</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Ítalo Henrique</h2>
                <p className="text-xl text-amber-600 font-medium mb-6">Desenvolvedor Full Stack · Full Cycle</p>
                <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                  <p>
                    Há 5 anos construo software de ponta a ponta: da modelagem do banco de dados à interface final,
                    passando por APIs, integrações de pagamento e entrega contínua. Sou formado em Análise e
                    Desenvolvimento de Sistemas pela Universidade Nove de Julho.
                  </p>
                  <p>
                    O que me move é resolver problemas reais de negócio com código confiável: sistemas que aguentam
                    volume, regras financeiras que fecham no centavo e interfaces que qualquer pessoa entende. Trabalho
                    bem em equipe, compartilho conhecimento e encaro cada novo desafio como uma chance de aprender
                    uma tecnologia nova.
                  </p>
                  <p>
                    No dia a dia uso IA generativa e agentes de IA para entregar mais rápido sem abrir mão da
                    qualidade. Fora do código, gosto de futebol, ciclismo, leitura e de viajar com a família.
                  </p>
                </div>
              </Reveal>

              <Reveal className="grid sm:grid-cols-3 gap-4 my-10">
                {highlights.map((item) => (
                  <div key={item.value} className="rounded-xl bg-white border border-gray-200 p-5">
                    <item.icon className="h-6 w-6 text-amber-500 mb-3" />
                    <p className="text-lg font-bold">{item.value}</p>
                    <p className="text-sm text-gray-600">{item.label}</p>
                  </div>
                ))}
              </Reveal>

              <Reveal>
                <h3 className="text-xl font-bold mb-5">Competências técnicas</h3>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                  {skillGroups.map((group) => (
                    <div key={group.title}>
                      <p className="text-sm font-semibold text-gray-900 mb-2">{group.title}</p>
                      <div className="flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-white border border-gray-200 px-2.5 py-1 text-sm text-gray-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal className="mt-10">
                <h3 className="text-xl font-bold mb-4">Habilidades interpessoais</h3>
                <ul className="flex flex-wrap gap-x-6 gap-y-3">
                  {softSkills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-gray-700">
                      <Check className="h-4 w-4 text-amber-500" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="mt-10 flex flex-wrap gap-3">
                <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white">
                  <a href="https://www.linkedin.com/in/italo-tech/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-gray-300">
                  <a href="https://github.com/Italo-Tech" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <Reveal className="relative overflow-hidden rounded-2xl bg-gray-950 px-6 py-14 md:px-12 text-center text-white mb-14">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-[36rem] max-w-full rounded-full bg-amber-500/20 blur-3xl" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400 mb-3">Contato</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Vamos tirar seu projeto do papel?</h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                Conte o que você precisa e eu retorno com uma proposta clara de escopo, prazo e investimento.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold px-8 h-12 text-base"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="w-5 h-5" /> Chamar no WhatsApp
                </a>
              </Button>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Phone, title: "Telefone", value: "+55 11 98411-1337", href: WHATSAPP_URL },
              {
                icon: Mail,
                title: "Email",
                value: "liondevelopeer@gmail.com",
                href: "mailto:liondevelopeer@gmail.com",
              },
              {
                icon: MapPin,
                title: "Endereço",
                value: "Rua Castro Lopes 660 - SP - São Paulo",
                href: "https://www.google.com/maps/search/?api=1&query=Rua+Castro+Lopes+660+S%C3%A3o+Paulo",
              },
            ].map((contact, index) => (
              <Reveal key={contact.title} delay={index * 100} className="h-full">
                <a
                  href={contact.href}
                  target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex h-full items-center gap-4 rounded-xl border border-gray-200 p-6 hover:border-amber-300 hover:shadow-lg transition-all duration-300"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <contact.icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold">{contact.title}</span>
                    <span className="block text-sm text-gray-600 break-words">{contact.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="text-2xl font-bold">
                <span className="text-amber-500">L</span>ion <span className="text-amber-500">D</span>ev
              </p>
              <p className="text-gray-400 mt-1">Sua solução web completa</p>
            </div>

            <nav aria-label="Rodapé" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
              {navLinks.map((link) => (
                <a key={link.id} href={`#${link.id}`} className="hover:text-amber-400 transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gray-300 hover:bg-amber-500 hover:text-gray-950 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
            <p>Copyright © {new Date().getFullYear()} Lion Dev. Todos os direitos reservados</p>
            <p>v.2.1.0</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale comigo no WhatsApp"
        className="group fixed bottom-6 right-6 z-50 flex items-center"
      >
        <span className="pointer-events-none mr-3 hidden sm:block rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-lg opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          Fale comigo
        </span>
        <span className="relative flex h-14 w-14 items-center justify-center">
          <span className="whatsapp-halo absolute inset-0 rounded-full bg-[#25D366]" />
          <span className="whatsapp-halo-delayed absolute inset-0 rounded-full bg-[#25D366]" />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-900/25 transition-transform duration-300 group-hover:scale-105">
            <WhatsAppIcon className="h-7 w-7" />
          </span>
        </span>
      </a>
    </div>
  )
}
