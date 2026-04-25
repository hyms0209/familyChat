// OutLinker.ts
import { OutLink } from './OutLink'
import { MainOutLink } from './outlink/MainOutLink'
import { InviteOutLink } from './outlink/InviteOutLink'

class OutLinker {
    private static instance: OutLinker
    private mList: OutLink[] = []
    private mCurrentLink: OutLink | null = null

    private constructor() {
        /** 📌 가족채팅 글로벌 커스텀 스키마 링크 */
        this.add(new MainOutLink()) // familyhub://main → 메인 진입
        this.add(new InviteOutLink()) // familyhub://invite/{token} → 가족 초대 가입
    }

    public static getInstance(): OutLinker {
        if (!OutLinker.instance) {
            OutLinker.instance = new OutLinker()
        }
        return OutLinker.instance
    }

    /** ✅ OutLink 객체 추가 (단계 D 에서 외부 호출용으로 노출) */
    public add(linker: OutLink): void {
        this.mList.push(linker)
    }

    /** ✅ URI를 통해 OutLink 객체 찾기 */
    public find(url: string): OutLink | null {
        try {
            const uri = new URL(url)

            const scheme = uri.protocol ? uri.protocol.replace(':', '') : ''
            const host = uri.hostname || ''
            const path = uri.pathname ? uri.pathname.replace(/\//g, '') : ''
            const bundle = this.getParameter(uri)

            const command = `${scheme}${host}${path}`

            for (let link of this.mList) {
                const compString: string = link.compUriString
                console.log(`OutLinker link : ${compString}`)
                console.log(`OutLinker command : ${command}`)

                if (compString === command) {
                    link.uri = uri
                    link.bundle = bundle
                    this.mCurrentLink = link
                    return link
                }
            }
        } catch (error) {
            console.log(`Error: ${error}`)
        }
        return null
    }

    public get current(): OutLink | null {
        return this.mCurrentLink
    }

    public set current(link: OutLink | null) {
        this.mCurrentLink = link
    }

    public removeCurrentLink(): void {
        if (this.mCurrentLink) {
            this.mCurrentLink.clear()
            this.mCurrentLink = null
        }
    }

    public hasOutLink(): boolean {
        return this.mCurrentLink !== null
    }

    private getParameter(uri: URL): Record<string, string> {
        const params = new URLSearchParams(uri.search)
        const result: Record<string, string> = {}
        params.forEach((value, key) => {
            result[key] = value
        })
        return result
    }
}

export default OutLinker.getInstance()
