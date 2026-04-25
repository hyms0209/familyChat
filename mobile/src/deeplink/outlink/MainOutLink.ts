import { LinkItem } from '../DeepLinkManager'
import { LinkType, OutLink } from '../OutLink'
import { MENU } from '@/src/navigation/NavigationTypes'

// familyhub://main → MAIN.HOME 으로 이동
export class MainOutLink extends OutLink {
    scheme = 'familyhub'
    host = 'main'
    path = ''
    linkType = LinkType.ToMain
    linkName = 'MainOutLink'

    getMenu(): LinkItem[] {
        return [{ menu: MENU.MAIN.INDEX }]
    }

    getLinkType(): LinkType | null {
        return this.linkType
    }
}
