import { RootStackParamList } from '@/src/navigation/NavigationTypes'
import Router from '@/src/navigation/Router'

/** ✅ DeepLink 인터페이스 정의 */
export interface DeepLink {
    moveDeepLink(): void
}

export const localScheme = 'gajok'
export const localHost = 'deeplink'

export type LinkItem = {
    [K in keyof RootStackParamList]: {
        menu: K
        data?: RootStackParamList[K]
    }
}[keyof RootStackParamList]

/** ✅ DeepLink 기본 동작을 제공하는 BaseDeepLink 클래스 */
export abstract class BaseDeepLink implements DeepLink {
    moveDeepLink(): void {
        const linkItem = DeepLinkManager.getInstance().getNextLink()
        if (!linkItem) return
        Router.moveToMenu(linkItem.menu, linkItem.data)
    }
}

/** ✅ DeepLinkManager (싱글톤) */
export class DeepLinkManager {
    private static instance: DeepLinkManager
    private linkList: LinkItem[] = []

    private constructor() {}

    public static getInstance(): DeepLinkManager {
        if (!DeepLinkManager.instance) {
            DeepLinkManager.instance = new DeepLinkManager()
        }
        return DeepLinkManager.instance
    }

    setDeepLink(list: LinkItem[]): void {
        this.linkList = list
    }

    getNextLink(): LinkItem | null {
        if (this.linkList.length === 0) return null
        return this.linkList.shift() || null
    }

    moveDeepLink(): void {
        const linkItem = DeepLinkManager.getInstance().getNextLink()
        if (!linkItem) return
        Router.moveToMenu(linkItem.menu, linkItem.data)
    }

    clear(): void {
        this.linkList = []
    }
}
