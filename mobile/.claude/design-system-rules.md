# Design System Rules - POC Bank (Figma Integration)

This document outlines the design system structure and integration rules for the POC Bank project when working with Figma designs.

## Project Overview

**Framework**: React Native + Expo (v54.0.20)
**Language**: TypeScript (v5.9.2)
**Platform**: Cross-platform (iOS, Android, Web)
**Routing**: Expo Router (file-based routing)
**State Management**: React Query (TanStack Query v5.90.5)

---

## 1. Token Definitions

### Location

`/network-example/constants/theme.ts`

### Color Tokens

The application uses a dual-theme system (light/dark mode) with centralized color definitions:

```typescript
export const Colors = {
    light: {
        text: '#11181C',
        background: '#fff',
        tint: '#0a7ea4',
        icon: '#687076',
        tabIconDefault: '#687076',
        tabIconSelected: '#0a7ea4',
    },
    dark: {
        text: '#ECEDEE',
        background: '#151718',
        tint: '#fff',
        icon: '#9BA1A6',
        tabIconDefault: '#9BA1A6',
        tabIconSelected: '#fff',
    },
}
```

**When implementing Figma designs:**

- Map Figma color variables to the existing `Colors` object
- Add new color tokens to both `light` and `dark` themes
- Use semantic color names (e.g., `text`, `background`, `tint`) rather than specific color values
- Reference colors via `useThemeColor` hook for automatic theme switching

### Typography Tokens

Platform-specific font families are defined with fallbacks:

```typescript
export const Fonts = Platform.select({
    ios: {
        sans: 'system-ui',
        serif: 'ui-serif',
        rounded: 'ui-rounded',
        mono: 'ui-monospace',
    },
    default: {
        sans: 'normal',
        serif: 'serif',
        rounded: 'normal',
        mono: 'monospace',
    },
    web: {
        sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        serif: "Georgia, 'Times New Roman', serif",
        rounded:
            "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
        mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
})
```

**Typography styles** are defined in component StyleSheets (see ThemedText component):

- `default`: fontSize: 16, lineHeight: 24
- `title`: fontSize: 32, fontWeight: 'bold', lineHeight: 32
- `subtitle`: fontSize: 20, fontWeight: 'bold'
- `defaultSemiBold`: fontSize: 16, lineHeight: 24, fontWeight: '600'
- `link`: fontSize: 16, lineHeight: 30, color: '#0a7ea4'

**When implementing Figma text styles:**

- Match Figma typography definitions to existing type variants
- Create new type variants in ThemedText if needed
- Use platform-appropriate font families from `Fonts` object
- Custom fonts should be loaded via `expo-font` and added to `app/_layout.tsx`

### Spacing Tokens

**Current State**: No centralized spacing system exists

**When implementing Figma spacing:**

- Create a `Spacing` export in `constants/theme.ts`
- Use 4px or 8px base unit system
- Example structure:

```typescript
export const Spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
}
```

---

## 2. Component Library

### Location

`/network-example/components/`

### Structure

```
components/
├── themed-text.tsx          # Themed text component with type variants
├── themed-view.tsx          # Themed container component
├── alert-dialog.tsx         # Modal alert dialog
├── hello-wave.tsx           # Animated wave component
├── parallax-scroll-view.tsx # Parallax scrolling container
├── haptic-tab.tsx           # Tab with haptic feedback
├── external-link.tsx        # External link handler
└── ui/                      # Base UI components
    ├── icon-symbol.tsx      # Cross-platform icon component
    ├── icon-symbol.ios.tsx  # iOS-specific SF Symbols
    └── collapsible.tsx      # Expandable section component
```

### Component Architecture

**Base Pattern**: Themed Components with Props Extension

```typescript
// Example: ThemedView
export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
```

**Key Patterns:**

1. Extend native React Native component props (`ViewProps`, `TextProps`)
2. Add theme-specific color overrides (`lightColor`, `darkColor`)
3. Use `useThemeColor` hook for theme-aware styling
4. Combine styles using array notation: `style={[defaultStyles, style]}`

### When Creating Components from Figma

**1. Use Themed Components as Base:**

```typescript
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'
```

**2. Follow Props Pattern:**

```typescript
export type YourComponentProps = ViewProps & {
    lightColor?: string
    darkColor?: string
    variant?: 'primary' | 'secondary'
    // ...other props
}
```

**3. Use StyleSheet.create for Performance:**

```typescript
const styles = StyleSheet.create({
    container: {
        width: 282,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        overflow: 'hidden',
    },
    // ...
})
```

