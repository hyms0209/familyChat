import { LinkItem } from './DeepLinkManager'

export enum LinkType {
    ToMain = 'toMain',
    ToTop = 'toTop',
}

/** ✅ URL 파라미터 추출 함수 */
function getParameter(url: URL): Record<string, string> {
    const params = new URLSearchParams(url.search)
    const result: Record<string, string> = {}
    params.forEach((value, key) => {
        result[key] = value
    })
    return result
}

/** ✅ OutLink 인터페이스 정의 */
export interface OutLinkInterface {
    uri?: URL
    scheme: string
    host: string
    path: string
    linkType: LinkType
    bundle?: Record<string, string>
    linkName: string

    getMenu(): LinkItem[]
    getLinkType(): LinkType | null
    clear(): void
    getParamInfo(): Record<string, string> | null
    get compUriString(): string
}

/** ✅ OutLink 기본 동작을 제공하는 BaseOutLink 클래스 */
export abstract class OutLink implements OutLinkInterface {
    uri?: URL
    bundle?: Record<string, string>
    abstract scheme: string
    abstract host: string
    abstract path: string
    abstract linkType: LinkType
    abstract linkName: string

    get compUriString(): string {
        return `${this.scheme}${this.host}${this.path.replace(/\//g, '')}`
    }

    clear(): void {
        if (this.bundle) {
            this.bundle = {}
        }
        this.uri = undefined
    }

    getParamInfo(): Record<string, string> | null {
        return this.uri ? getParameter(this.uri) : null
    }

    abstract getMenu(): LinkItem[]
    abstract getLinkType(): LinkType | null
}
