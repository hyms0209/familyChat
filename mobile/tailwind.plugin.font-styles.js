/**
 * Tailwind 플러그인: Pretendard 폰트 스타일 자동 생성
 *
 * 사용법: font{크기}{스타일}
 * 예시: font13sb, font16r, font20b
 *
 * 크기: 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 28, 32
 * 스타일: r(Regular), m(Medium), sb(SemiBold), b(Bold)
 */

module.exports = function ({ addUtilities, theme }) {
    // 지원하는 폰트 크기 (일반적인 모바일 앱 크기)
    const fontSizes = [10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 28, 32]

    // 폰트 스타일 매핑
    const fontStyles = {
        r: {
            fontFamily: 'Pretendard',
            fontWeight: '400',
        },
        m: {
            fontFamily: 'Pretendard-Medium',
            fontWeight: '500',
        },
        sb: {
            fontFamily: 'Pretendard-SemiBold',
            fontWeight: '600',
        },
        b: {
            fontFamily: 'Pretendard-Bold',
            fontWeight: '700',
        },
    }

    // lineHeight 자동 계산 (일반적으로 fontSize의 1.2~1.5배)
    const getLineHeight = (fontSize) => {
        if (fontSize <= 12) return Math.round(fontSize * 1.5)
        if (fontSize <= 16) return Math.round(fontSize * 1.4)
        if (fontSize <= 24) return Math.round(fontSize * 1.3)
        return Math.round(fontSize * 1.2)
    }

    const utilities = {}

    // 각 크기와 스타일 조합에 대해 유틸리티 클래스 생성
    fontSizes.forEach((size) => {
        Object.keys(fontStyles).forEach((style) => {
            const className = `font${size}${style}`
            const styleConfig = fontStyles[style]
            const lineHeight = getLineHeight(size)

            utilities[`.${className}`] = {
                fontSize: `${size}px`,
                lineHeight: `${lineHeight}px`,
                fontFamily: styleConfig.fontFamily,
                fontWeight: styleConfig.fontWeight,
            }
        })
    })

    addUtilities(utilities)
}