**4. File Naming Convention:**

- Use kebab-case: `alert-dialog.tsx`, `themed-text.tsx`
- Platform-specific: `icon-symbol.ios.tsx`, `use-color-scheme.web.ts`

---

## 3. Frameworks & Libraries

### UI Framework

- **React Native** (v0.81.5) - Core mobile framework
- **Expo** (~54.0.20) - Development platform

### Styling Approach

- **StyleSheet API** (React Native built-in)
- **NO Tailwind/NativeWind** - Use StyleSheet.create()
- **NO Styled Components** - Use inline styles with StyleSheet
- **Theme System**: Custom hook-based theming (`useThemeColor`)

### Key Libraries

```json
{
    "@expo/vector-icons": "^15.0.3", // Icon library
    "@react-navigation/native": "^7.1.8", // Navigation
    "@react-navigation/bottom-tabs": "^7.4.0", // Tab navigation
    "@tanstack/react-query": "^5.90.5", // Server state
    "expo-router": "~6.0.13", // File-based routing
    "react-native-reanimated": "~4.1.1", // Animations
    "axios": "^1.13.1" // HTTP client
}
```

### Build System

- **Bundler**: Metro (Expo default)
- **TypeScript Compiler**: tsc (v5.9.2)
- **Path Aliases**: `@/*` maps to project root

---

## 4. Asset Management

### Location

`/network-example/assets/images/`

### Current Assets

```
assets/images/
├── icon.png                          # App icon (393KB)
├── splash-icon.png                   # Splash screen icon
├── favicon.png                       # Web favicon
├── android-icon-background.png       # Android adaptive icon
├── android-icon-foreground.png       # Android adaptive icon
├── android-icon-monochrome.png       # Android monochrome icon
├── react-logo.png                    # Demo logo
├── react-logo@2x.png                 # 2x resolution
└── react-logo@3x.png                 # 3x resolution
```

### Asset Strategy

**1. Image Import Method:**

```typescript
// Static require (preferred)
<Image source={require('@/assets/images/icon.png')} />

// Or use expo-image for optimization
import { Image } from 'expo-image';
<Image source={require('@/assets/images/icon.png')} />
```

**2. Resolution Variants:**

- Use `@2x` and `@3x` suffixes for high-DPI displays
- React Native automatically selects appropriate resolution

**3. Asset Configuration (app.json):**

```json
{
    "icon": "./assets/images/icon.png",
    "splash": {
        "image": "./assets/images/splash-icon.png",
        "backgroundColor": "#ffffff"
    },
    "android": {
        "adaptiveIcon": {
            "backgroundColor": "#E6F4FE",
            "foregroundImage": "./assets/images/android-icon-foreground.png"
        }
    }
}
```

### When Exporting from Figma

**Image Assets:**

1. Export @1x, @2x, @3x variants
2. Use PNG for images with transparency
3. Use JPEG for photos without transparency
4. Place in `/assets/images/`
5. Use descriptive kebab-case names: `user-avatar.png`

**SVG Assets:**

- **Not directly supported** in React Native
- Convert to react-native-svg components
- Or use `expo-image` with SVG support
- Consider using icon fonts instead

**Optimization:**

- No CDN configuration (local assets only)
- Expo optimizes assets during build
- Use `expo-image` for lazy loading and caching

---

## 5. Icon System

### Location

`/network-example/components/ui/icon-symbol.tsx`

### Implementation

**Platform-Specific Icons:**

- **iOS**: SF Symbols (via `expo-symbols`)
- **Android/Web**: Material Icons (via `@expo/vector-icons`)

**Icon Mapping Pattern:**

```typescript
const MAPPING = {
    'house.fill': 'home', // SF Symbol -> Material Icon
    'paperplane.fill': 'send',
    'chevron.right': 'chevron-right',
} as IconMapping
```

**Usage:**

```typescript
import { IconSymbol } from '@/components/ui/icon-symbol';

<IconSymbol
  name="house.fill"
  size={24}
  color={Colors.light.icon}
/>
```

### Available Icon Libraries

- **MaterialIcons**: `@expo/vector-icons/MaterialIcons`
- **Ionicons**: `@expo/vector-icons/Ionicons`
- **FontAwesome**: `@expo/vector-icons/FontAwesome`
- **SF Symbols**: `expo-symbols` (iOS only)

### When Implementing Figma Icons

**1. Use Existing Icon Mappings:**

