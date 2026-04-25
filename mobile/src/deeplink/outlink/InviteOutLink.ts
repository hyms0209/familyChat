import { LinkItem } from '../DeepLinkManager'
import { LinkType, OutLink } from '../OutLink'
import { MENU } from '@/src/navigation/NavigationTypes'

// familyhub://invite/{token} → FAMILY.INVITE_JOIN 으로 token 전달
// universal link: https://familyhub.app/invite/{token}
export class InviteOutLink extends OutLink {
    scheme = 'familyhub'
    host = 'invite'
    path = ''
    linkType = LinkType.ToTop
    linkName = 'InviteOutLink'

    getMenu(): LinkItem[] {
        const token =
            this.bundle?.token ??
            (this.uri ? this.uri.pathname.replace(/^\//, '') : undefined)
        return [
            {
                menu: MENU.FAMILY.INVITE_JOIN,
                data: token ? { token } : undefined,
            },
        ]
    }

    getLinkType(): LinkType | null {
        return this.linkType
    }
}
