import { config } from "@/config"
import { Nostalgist } from "nostalgist"


export const defaultRetroarchCoresConfig = {
    fceumm: {
        fceumm_turbo_enable: 'Both',
    },
    mgba: {
        mgba_gb_colors: 'DMG Green',
        mgba_skip_bios: 'ON',
    },
}

const defaultRetroarchConfig = {
    menu_driver: 'rgui',
    rewind_enable: true,
    notification_show_when_menu_is_alive: true,
    stdin_cmd_enable: true,
    quit_press_twice: false,
    video_vsync: true,

    rgui_menu_color_theme: 4,
    rgui_show_start_screen: false,
    savestate_file_compression: true,
    savestate_thumbnail_enable: true,
    save_file_compression: true,

    input_rewind_btn: 6, // L2
    input_hold_fast_forward_btn: 7, // R2
    // input_menu_toggle_gamepad_combo: 6, // L1+R1
    input_enable_hotkey_btn: 8, // select
    rewind_granularity: 4,

    input_exit_emulator: 'nul',

    input_cheat_index_minus: 'nul', // override default 't',
    input_cheat_index_plus: 'nul', // override default 'y',
    input_cheat_toggle: 'nul', // override default 'u',
    input_frame_advance: 'nul', // override default 'k',
    input_hold_fast_forward: 'nul', // override default 'l',
    input_hold_slowmotion: 'nul', // override default 'e',
    input_netplay_game_watch: 'nul', // override default 'i',
    input_pause_toggle: 'nul', // override default 'p',
    input_reset: 'nul', // override default 'h',
    input_rewind: 'nul', // override default 'r',
    input_shader_next: 'nul', // override default 'm',
    input_shader_prev: 'nul', // override default 'n',
    input_toggle_fullscreen: 'nul', // override default 'f',

    input_player1_analog_dpad_mode: 1,
    input_player2_analog_dpad_mode: 1,
    input_player3_analog_dpad_mode: 1,
    input_player4_analog_dpad_mode: 1,
}

export class RetroarchCreator {

    _nostalgist: Nostalgist | null = null

    constructor() { }

    static instance() {
        const creator = new RetroarchCreator()
        Nostalgist.configure({
            retroarchConfig: defaultRetroarchConfig,

            resolveCoreJs(core) {
                return `${config.HOST_LIB_RETROARCH}/cores/${core}_libretro.js`
            },
            resolveCoreWasm(core) {
                return `${config.HOST_LIB_RETROARCH}/cores/${core}_libretro.wasm`
            },
            resolveRom(rom: any, options: any) {
                console.log(rom, options)
                return `${config.HOST_LIB_RETROARCH}/roms/${rom}`
            },
            waitForInteraction(params) {
                params.done()
            }
        })

        return creator
    }


    async launch(core: string, rom: string, canvasEl: string | HTMLElement) {
        console.log('launch', core, rom, canvasEl)

        return this._nostalgist = await Nostalgist.launch({
            // element: document.getElementById('emulator-canvas') as HTMLCanvasElement,
            // core: 'fbalpha2012_neogeo',
            // rom: 'mslug3.zip',
            core, rom,
            element: (typeof canvasEl === 'string' ? document.getElementById(canvasEl) : canvasEl) as HTMLCanvasElement,
            // retroarchConfig: {
            // },

            // resolveCoreJs(core) {
            //     return `${config.HOST_LIB_RETROARCH}/retroarch/${core}_libretro.js`
            // },
            // resolveCoreWasm(core) {
            //     return `${config.HOST_LIB_RETROARCH}/retroarch/${core}_libretro.wasm`
            // },
            // resolveRom(rom: any, options: any) {
            //     console.log(rom, options)
            //     return `${config.HOST_LIB_RETROARCH}/roms/${rom}`
            // },
            // waitForInteraction(params) {
            //     params.done()
            // }
        })
    }



    pause() {
        console.log('pause')
        this._nostalgist!.pause()
    }

