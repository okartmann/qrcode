import { Hero } from '@/components/ui/Hero'
import { QRGenerator } from '@/components/qr-generator/QRGenerator'
import { Features } from '@/components/ui/Features'
import { FAQ } from '@/components/ui/FAQ'

export default function Home() {
  return (
    <>
      <Hero />
      <section id="generator" className="py-16">
        <div className="container mx-auto px-6">
          <QRGenerator />
        </div>
      </section>
      <Features />
      <FAQ />
    </>
  )
}
