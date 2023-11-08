
import zh_CN from './localization/zh-CN.json'
import af_FR from './localization/af-FR.json'
import en from './localization/en.json'
import Extszh_CN from './localization_exts/zh-CN.json'

const strings = {
    zh_CN: Object.assign(zh_CN, Extszh_CN),
    af_FR,
    en
}

export type LocalTypes = keyof typeof strings

export const getStrings = (key?: LocalTypes): any => {
    return strings[key ?? 'zh_CN']
}