    resume() {
        console.log('resume')
        this._nostalgist!.resume()
    }

    restart() {
        console.log('restart')
        this._nostalgist!.restart()
    }

    pressUp(options: {
        button: string
        player?: number
        time?: number

    }) {
        console.log('pressUp', options)
        this._nostalgist?.pressUp(options)
    }

    pressDown(options: {
        button: string
        player?: number
        time?: number
    }) {
        console.log('pressDown', options)
        this._nostalgist?.pressDown(options)
    }

    press(options: {
        button: string
        player?: number
        time?: number
    }) {
        console.log('press', options)
        this._nostalgist?.press(options)
    }


    resize(size: { width: number; height: number }) {

        console.log('resize', size)
        this._nostalgist!.resize(size)
    }

    exit() {
        console.log('exit')
        this._nostalgist?.exit({ removeCanvas: false })
    }

    getCurrentNostalgist() {
        console.log('getCurrentNostalgist')
        return this._nostalgist
    }
}

export const isSafari = () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
export const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

export const getCore = (core: string, generic: boolean = false) => {

    /*todo:
    Systems: msx
    
    Cores:
    - FreeChaF
    - FreeIntv
    - NeoCD
    - O2EM
    - Vecx
    */
    if (generic) {
        const options: Record<string, string> = {
            'a5200': 'atari5200',
            'beetle_vb': 'vb',
            'desmume': 'nds',
            'desmume2015': 'nds',
            'fbalpha2012_cps1': 'arcade',
            'fbalpha2012_cps2': 'arcade',
            'fbneo': 'arcade',
            'fceumm': 'nes',
            'gambatte': 'gb',
            'gearcoleco': 'coleco',
            'genesis_plus_gx': 'sega',
            'handy': 'lynx',
            'mame2000': 'mame2000',
            'mame2003': 'mame2003',
            'mame2003_plus': 'mame2003',
            'mednafen_ngp': 'ngp',
            'mednafen_pce': 'pce',
            'mednafen_pcfx': 'pcfx',
            'mednafen_psx_hw': 'psx',
            'mednafen_wswan': 'ws',
            'melonds': 'nds',
            'mgba': 'gba',
            'mupen64plus_next': 'n64',
            'nestopia': 'nes',
            'opera': '3do',
            'parallel_n64': 'n64',
            'pcsx_rearmed': 'psx',
            'picodrive': 'sega',
            'ppsspp': 'psp',
            'prosystem': 'atari7800',
            'snes9x': 'snes',
            'stella2014': 'atari2600',
            'virtualjaguar': 'jaguar',
            'yabause': 'segaSaturn',
            'puae': 'amiga',
            'vice_x64': 'c64'
        }
        return options[core] || core
    }
    const options: Record<string, string> = {
        'jaguar': 'virtualjaguar',
        'lynx': 'handy',
        'segaSaturn': 'yabause',
        'segaMS': 'genesis_plus_gx',
        'segaMD': 'genesis_plus_gx',
        'segaGG': 'genesis_plus_gx',
        'segaCD': 'genesis_plus_gx',
        'sega32x': 'picodrive',
        'atari2600': 'stella2014',
        'atari7800': 'prosystem',
        'nes': 'fceumm',
        'snes': 'snes9x',
        'atari5200': 'a5200',
        'gb': 'gambatte',
        'gba': 'mgba',
        'vb': 'beetle_vb',
        'n64': 'mupen64plus_next',
        'nds': 'melonds',
        'mame2003': 'mame2003_plus',
        'arcade': 'fbneo',
        'psx': 'pcsx_rearmed',
        '3do': 'opera',
        'psp': 'ppsspp',
        'pce': 'mednafen_pce',
        'pcfx': 'mednafen_pcfx',
        'ngp': 'mednafen_ngp',
        'ws': 'mednafen_wswan',
        'coleco': 'gearcoleco',
        'amiga': 'puae',
        'c64': 'vice_x64'
    }
    if (isSafari() && isMobile() && getCore(core, true) === 'n64') {
        return 'parallel_n64';
    }
    return options[core] || core
}


