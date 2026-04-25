// 03_기술설계서.md §3.6.3 — 가족채팅 도메인 중앙 query key 레지스트리.
export const queryKeys = {
    family: {
        all: ['family'] as const,
        detail: (id: string) => ['family', id] as const,
        members: (id: string) => ['family', id, 'members'] as const,
    },
    chat: {
        list: (familyId: string) => ['chat', familyId] as const,
        room: (familyId: string, chatId: string) =>
            ['chat', familyId, chatId] as const,
        messages: (familyId: string, chatId: string) =>
            ['chat', familyId, chatId, 'messages'] as const,
    },
    event: {
        list: (familyId: string) => ['event', familyId] as const,
        detail: (familyId: string, eventId: string) =>
            ['event', familyId, eventId] as const,
    },
    academy: {
        list: (familyId: string) => ['academy', familyId] as const,
    },
    location: {
        family: (familyId: string) => ['location', familyId] as const,
    },
    notifications: {
        list: (userId: string) => ['notifications', userId] as const,
    },
} as const
