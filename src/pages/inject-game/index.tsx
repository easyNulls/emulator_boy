import React, { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router'

import { useKeyPressOnCallback } from '@/components/keyboard-listener'
import Emulator from '@/pages/emulator'
import { RetroarchCreator } from '../emulator/retroarch-creator'

import './index.less'
import { useQueryParams } from '@/kits'

// const games: Array<{ core: string; rom: string }> = [
//   { core: 'fbalpha2012_neogeo', rom: 'mslug3.zip' },
//   { core: 'fceumm', rom: 'BrainSeries13in1.nes' }
// ]

export const InjectGame: React.FC<{}> = () => {
  const { search, state } = useLocation()
  const { core = state.core, rom = state.rom } = useQueryParams<Record<string, string>>(search)
  const retro = useMemo(() => RetroarchCreator.instance(), [])

  const mapKeys = (): Record<string, string> => ({
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    Shift: 'select',
    Enter: 'start',
    KeyZ: 'a',
    KeyX: 'b',
    KeyJ: 'x',
    KeyI: 'y'
  })

  useKeyPressOnCallback({
    '*': e => {
      const { code, key } = e
      console.log(code, retro._nostalgist)
      const rs = mapKeys()[code] ?? mapKeys()[key]
      console.log('rs', rs)
      if (rs) retro._nostalgist?.press(rs)
    }
  })

  useEffect(() => {}, [])

  return (
    <div className='page'>
      {/* <Emulator width='640px' height='480px' arguments={{ ...games[1] }}> */}

      <Emulator width='auto' height='auto' arguments={{ core, rom }} />
    </div>
  )
}

export default InjectGame
