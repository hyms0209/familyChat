/**
 * 디자인 시스템 토큰 정의
 * 가족채팅 컬러 팔레트 (04_와이어프레임.md §1.2 기준)
 */

import { Platform } from 'react-native'

// ============================================================================
// 컬러 시스템
// ============================================================================

// Primary 컬러 (살구 코랄 — 가족채팅 메인)
const primary = {
    50: '#FFF0EC',
    100: '#FFD9D0',
    200: '#FFC0B3',
    300: '#FFA797',
    400: '#FF927F',
    500: '#FF7E6B',
    600: '#F0664F',
    700: '#D14E37',
    800: '#A53D27',
    900: '#7A2C1A',
}

// Secondary 컬러 (연한 블루)
const secondary = {
    50: '#EFF7FD',
    100: '#D5E9F8',
    200: '#BADBF3',
    300: '#9FCDED',
    400: '#8CC3EA',
    500: '#7EB6E8',
    600: '#5C9BD0',
    700: '#4480B5',
    800: '#316A99',
    900: '#1F4F73',
}

// Neutral 그레이
const neutral = {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
}

// 시맨틱 컬러
const semantic = {
    success: { light: '#4CAF7A', dark: '#5FC58E' },
    warning: { light: '#F0AD4E', dark: '#FFC069' },
    error: { light: '#E26B6B', dark: '#FF8A8A' },
    info: { light: '#7EB6E8', dark: '#9BC8F0' },
}

// 라이트/다크 모드 컬러
export const Colors = {
    light: {
        primary: primary[500],
        primaryLight: primary[400],
        primaryDark: primary[700],
        primaryBg: primary[50],
        primarySoft: '#FFE8E2',

        secondary: secondary[500],
        secondaryLight: secondary[300],
        secondaryDark: secondary[700],

        background: '#FFFAF5',
        surface: '#FFFFFF',
        surfaceVariant: neutral[50],

        text: '#2A2825',
        textSecondary: '#7A736D',
        textDisabled: neutral[400],
        textOnPrimary: '#FFFFFF',
        textOnSecondary: '#FFFFFF',

        border: neutral[300],
        divider: '#EFE8E0',

        success: semantic.success.light,
        warning: semantic.warning.light,
        error: semantic.error.light,
        info: semantic.info.light,

        tint: primary[500],
        icon: neutral[600],
        tabIconDefault: neutral[600],
        tabIconSelected: primary[500],
    },
    dark: {
        primary: '#FF9580',
        primaryLight: primary[300],
        primaryDark: primary[600],
        primaryBg: primary[900],
        primarySoft: '#3A2A26',

        secondary: '#9BC8F0',
        secondaryLight: secondary[300],
        secondaryDark: secondary[600],

        background: '#1F1B1A',
        surface: '#2A2625',
        surfaceVariant: neutral[900],

        text: '#F5F1EC',
        textSecondary: '#A8A097',
        textDisabled: neutral[600],
        textOnPrimary: '#000000',
        textOnSecondary: '#000000',

        border: neutral[700],
        divider: '#3A332E',

        success: semantic.success.dark,
        warning: semantic.warning.dark,
        error: semantic.error.dark,
        info: semantic.info.dark,

        tint: '#FFFFFF',
        icon: neutral[400],
        tabIconDefault: neutral[400],
        tabIconSelected: '#FFFFFF',
    },
}

export const ColorPalette = {
    primary,
    secondary,
    neutral,
    semantic,
}

// 가족 구성원 컬러 (자동 할당, 04 §1.2)
export const FamilyMemberColors = [
    '#FF7E6B', // 코랄
    '#7EB6E8', // 블루
    '#4CAF7A', // 그린
    '#F0AD4E', // 앰버
    '#B47EE8', // 라벤더 (Premium)
    '#E87EB1', // 핑크 (Premium)
    '#6FBFB6', // 틸 (Premium)
    '#B8A77E', // 모카 (Premium)
] as const

