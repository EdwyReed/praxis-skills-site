import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import type { SkillDemoLine } from '../data/skills'

/** Play once: typewriter forward, then hold final frame. No loop / no rewind. */
export const DEMO_FPS = 30
export const DEMO_DURATION = 360
export const DEMO_WIDTH = 960
export const DEMO_HEIGHT = 600

export type AgentSkillDemoProps = {
  skillTitle: string
  prompt: string
  cwd: string
  lines: SkillDemoLine[]
}

function typeCount(frame: number, start: number, length: number, cps: number) {
  if (frame < start) return 0
  return Math.min(length, Math.floor((frame - start) * cps))
}

function lineCps(kind: SkillDemoLine['kind']) {
  if (kind === 'result') return 5.5
  if (kind === 'tool') return 4.2
  if (kind === 'user') return 3.0
  return 3.4
}

function displayText(line: SkillDemoLine) {
  if (line.kind === 'tool') {
    return line.name ? `${line.name}  ${line.text}` : line.text
  }
  return line.text
}

function timeline(fps: number) {
  const lineStart = Math.round(0.35 * fps)
  const perLine = Math.round(0.72 * fps)
  return { lineStart, perLine }
}

function visibleChars(
  frame: number,
  index: number,
  line: SkillDemoLine,
  t: ReturnType<typeof timeline>,
): { count: number; show: boolean } {
  const appear = t.lineStart + index * t.perLine
  const full = displayText(line).length
  const cps = lineCps(line.kind)

  if (frame < appear) return { count: 0, show: false }
  const count = typeCount(frame, appear + (line.kind === 'result' ? 1 : 2), full, cps)
  return { count, show: true }
}

const mono =
  'ui-monospace, SFMono-Regular, "Cascadia Code", Menlo, Consolas, monospace'

function LineRow({
  line,
  count,
}: {
  line: SkillDemoLine
  count: number
}) {
  const frame = useCurrentFrame()
  const full = displayText(line)
  const shown = full.slice(0, count)
  const typing = count > 0 && count < full.length
  const cursorOn = Math.floor(frame / 8) % 2 === 0

  if (line.kind === 'user') {
    return (
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            color: '#71717a',
            fontFamily: mono,
            fontSize: 11,
            marginBottom: 4,
          }}
        >
          user
        </div>
        <div
          style={{
            fontFamily: mono,
            fontSize: 12.5,
            lineHeight: 1.5,
            color: '#e4e4e7',
            whiteSpace: 'pre-wrap',
          }}
        >
          {shown}
          {typing && cursorOn ? <span style={{ color: '#a1a1aa' }}>|</span> : null}
        </div>
      </div>
    )
  }

  if (line.kind === 'tool') {
    const name = line.name ?? 'Tool'
    const sep = '  '
    const composed = `${name}${sep}${line.text}`
    const partial = composed.slice(0, count)
    const namePart = partial.length <= name.length ? partial : name
    const pathPart =
      partial.length <= name.length ? '' : partial.slice(name.length + sep.length)

    return (
      <div
        style={{
          marginBottom: 8,
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 8,
          background: 'rgba(24,24,27,0.9)',
          padding: '8px 10px',
          fontFamily: mono,
          fontSize: 12,
        }}
      >
        <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
          <span style={{ color: '#a78bfa', flexShrink: 0 }}>{namePart}</span>
          <span style={{ color: '#a1a1aa', whiteSpace: 'pre-wrap' }}>
            {pathPart}
            {typing && cursorOn ? <span style={{ color: '#d4d4d8' }}>|</span> : null}
          </span>
        </div>
      </div>
    )
  }

  if (line.kind === 'result') {
    return (
      <div
        style={{
          marginBottom: 10,
          marginLeft: 2,
          paddingLeft: 10,
          borderLeft: '2px solid rgba(255,255,255,0.08)',
          fontFamily: mono,
          fontSize: 11.5,
          lineHeight: 1.45,
          color: '#71717a',
          whiteSpace: 'pre-wrap',
        }}
      >
        {shown}
        {typing && cursorOn ? <span style={{ color: '#52525b' }}>|</span> : null}
      </div>
    )
  }

  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          color: '#71717a',
          fontFamily: mono,
          fontSize: 11,
          marginBottom: 4,
        }}
      >
        assistant
      </div>
      <div
        style={{
          fontFamily: mono,
          fontSize: 12.5,
          lineHeight: 1.5,
          color: '#d4d4d8',
          whiteSpace: 'pre-wrap',
        }}
      >
        {shown}
        {typing && cursorOn ? <span style={{ color: '#a1a1aa' }}>|</span> : null}
      </div>
    </div>
  )
}

/**
 * Realistic agent session chrome. Plays once and stays on the final frame.
 */
export function AgentSkillDemo({ skillTitle, cwd, lines }: AgentSkillDemoProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const t = timeline(fps)

  return (
    <AbsoluteFill
      style={{
        background: '#09090b',
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0c0c0e',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.55)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: '10px 14px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            background: '#121214',
            fontFamily: mono,
            fontSize: 11.5,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 99, background: '#3f3f46' }} />
            <span style={{ width: 8, height: 8, borderRadius: 99, background: '#3f3f46' }} />
            <span style={{ width: 8, height: 8, borderRadius: 99, background: '#3f3f46' }} />
            <span style={{ marginLeft: 8, color: '#a1a1aa' }}>codex</span>
            <span style={{ color: '#3f3f46' }}>·</span>
            <span style={{ color: '#71717a' }}>{cwd}</span>
          </div>
          <span style={{ color: '#52525b' }}>{skillTitle}</span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 14,
            padding: '6px 14px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            fontFamily: mono,
            fontSize: 10.5,
            color: '#52525b',
            background: '#0e0e10',
          }}
        >
          <span>main</span>
          <span style={{ color: '#3f3f46' }}>|</span>
          <span>skills on</span>
          <span style={{ color: '#3f3f46' }}>|</span>
          <span>workspace trusted</span>
        </div>

        <div
          style={{
            flex: 1,
            padding: '14px 14px 16px',
            overflow: 'hidden',
          }}
        >
          {lines.map((line, i) => {
            const state = visibleChars(frame, i, line, t)
            if (!state.show) return null
            return (
              <LineRow key={`${line.kind}-${i}`} line={line} count={state.count} />
            )
          })}
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            padding: '10px 14px',
            fontFamily: mono,
            fontSize: 12,
            color: '#3f3f46',
            background: '#101012',
          }}
        >
          <span style={{ color: '#52525b' }}>$</span>  message agent…
        </div>
      </div>
    </AbsoluteFill>
  )
}
