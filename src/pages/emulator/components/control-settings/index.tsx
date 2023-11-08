import React, { useState } from 'react'
// import { useLocation } from 'react-router'

import './index.less'

type Player = { id: string | number; name: string }
export const ControlSettings: React.FC<unknown> = () => {
  // const location = useLocation()
  const players: Array<Player> = [
    { id: 1, name: 'Player 1' },
    { id: 2, name: 'Player 2' },
    { id: 3, name: 'Player 3' },
    { id: 4, name: 'Player 4' }
  ]
  const [actived, setActived] = useState<string | number>(-1)

  const playerGroupButtons = (players: Array<Player>) => {
    const drawPlayerItem = players.map((player, index) => (
      <li className={`tabs-title ${actived === player.id ? 'emulator_control_selected' : null}`} role='presentation' key={`controls-${index}-${player.id}`}>
        <a id={`controls-${index}-label`} role='tab' onClick={() => setActived(player.id)}>
          {/* <a role='tab' aria-controls={`controls-${index}`} aria-selected='false' id={`controls-${index}-label`}> */}
          {player.name}
        </a>
      </li>
    ))
    return (
      <div className='emulator_popup_body emulator_control_body'>
        <ul className='emulator_control_player_bar'>{drawPlayerItem}</ul>
        <div>
          <div style={{ fontSize: '12px' }}>
            Connected Gamepad: <span>n/a</span>
          </div>
          <div style={{ width: '25%', float: 'left' }}>&nbsp;</div>
          <div style={{ fontSize: '12px', width: '50%', float: 'left' }}>
            <div style={{ textAlign: 'center', width: '50%', float: 'left' }}>Gamepad</div>
            <div style={{ textAlign: 'center', width: '50%', float: 'left' }}>Keyboard</div>
          </div>
          <div style={{ clear: 'both' }}></div>
        </div>
        {row()}
        {row()}
        {row()}
        {row()}
        {row()}
        {row()}
        {row()}
        {row()}
        {row()}
        {row()}
        {row()}
        {row()}
        {row()}
        {row()}
        {row()}
        {row()}
        {row()}
      </div>
    )
  }
  return (
    <>
      <h4>Control Settings</h4>
      {playerGroupButtons(players)}
      <a className='emulator_button'>Reset</a>
      <a className='emulator_button'>Clear</a>
      <a className='emulator_button'>Close</a>
    </>
  )
}

const row = (virtualKey: string = 'A') => {
  return (
    <div data-label='A' className='emulator_control_bar' style={{ marginBottom: '10px' }}>
      <div style={{ width: '25%', float: 'left', fontSize: '12px' }}>
        <label>{virtualKey}</label>
      </div>
      <div style={{ width: '50%', float: 'left' }}>
        <div style={{ width: '50%', float: 'left', padding: '0px 5px' }}>
          <input type='text' readOnly placeholder='' style={{ textAlign: 'center', height: '25px', width: '100%' }} />
        </div>
        <div style={{ width: '50%', float: 'left', padding: '0px 5px' }}>
          <input type='text' readOnly placeholder='' style={{ textAlign: 'center', height: '25px', width: '100%' }} />
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
      <div style={{ width: '25%', float: 'left' }}>
        <a className='emulator_control_set_button'>Set</a>
      </div>
      <div style={{ clear: 'both' }}></div>
    </div>
  )
}
export default ControlSettings
