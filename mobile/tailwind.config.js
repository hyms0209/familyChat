/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./App.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],

    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            // 컬러 시스템 (가족채팅 — 04_와이어프레임.md §1.2)
            colors: {
                // Primary 컬러 (살구 코랄)
                primary: {
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
                    DEFAULT: '#FF7E6B',
                    light: '#FF927F',
                    dark: '#D14E37',
                    soft: '#FFE8E2',
                },
                // Secondary 컬러 (연한 블루)
                secondary: {
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
                    DEFAULT: '#7EB6E8',
                    light: '#9FCDED',
                    dark: '#4480B5',
                },
                // Neutral (poc-bank 의 secondary 그레이를 가족채팅에서는 neutral 로)
                neutral: {
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
                    DEFAULT: '#9E9E9E',
                },
                // 시맨틱 컬러 (04 §1.2)
                success: {
                    light: '#4CAF7A',
                    dark: '#5FC58E',
                    DEFAULT: '#4CAF7A',
                },
                warning: {
                    light: '#F0AD4E',
                    dark: '#FFC069',
                    DEFAULT: '#F0AD4E',
                },
                error: {
                    light: '#E26B6B',
                    dark: '#FF8A8A',
                    DEFAULT: '#E26B6B',
                },
                info: {
                    light: '#7EB6E8',
                    dark: '#9BC8F0',
                    DEFAULT: '#7EB6E8',
                },
            },
            // 폰트 패밀리
            fontFamily: {
                sans: ['Pretendard', 'system-ui', 'sans-serif'],
                'sans-bold': ['Pretendard-Bold', 'system-ui', 'sans-serif'],
                'sans-medium': ['Pretendard-Medium', 'system-ui', 'sans-serif'],
                'sans-semibold': [
                    'Pretendard-SemiBold',
                    'system-ui',
                    'sans-serif',
                ],
                mono: ['SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
            },
            // 타이포그래피 스케일
            fontSize: {
                'display-lg': [
                    '57px',
                    { lineHeight: '64px', letterSpacing: '-0.25px' },
                ],
                'display-md': [
                    '45px',
                    { lineHeight: '52px', letterSpacing: '0px' },
                ],
                'display-sm': [
                    '36px',
                    { lineHeight: '44px', letterSpacing: '0px' },
                ],
                'headline-lg': [
                    '32px',
                    {
                        lineHeight: '40px',
                        letterSpacing: '0px',
                        fontWeight: '600',
                    },
                ],
                'headline-md': [
                    '28px',
                    {
                        lineHeight: '36px',
                        letterSpacing: '0px',
                        fontWeight: '600',
                    },
                ],
                'headline-sm': [
                    '24px',
                    {
                        lineHeight: '32px',
                        letterSpacing: '0px',
                        fontWeight: '600',
                    },
                ],
                'title-lg': [
                    '22px',
                    {
                        lineHeight: '28px',
                        letterSpacing: '0px',
                        fontWeight: '600',
                    },
                ],
                'title-md': [
                    '16px',
                    {
                        lineHeight: '24px',
                        letterSpacing: '0.15px',
                        fontWeight: '600',
                    },
                ],
                'title-sm': [
                    '14px',
                    {
                        lineHeight: '20px',
                        letterSpacing: '0.1px',
                        fontWeight: '600',
                    },
                ],
                'body-lg': [
                    '16px',
                    {
                        lineHeight: '24px',
                        letterSpacing: '0.5px',
                        fontWeight: '400',
                    },
                ],
                'body-md': [
                    '14px',
                    {
                        lineHeight: '20px',
                        letterSpacing: '0.25px',
                        fontWeight: '400',
                    },
                ],
                'body-sm': [
                    '12px',
                    {
                        lineHeight: '16px',
                        letterSpacing: '0.4px',
                        fontWeight: '400',
                    },
                ],
                'label-lg': [
                    '14px',
                    {
                        lineHeight: '20px',
                        letterSpacing: '0.1px',
                        fontWeight: '500',
                    },
                ],
                'label-md': [
                    '12px',
                    {
                        lineHeight: '16px',
                        letterSpacing: '0.5px',
                        fontWeight: '500',
                    },
                ],
                'label-sm': [
                    '11px',
                    {
                        lineHeight: '16px',
                        letterSpacing: '0.5px',
                        fontWeight: '500',
                    },
                ],
            },
            // 스페이싱 (4px 베이스 유닛)
            spacing: {
                xs: '4px',
                sm: '8px',
                md: '16px',
                lg: '24px',
                xl: '32px',
                xxl: '40px',
                xxxl: '48px',
            },
            // Border Radius
            borderRadius: {
                sm: '4px',
                md: '8px',
                lg: '12px',
                xl: '16px',
                '2xl': '20px',
                '3xl': '24px',
            },
        },
    },
    plugins: [require('./tailwind.plugin.font-styles')],
}