// ============================================================================
// 타이포그래피 시스템
// ============================================================================

export const FontSizes = [
    10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 28, 32,
] as const

export type FontStyle = 'r' | 'm' | 'sb' | 'b'

export const FontStyleMap: Record<FontStyle, { name: string; weight: string }> =
    {
        r: { name: 'Regular', weight: '400' },
        m: { name: 'Medium', weight: '500' },
        sb: { name: 'SemiBold', weight: '600' },
        b: { name: 'Bold', weight: '700' },
    }

export const getLineHeight = (fontSize: number): number => {
    if (fontSize <= 12) return Math.round(fontSize * 1.5)
    if (fontSize <= 16) return Math.round(fontSize * 1.4)
    if (fontSize <= 24) return Math.round(fontSize * 1.3)
    return Math.round(fontSize * 1.2)
}

export const Fonts = Platform.select({
    ios: {
        sans: 'Pretendard',
        sansBold: 'Pretendard-Bold',
        sansMedium: 'Pretendard-Medium',
        sansSemiBold: 'Pretendard-SemiBold',
        mono: 'SFMono-Regular',
    },
    android: {
        sans: 'Pretendard',
        sansBold: 'Pretendard-Bold',
        sansMedium: 'Pretendard-Medium',
        sansSemiBold: 'Pretendard-SemiBold',
        mono: 'monospace',
    },
    web: {
        sans: "Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        sansBold:
            "Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        sansMedium:
            "Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        sansSemiBold:
            "Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
    default: {
        sans: 'Pretendard',
        sansBold: 'Pretendard-Bold',
        sansMedium: 'Pretendard-Medium',
        sansSemiBold: 'Pretendard-SemiBold',
        mono: 'monospace',
    },
})

export const Typography = {
    displayLarge: {
        fontSize: 57,
        lineHeight: 64,
        fontWeight: '400' as const,
        letterSpacing: -0.25,
    },
    displayMedium: {
        fontSize: 45,
        lineHeight: 52,
        fontWeight: '400' as const,
        letterSpacing: 0,
    },
    displaySmall: {
        fontSize: 36,
        lineHeight: 44,
        fontWeight: '400' as const,
        letterSpacing: 0,
    },
    headlineLarge: {
        fontSize: 32,
        lineHeight: 40,
        fontWeight: '600' as const,
        letterSpacing: 0,
    },
    headlineMedium: {
        fontSize: 28,
        lineHeight: 36,
        fontWeight: '600' as const,
        letterSpacing: 0,
    },
    headlineSmall: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '600' as const,
        letterSpacing: 0,
    },
    titleLarge: {
        fontSize: 22,
        lineHeight: 28,
        fontWeight: '600' as const,
        letterSpacing: 0,
    },
    titleMedium: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600' as const,
        letterSpacing: 0.15,
    },
    titleSmall: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '600' as const,
        letterSpacing: 0.1,
    },
    bodyLarge: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '400' as const,
        letterSpacing: 0.5,
    },
    bodyMedium: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400' as const,
        letterSpacing: 0.25,
    },
    bodySmall: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400' as const,
        letterSpacing: 0.4,
    },
    labelLarge: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500' as const,
        letterSpacing: 0.1,
    },
    labelMedium: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '500' as const,
        letterSpacing: 0.5,
    },
    labelSmall: {
        fontSize: 11,
        lineHeight: 16,
        fontWeight: '500' as const,
        letterSpacing: 0.5,
    },
}

// ============================================================================
// 스페이싱
// ============================================================================

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 48,
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
}

// ============================================================================
// Border Radius
// ============================================================================

export const BorderRadius = {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    full: 9999,
}

// ============================================================================
// Shadow
// ============================================================================

export const Shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 2,
        elevation: 1,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 24,
        elevation: 4,
    },
    xl: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.18,
        shadowRadius: 32,
        elevation: 8,
    },
}
