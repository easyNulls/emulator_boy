import React, { useEffect } from 'react'

import './index.less'
import { useNavigate } from 'react-router-dom'
import { useIntl } from 'react-intl'
type HotGameListProps = {
  title?: string
}

export const HotGameList: React.FC<HotGameListProps> = (props: HotGameListProps) => {
  const navigate = useNavigate()
  const intl = useIntl()
  const title =
    props.title ??
    intl.formatMessage({
      id: 'Hot Games'
    })
  useEffect(() => {
    document.title = title
    return () => {
      document.title = ''
    }
  }, [title])

  const gameList: Array<{
    id: string | number
    name: string
    image: string
    width?: string | number
    height?: string | number
    rom: string
    core: string
  }> = [
    {
      id: 1,
      name: 'Metal Slug XX',
      image: 'https://tuicr.oss-cn-hangzhou.aliyuncs.com/RetroArch/thumb/mslug_mame.webp',
      width: '375',
      height: '419',
      rom: 'mslug3.zip',
      core: 'fbalpha2012_neogeo'
    },
    {
      id: 2,
      name: 'Metal Slug 3',
      image: 'https://tuicr.oss-cn-hangzhou.aliyuncs.com/RetroArch/thumb/mslug2_mame.webp',
      rom: 'mslug3.zip',
      core: 'fbalpha2012_neogeo'
    },
    {
      id: 3,
      name: 'Metal Slug 3',
      image: 'https://tuicr.oss-cn-hangzhou.aliyuncs.com/RetroArch/thumb/mslug3h_mame.webp',
      rom: 'mslug3.zip',
      core: 'fbalpha2012_neogeo'
    },
    {
      id: 4,
      name: 'Metal Slug 6',
      image: 'https://tuicr.oss-cn-hangzhou.aliyuncs.com/RetroArch/thumb/mslug6_mame.webp',
      rom: 'mslug3.zip',
      core: 'fbalpha2012_neogeo'
    }
  ]

  return (
    <div className='page'>
      <div className='hot_game-wrapper'>
        <ul className='hot_game-list'>
          {gameList.map((item, index) => {
            return (
              <li
                key={`__key_game_box.${item.id}_${index}`}
                onClick={() => {
                  const { rom, core } = item
                  navigate('/inject_game', { state: { rom, core } })
                }}>
                <a className='game_box'>
                  <img src={item.image} alt='Metal Slug XX' loading='lazy' width={item.width} height={item.height} />
                  <span className='game_box-title'>
                    {item.name ?? '--'} <span className='game_box-title-badge'>PSP</span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
export default HotGameList