- Check [Expo Icons Directory](https://icons.expo.fyi)
- Find Material Icons equivalent for SF Symbols

**2. For Custom Icons:**

```typescript
// Add to MAPPING in icon-symbol.tsx
const MAPPING = {
    'custom.icon.name': 'material-icon-name',
    // ...
}
```

**3. For Complex Custom Icons:**

- Export as SVG from Figma
- Use `react-native-svg` or convert to icon font
- Or use as static image asset

**Naming Convention:**

- Use SF Symbol naming convention (dot-separated)
- Example: `'icon.category.variant'`

---

## 6. Styling Approach

### Methodology

**StyleSheet API** (React Native standard)

### Pattern: Component-Scoped Styles

```typescript
import { StyleSheet } from 'react-native';

export function MyComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    gap: 10,
  },
  text: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    lineHeight: 20,
    color: '#000000',
    textAlign: 'center',
  },
});
```

### Theme Integration

**Use `useThemeColor` Hook:**

```typescript
import { useThemeColor } from '@/hooks/use-theme-color';

export function ThemedComponent() {
  const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');

  return <Text style={{ color: textColor }}>Themed text</Text>;
}
```

**Theme Hook Implementation:**

```typescript
// /hooks/use-theme-color.ts
export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
    const theme = useColorScheme() ?? 'light'
    const colorFromProps = props[theme]

    return colorFromProps || Colors[theme][colorName]
}
```

### Global Styles

**Current State**: No global stylesheet

**For Shared Styles:**

- Add to `constants/theme.ts`
- Or create component wrappers (like ThemedView, ThemedText)

### Responsive Design

**React Native Responsive Patterns:**

1. **Flexbox (Primary Method):**

```typescript
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})
```

2. **Dimensions API:**

```typescript
import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
```

3. **Platform-Specific Styles:**

```typescript
import { Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        ...Platform.select({
            ios: { paddingTop: 44 },
            android: { paddingTop: 20 },
            web: { paddingTop: 0 },
        }),
    },
})
```

### CSS-like Properties (NOT Available)

React Native uses a subset of CSS:

- **Supported**: flexbox, padding, margin, borderRadius, backgroundColor
- **NOT Supported**: float, z-index (use elevation on Android), grid
- **Differences**:
    - `flex: 1` (not `flex: 1 1 auto`)
    - Shadow props differ per platform
    - No className or CSS-in-JS

### When Converting Figma Styles

**1. Extract CSS from Figma Code Panel:**

```css
/* Figma Output */
width: 282px;
padding: 20px 32px;
gap: 10px;
background: #ffffff;
border-radius: 8px;
```

**2. Convert to React Native:**

```typescript
const styles = StyleSheet.create({
    container: {
        width: 282,
        paddingHorizontal: 20,
        paddingVertical: 32,
        gap: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
    },
})
```

**Key Conversions:**

- Remove `px` units (numbers only)
- `padding: 20px 32px` → `paddingHorizontal: 20, paddingVertical: 32`
- `background` → `backgroundColor`
- `gap` is supported in React Native (spacing between flex children)

---

## 7. Project Structure

### Directory Organization

```
network-example/
├── app/                              # Screens & Routing (Expo Router)
│   ├── (tabs)/                       # Tab navigation group
│   │   ├── index.tsx                 # Home screen
│   │   ├── explore.tsx               # Explore screen
│   │   └── _layout.tsx               # Tab layout
│   ├── _layout.tsx                   # Root layout (QueryProvider)
│   └── modal.tsx                     # Modal screen
│
├── components/                       # Reusable UI Components
│   ├── ui/                           # Base/primitive components
│   │   ├── icon-symbol.tsx
│   │   └── collapsible.tsx
│   ├── themed-view.tsx
│   ├── themed-text.tsx
│   └── alert-dialog.tsx
│
├── hooks/                            # Custom Hooks
│   ├── useApi.ts                     # React Query API hooks
│   ├── queryKeys.ts                  # Query cache keys
│   ├── use-theme-color.ts            # Theme color hook
│   └── use-color-scheme.ts           # Dark mode detection
│
├── lib/                              # Libraries & Utilities
│   ├── axios/                        # Axios configuration
│   │   ├── config.ts                 # Interceptors & factory
│   │   └── jsonPlaceholderClient.ts
│   └── logger.ts                     # Network logger
│
├── services/                         # API Service Layer
│   └── jsonPlaceholder.ts            # API endpoint methods
│
├── providers/                        # Context Providers
│   └── QueryProvider.tsx             # React Query Provider
│
├── types/                            # TypeScript Definitions
│   └── api.ts                        # API response types
│
├── constants/                        # Constants & Tokens
│   └── theme.ts                      # Colors & Fonts
│
├── assets/                           # Static Resources
│   └── images/                       # Image files
│
├── app.json                          # Expo configuration
├── package.json                      # Dependencies
└── tsconfig.json                     # TypeScript config
```

### File Naming Conventions

| Type              | Convention      | Example                           |
| ----------------- | --------------- | --------------------------------- |
| Components        | kebab-case      | `alert-dialog.tsx`                |
| Screens           | kebab-case      | `index.tsx`, `explore.tsx`        |
| Hooks             | camelCase       | `useApi.ts`, `use-theme-color.ts` |
| Types             | camelCase       | `api.ts`                          |
| Constants         | camelCase       | `theme.ts`                        |
| Platform-specific | `.platform.tsx` | `icon-symbol.ios.tsx`             |

### Import Aliases

**Configured Path**: `@/*` → `./`

```typescript
// Use absolute imports with @ alias
import { ThemedView } from '@/components/themed-view'
import { Colors } from '@/constants/theme'
import { useApi } from '@/hooks/useApi'
```

### Feature Organization Pattern

**Current Pattern**: Type-based folders (components/, hooks/, services/)

**For New Features from Figma:**

1. **Simple Features**: Add to existing folders

    ```
    components/user-profile.tsx
    hooks/useUserProfile.ts
    ```

2. **Complex Features**: Consider feature-based grouping
    ```
    app/(tabs)/banking/
    ├── _layout.tsx
    ├── account-list.tsx
    ├── account-detail.tsx
    └── components/
        ├── account-card.tsx
        └── transaction-item.tsx
    ```

---

## 8. Figma Integration Workflow

### Step 1: Inspect Figma Design

**Extract from Figma:**

1. **Colors**: Add to `constants/theme.ts` → `Colors.light` / `Colors.dark`
2. **Text Styles**: Map to ThemedText type variants or create new ones
3. **Spacing**: Extract padding/gap values, consider creating spacing tokens
4. **Components**: Identify reusable patterns vs screen-specific elements
5. **Icons**: Check if available in Material Icons or SF Symbols
6. **Images**: Export @1x, @2x, @3x variants

### Step 2: Component Generation

**Using MCP Figma Tools:**

```typescript
// Use get_design_context tool with:
// - nodeId: extracted from Figma URL (e.g., "1:2")
// - clientFrameworks: "react-native,expo"
// - clientLanguages: "typescript"
```

**Generated Code Adjustments:**

1. Replace CSS-in-JS with StyleSheet.create()
2. Replace HTML elements with React Native equivalents:
    - `div` → `View`
    - `span`/`p` → `Text`
    - `button` → `Pressable` or `TouchableOpacity`
    - `img` → `Image` from 'react-native' or 'expo-image'
3. Convert CSS properties to React Native style props
4. Use themed components (ThemedView, ThemedText) for color integration
5. Replace hardcoded colors with `useThemeColor` references

### Step 3: Responsive Adaptation

**Convert Fixed Dimensions:**

```typescript
// Figma: width: 375px (iPhone width)
// React Native: Use flex or percentage
const styles = StyleSheet.create({
    container: {
        flex: 1, // Full width
        paddingHorizontal: 20, // Fixed padding
    },
    card: {
        width: '90%', // Responsive width
    },
})
```

**Use Dimensions for Breakpoints:**

```typescript
import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
const isTablet = width >= 768

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: isTablet ? 40 : 20,
    },
})
```

### Step 4: Asset Integration

**Images:**

1. Export from Figma (PNG/JPEG)
2. Create @2x and @3x variants
3. Place in `/assets/images/`
4. Import: `require('@/assets/images/name.png')`

**Icons:**

1. Find equivalent in [Expo Icons](https://icons.expo.fyi)
2. Add mapping to `icon-symbol.tsx`
3. Use `<IconSymbol name="..." />`

### Step 5: Theme Integration

**Dynamic Colors:**

```typescript
// Replace Figma hex colors
// FROM: backgroundColor: '#FFFFFF'
// TO:
const backgroundColor = useThemeColor({}, 'background')
```

**Text Colors:**

```typescript
// Use ThemedText component
<ThemedText type="title">Hello</ThemedText>

// Or use hook
const textColor = useThemeColor({}, 'text');
<Text style={{ color: textColor }}>Hello</Text>
```

### Step 6: Interactive States

**Pressable States:**

```typescript
import { Pressable } from 'react-native';

<Pressable
  style={({ pressed }) => [
    styles.button,
    pressed && styles.buttonPressed
  ]}
  onPress={handlePress}
>
  <Text>Click Me</Text>
</Pressable>
```

**Haptic Feedback (Native Feel):**

```typescript
import * as Haptics from 'expo-haptics'

const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    // Action...
}
```

---

## 9. Design System Checklist

When implementing a Figma design, verify:

- [ ] **Colors** match `constants/theme.ts` definitions
- [ ] **Typography** uses ThemedText types or defines new variants
- [ ] **Spacing** follows consistent scale (consider adding tokens)
- [ ] **Components** use StyleSheet.create() (not CSS-in-JS)
- [ ] **Theme support** via useThemeColor for dynamic colors
- [ ] **Icons** use IconSymbol component with proper mappings
- [ ] **Images** exported @1x, @2x, @3x and placed in assets/
- [ ] **Import aliases** use `@/` prefix
- [ ] **Platform differences** handled (iOS vs Android vs Web)
- [ ] **Responsive** layout uses flex, not fixed widths
- [ ] **Accessibility** labels added to interactive elements
- [ ] **TypeScript** types defined for all props and data

---

## 10. Code Examples

### Example: Converting Figma Button to React Native

**Figma CSS Output:**

```css
.button {
    width: 282px;
    height: 48px;
    background: #1774ff;
    border-radius: 8px;
    font-family: 'Pretendard';
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
}
```

**React Native Component:**

```typescript
import { Pressable, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export function Button({ title, onPress }: ButtonProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed
      ]}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 282,
    height: 48,
    backgroundColor: '#1774FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
```

### Example: Themed Card Component

```typescript
import { View, Text, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface CardProps {
  title: string;
  description: string;
}

export function Card({ title, description }: CardProps) {
  const borderColor = useThemeColor(
    { light: '#E5E5E5', dark: '#2A2A2A' },
    'icon'
  );

  return (
    <ThemedView style={[styles.card, { borderColor }]}>
      <ThemedText type="subtitle">{title}</ThemedText>
      <ThemedText type="default">{description}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
});
```

---

## 11. Common Pitfalls & Solutions

### ❌ Using Web CSS

```typescript
// WRONG
<div className="container">
  <style>{`.container { display: flex; }`}</style>
</div>
```

### ✅ Use React Native StyleSheet

```typescript
// CORRECT
<View style={styles.container} />

const styles = StyleSheet.create({
  container: { flexDirection: 'row' }
});
```

---

### ❌ Fixed Pixel Widths

```typescript
// WRONG (not responsive)
const styles = StyleSheet.create({
    container: { width: 375 }, // iPhone width
})
```

### ✅ Flexible Layouts

```typescript
// CORRECT
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
})
```

---

### ❌ Hardcoded Theme Colors

```typescript
// WRONG (no dark mode support)
<Text style={{ color: '#000000' }}>Text</Text>
```

### ✅ Theme-Aware Colors

```typescript
// CORRECT
<ThemedText>Text</ThemedText>
// OR
const color = useThemeColor({}, 'text');
<Text style={{ color }}>Text</Text>
```

---

### ❌ Importing Images from Web URLs

```typescript
// WRONG
<Image source={{ uri: 'https://example.com/image.png' }} />
```

### ✅ Use Local Assets

```typescript
// CORRECT
<Image source={require('@/assets/images/icon.png')} />
```

---

## 12. Resources

### Expo Documentation

- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Expo Image](https://docs.expo.dev/versions/latest/sdk/image/)
- [Expo Icons](https://icons.expo.fyi)

### React Native Documentation

- [StyleSheet API](https://reactnative.dev/docs/stylesheet)
- [Flexbox Layout](https://reactnative.dev/docs/flexbox)
- [Platform-specific Code](https://reactnative.dev/docs/platform-specific-code)

### Design System References

- [React Native Express - Styling](https://www.reactnative.express/core_components/styling)
- [Material Design for Mobile](https://m3.material.io/)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

---

## Summary

This design system is built around:

1. **Centralized tokens** in `constants/theme.ts`
2. **Themed components** (ThemedView, ThemedText) for automatic dark mode
3. **StyleSheet API** for styling (no CSS-in-JS)
4. **Component-scoped styles** following React Native patterns
5. **Platform-aware** implementations (iOS/Android/Web)
6. **TypeScript-first** with full type safety
7. **Expo ecosystem** integration for cross-platform support

When integrating Figma designs, prioritize consistency with existing patterns while extending the design system thoughtfully.
