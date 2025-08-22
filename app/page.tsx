"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Shield,
  Users,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Moon,
  Sun,
  ArrowDownCircle,
  MessageCircle
} from "lucide-react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

// Componente DropMenu para agendar reunião
function AgendarDropMenu({ size = "sm", className = "" }) {
  const [open, setOpen] = useState(false);
  // Tamanhos customizados
  const sizeClasses =
    size === "lg"
      ? "px-8 py-6 text-lg"
      : size === "md"
      ? "px-6 py-4 text-base"
      : "px-4 py-2 text-sm";

  return (
    <div className={`md:relative ${className}`}>
      <Button
        size={size}
        className={`flex items-center ${sizeClasses} ${className}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Phone
          className={`mr-2 ${
            size === "lg" ? "h-6 w-6" : size === "md" ? "h-5 w-5" : "h-4 w-4"
          }`}
        />
        Agendar Reunião
        <ChevronDown
          className={`ml-2 ${
            size === "lg" ? "h-6 w-6" : size === "md" ? "h-5 w-5" : "h-4 w-4"
          }`}
        />
      </Button>
      {open && (
        <div
          className="absolute right-0 mt-2 w-56 bg-white border border-border rounded-lg shadow-lg z-50"
          onMouseLeave={() => setOpen(false)}
        >
          <a
            href="https://cal.com/jaquenutri/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-3 hover:bg-primary/10 text-black text-sm"
            onClick={() => setOpen(false)}
          >
            Reunião de 15 minutos
          </a>
          <a
            href="https://cal.com/jaquenutri/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-3 hover:bg-primary/10 text-black text-sm"
            onClick={() => setOpen(false)}
          >
            Reunião de 30 minutos
          </a>
          <a
            href="https://cal.com/jaquenutri/1h"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-3 hover:bg-primary/10 text-black text-sm"
            onClick={() => setOpen(false)}
          >
            Reunião de 1 hora
          </a>
        </div>
      )}
    </div>
  );
}

export default function LandingPage() {
  const [forceUpdate, setForceUpdate] = useState(false);

  // Animation trigger for marker
  const markerRef = useRef<HTMLSpanElement>(null);
  const [markerVisible, setMarkerVisible] = useState(false);

  useEffect(() => {
    const ref = markerRef.current;
    if (!ref) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMarkerVisible(true);
      },
      { threshold: 1 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Logo */}
      <header className="py-4 px-4 bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border/40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center md:gap-3">
            <Image
              src="/images/logo.png"
              alt="Jaqueline Freitas Nutricionista"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div className="">
              <h1 className="text-lg font-bold text-black">
                Jaqueline Freitas
              </h1>
              <p className="text-sm text-black">Nutricionista Oncológica</p>
            </div>
          </div>

          {/* Agendar Reunião + Theme Toggle */}
          <div className="flex items-center gap-2">
            <AgendarDropMenu size="sm" className="hidden md:flex" />
            {/* Theme Toggle Button */}
            <Button
              size="icon"
              variant="ghost"
              aria-label="Alternar tema"
              className="md:ml-2"
              onClick={() => {
                if (typeof window !== "undefined") {
                  document.documentElement.classList.toggle("dark");
                  setForceUpdate((v) => !v);
                }
              }}
            >
              {typeof window !== "undefined" &&
              document.documentElement.classList.contains("dark") ? (
                <Sun className="h-5 w-5 text-black" />
              ) : (
                <Moon className="h-5 w-5 text-primary" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 py-8 px-4">
        <div className="max-w-[1480px] mx-auto">
          {/* Hero Image - Full Width */}
          <div className="relative flex flex-col items-center justify-center mb-8">
            <Image
              src="/images/hero-cover.png"
              alt="Jaqueline Freitas - A nutricionista para você chamar de sua"
              width={1200}
              height={600}
              className="w-full rounded-2xl shadow-2xl"
              priority
            />
            <ArrowDownCircle
              className="hidden md:flex mt-6 animate-bounce"
              size={50}
            />
          </div>

          {/* Hero Content - Below Image */}
          <div className="text-center space-y-12 mt-12">
            <div className="max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-6 text-sm font-medium">
                ✨ Primeira Orientação Gratuita
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-[family-name:var(--font-space-grotesk)]">
                A nutricionista para{" "}
                <span className="text-primary">você chamar</span> de{" "}
                <span className="relative inline-block">
                  <span
                    ref={markerRef}
                    className={`absolute left-0 bottom-1 w-full h-6 md:h-10 bg-foreground/70 rounded-md ${
                      markerVisible ? "animate-marker" : ""
                    }`}
                    style={{ zIndex: 0 }}
                  />
                  <span className="relative z-10 text-accent italic">sua</span>
                </span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Atendimento nutricional especializado para pacientes oncológicos
                e suas famílias. Cuidado humanizado, preços acessíveis e
                resultados que transformam vidas.
              </p>

              <div className="flex md:flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <AgendarDropMenu size="md" />
                <Button
                  onClick={() => {
                    const element = document.getElementById("como-funciona");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 bg-transparent"
                >
                  Saiba Mais
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>+100 pacientes atendidos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-secondary" />
                  <span>98% de satisfação</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Especialista certificada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios e Diferenciais */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-space-grotesk)]">
              Por que escolher nosso atendimento?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Oferecemos cuidado especializado que vai além da nutrição
              tradicional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">
                 Conheça nosso trabalho sem compromisso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Orientações gerais e de como funciona nosso tratamento
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-xl mb-2">
                  Preços Acessíveis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Acreditamos que cuidado de qualidade deve estar ao alcance de
                  todos. Valores justos e parcelamento disponível.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">Cuidado Familiar</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Orientamos também familiares e cuidadores, porque sabemos que
                  o apoio é fundamental no tratamento.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-space-grotesk)]">
              Histórias de Esperança
            </h2>
            <p className="text-lg text-muted-foreground">
              Veja como nosso cuidado transformou a vida de nossos pacientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardContent className="pt-6">
                <p className="text-foreground mb-4 italic">
                  "Estava com muito medo de não conseguir me alimentar durante o
                  tratamento. A nutricionista me ajudou a encontrar alimentos
                  que eu conseguia comer e que me davam força. Hoje me sinto
                  muito melhor!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">M</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Maria S.</p>
                    <p className="text-sm text-muted-foreground">
                      Paciente há 8 meses
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-6">
                <p className="text-foreground mb-4 italic">
                  "Como filho, eu não sabia como ajudar minha mãe com a
                  alimentação. As orientações foram claras e práticas. Agora sei
                  exatamente como cuidar dela em casa."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <span className="text-secondary font-semibold">J</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">João P.</p>
                    <p className="text-sm text-muted-foreground">
                      Familiar de paciente
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 px-4" id="como-funciona">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-space-grotesk)]">
              Como Funciona
            </h2>
            <p className="text-lg text-muted-foreground">
              Um processo simples e acolhedor para começar seu cuidado
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Agende sua Consulta
                </h3>
                <p className="text-muted-foreground">
                  Entre em contato conosco e agende sua primeira avaliação sem
                  custo. Atendemos presencial e online.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Avaliação Completa
                </h3>
                <p className="text-muted-foreground">
                  Conversamos sobre seu histórico, tratamento atual e
                  necessidades específicas. Criamos um plano personalizado para
                  você.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Acompanhamento Contínuo
                </h3>
                <p className="text-muted-foreground">
                  Suporte constante durante todo seu tratamento, com ajustes no
                  plano conforme necessário. Você nunca estará sozinho(a).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)]">
            Não Espere Mais para Cuidar da Sua Saúde
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Sua primeira consulta é gratuita. Agende agora e comece a se sentir
            melhor hoje mesmo.
          </p>
          <div>
            <AgendarDropMenu size="lg" className="mx-auto" />
            <Button
              size="lg"
              className="my-2 cursor-pointer"
              variant="secondary"
              onClick={() => {
                window.open(
                  "https://wa.me/5522998069761?text=Olá!%20vi%20seu%20site%20e%20gostaria%20de%20mais%20informações%20sobre%20seus%20serviços!",
                  "_blank"
                );
              }}
            >
              <MessageCircle />
              Me chame no Whatsapp
            </Button>
          </div>
          <p className="text-sm opacity-75">
            ⏰ Vagas limitadas para este mês
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-space-grotesk)]">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-muted-foreground">
              Esclarecemos suas principais dúvidas
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem className="no-underline" value="faq-1">
              <AccordionTrigger className="text-lg">
                A primeira orientação é realmente gratuita?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Sim! Oferecemos a primeira orientação sem custo para que você conheça nosso trabalho, fornecendo orientações iniciais.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="no-underline" value="faq-2">
              <AccordionTrigger className="text-lg">
                Vocês atendem online?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Sim! Oferecemos atendimento presencial e online via videochamada. O atendimento online tem a mesma qualidade e eficácia do presencial.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="no-underline" value="faq-3">
              <AccordionTrigger className="text-lg">
                Qual o valor das consultas de acompanhamento?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Nossos valores são acessíveis e oferecemos opções de parcelamento. Durante a orientação gratuita, explicamos todos os valores e formas de pagamento disponíveis.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="no-underline" value="faq-4">
              <AccordionTrigger className="text-lg">
                Familiares podem participar das consultas?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Absolutamente! Incentivamos a participação de familiares e cuidadores. Sabemos que o apoio da família é fundamental para o sucesso do tratamento nutricional.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="no-underline" value="faq-5">
              <AccordionTrigger className="text-lg">
                Vocês trabalham com convênios?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Fornecemos todos os documentos necessários para reembolso junto ao seu convênio. Entre em contato para verificar as possibilidades com seu plano específico.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/images/logo.png"
                  alt="Jaqueline Freitas Nutricionista"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <h3 className="text-xl font-bold text-foreground font-[family-name:var(--font-space-grotesk)]">
                  Jaqueline Freitas
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Cuidado nutricional especializado para pacientes oncológicos e
                suas famílias.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>CRN: 24100235 - Especialista em Oncologia</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Contato</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>(22) 99806-9761</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>Jaquelinefreitas.nutri@yahoo.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Cabo Frio, RJ</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Garantias</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Primeira orientação gratuita</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Atendimento humanizado</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Suporte contínuo</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Preços acessíveis</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; 2025 Jaqueline Freitas - Nutricionista Oncológica. Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
