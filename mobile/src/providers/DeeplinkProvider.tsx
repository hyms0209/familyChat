import Router, { navigationRef } from '@/src/navigation/Router'
import * as Linking from 'expo-linking'
import { useEffect } from 'react'
import { useConsumeToTopOutLink } from '@/src/hooks/deeplink/useConsumeToTopLink'
import OutLinker from '@/src/deeplink/OutLinker'
import { DeepLinkManager } from '@/src/deeplink/DeepLinkManager'
import { LinkType } from '@/src/deeplink/OutLink'

export function DeeplinkProvider({ children }: { children: React.ReactNode }) {
    const navigation = navigationRef

    const { consumeToTopOutLink } = useConsumeToTopOutLink()

    // 백그라운드 및 앱종료 상태 딥링크 이벤트 수신
    useEffect(() => {
        const listener = Linking.addEventListener('url', ({ url }) => {
            console.log('🔥 내부 딥링크 감지됨:', url)
            let findLink = OutLinker.find(url)
            if (findLink) {
                console.log('📲 백그라운드 내부 딥링크 감지:', findLink)

                const menus = findLink.getMenu()
                if (menus.length > 0) {
                    console.log(`🔗 ToMain 딥링크 큐 설정: ${menus.length}개`)
                    DeepLinkManager.getInstance().setDeepLink(menus)
                }

                console.log('메인화면이 있는지 체크 :', Router.isExistMain())
                if (Router.isExistMain()) {
                    if (findLink.linkType == LinkType.ToMain) {
                        Router.moveToMain()
                    } else {
                        consumeToTopOutLink()
                    }
                }
            }
        })

        // 콜드 스타트
        Linking.getInitialURL().then((url) => {
            console.log('📲 콜드 스타트 일반실행 : ', url)
            if (url) {
                let findLink = OutLinker.find(url)
                if (findLink) {
                    console.log('📲 콜드 스타트 딥링크 감지:', findLink)

                    const menus = findLink.getMenu()
                    if (menus.length > 0) {
                        console.log(
                            `🔗 콜드 스타트 ToMain 딥링크 큐 설정: ${menus.length}개`
                        )
                        DeepLinkManager.getInstance().setDeepLink(menus)
                    }
                }
            }
        })

        return () => {
            listener.remove()
        }
    }, [])

    // 모든 화면전환 감지
    useEffect(() => {
        const unsubscribe = navigation.addListener('state', () => {
            if (!navigationRef.current) return
            const currentRoute = navigationRef.current.getCurrentRoute()
            if (!currentRoute) return
            console.log(`🚀 화면 변경됨: ${currentRoute.name}`)

            deepLinkCheck()
        })

        return () => {
            unsubscribe()
        }
    }, [])

    function deepLinkCheck() {
        if (Router.isExistMain()) {
            setTimeout(() => {
                DeepLinkManager.getInstance().moveDeepLink()
            }, 300)
        }
    }

    return <>{children}</>
}
