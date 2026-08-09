import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { Idea } from '../components/Idea'
import { HumanLoop } from '../components/HumanLoop'
import { TasteSkill } from '../components/TasteSkill'
import { SkillAtlas } from '../components/SkillAtlas'
import { References } from '../components/References'
import { Agents } from '../components/Agents'
import { Install } from '../components/Install'
import { Footer } from '../components/Footer'

export function HomePage() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main className="w-full max-w-full">
        <Hero />
        <Idea />
        <HumanLoop />
        <TasteSkill />
        <SkillAtlas />
        <References />
        <Agents />
        <Install />
      </main>
      <Footer />
    </>
  )
}
