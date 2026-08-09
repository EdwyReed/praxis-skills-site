import { Player } from '@remotion/player'
import {
  AgentSkillDemo,
  DEMO_DURATION,
  DEMO_FPS,
  DEMO_HEIGHT,
  DEMO_WIDTH,
  type AgentSkillDemoProps,
} from '../remotion/AgentSkillDemo'
import type { Skill } from '../data/skills'

export function SkillDemoPlayer({
  skill,
  className = '',
}: {
  skill: Skill
  className?: string
}) {
  const inputProps: AgentSkillDemoProps = {
    skillTitle: skill.title,
    prompt: skill.prompt,
    cwd: skill.cwd,
    lines: skill.demo,
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_40px_100px_rgba(0,0,0,0.55)] ${className}`}
    >
      <Player
        key={skill.id}
        component={AgentSkillDemo}
        inputProps={inputProps}
        durationInFrames={DEMO_DURATION}
        compositionWidth={DEMO_WIDTH}
        compositionHeight={DEMO_HEIGHT}
        fps={DEMO_FPS}
        style={{ width: '100%', aspectRatio: `${DEMO_WIDTH} / ${DEMO_HEIGHT}` }}
        controls={false}
        loop
        autoPlay
        acknowledgeRemotionLicense
      />
    </div>
  )
}