export const extensions = {
    'a5200': ['a52', 'bin'],
    'amiga': ['adf', 'adz', 'dms', 'fdi', 'ipf', 'raw', 'hdf', 'hdz', 'lha', 'slave', 'info', 'cue', 'ccd', 'chd', 'nrg', 'mds', 'iso', 'uae', 'm3u', 'zip', '7z'],
    'desmume': ['nds', 'bin'],
    'desmume2015': ['nds', 'bin'],
    'fbalpha2012_cps1': ['zip'],
    'fbalpha2012_cps2': ['zip'],
    'fbalpha2012_neogeo': ['zip'],
    'fbneo': ['zip', '7z'],
    'fceumm': ['fds', 'nes', 'unif', 'unf'],
    'gambatte': ['gb', 'gbc', 'dmg'],
    'gearcoleco': ['col', 'cv', 'bin', 'rom'],
    'genesis_plus_gx': ['m3u', 'mdx', 'md', 'smd', 'gen', 'bin', 'cue', 'iso', 'chd', 'bms', 'sms', 'gg', 'sg', '68k', 'sgd'],
    'handy': ['lnx'],
    'mame2003': ['zip'],
    'mame2003_plus': ['zip'],
    'mednafen_ngp': ['ngp', 'ngc'],
    'mednafen_pce': ['pce', 'cue', 'ccd', 'iso', 'img', 'bin', 'chd'],
    'mednafen_pcfx': ['cue', 'ccd', 'toc', 'chd'],
    'mednafen_psx': ['cue', 'toc', 'm3u', 'ccd', 'exe', 'pbp', 'chd'],
    'mednafen_wswan': ['ws', 'wsc', 'pc2'],
    'mednafen_psx_hw': ['cue', 'toc', 'm3u', 'ccd', 'exe', 'pbp', 'chd'],
    'beetle_vb': ['vb', 'vboy', 'bin'],
    'melonds': ['nds'],
    'mgba': ['gb', 'gbc', 'gba'],
    'mupen64plus_next': ['n64', 'v64', 'z64', 'bin', 'u1', 'ndd', 'gb'],
    'nestopia': ['fds', 'nes', 'unif', 'unf'],
    'opera': ['iso', 'bin', 'chd', 'cue'],
    'parallel_n64': ['n64', 'v64', 'z64', 'bin', 'u1', 'ndd', 'gb'],
    'pcsx_rearmed': ['bin', 'cue', 'img', 'mdf', 'pbp', 'toc', 'cbn', 'm3u', 'ccd'],
    'picodrive': ['bin', 'gen', 'smd', 'md', '32x', 'cue', 'iso', 'sms', '68k', 'chd'],
    'ppsspp': ['elf', 'iso', 'cso', 'prx', 'pbp'],
    'prosystem': ['a78', 'bin'],
    'snes9x': ['smc', 'sfc', 'swc', 'fig', 'bs', 'st'],
    'stella2014': ['a26', 'bin', 'zip'],
    'vice_x64': ['d64', 'd6z', 'd71', 'd7z', 'd80', 'd81', 'd82', 'd8z', 'g64', 'g6z', 'g41', 'g4z', 'x64', 'x6z', 'nib', 'nbz', 'd2m', 'd4m', 't64', 'tap', 'tcrt', 'prg', 'p00', 'crt', 'bin', 'cmd', 'm3u', 'vfl', 'vsf', 'zip', '7z', 'gz', '20', '40', '60', 'a0', 'b0', 'rom'],
    'virtualjaguar': ['j64', 'jag', 'rom', 'abs', 'cof', 'bin', 'prg'],
    'yabause': ['cue', 'iso', 'ccd', 'mds', 'chd', 'zip', 'm3u']
}