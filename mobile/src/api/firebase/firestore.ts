// Firestore 서비스 계층. 단계 P-5.5 에서 실제 도큐먼트 스키마/구독 구현.
// 03_기술설계서.md §3.6.1 / §4.1 참조.

export const familyApi = {
    // subscribeToFamily(familyId, cb): unsubscribe
    // updateFamily(familyId, data): Promise<void>
    // listMembers(familyId): Promise<FamilyMember[]>
}

export const chatApi = {
    // subscribeToMessages(familyId, chatId, cb): unsubscribe
    // sendMessage(familyId, chatId, message): Promise<string>
    // markRead(familyId, chatId, userId): Promise<void>
}

export const eventApi = {
    // listEvents(familyId, range): Promise<Event[]>
    // upsertEvent(familyId, event): Promise<string>
}

export const academyApi = {
    // listAcademies(familyId): Promise<Academy[]>
}

export const locationApi = {
    // subscribeToFamilyLocations(familyId, cb): unsubscribe
    // updateMyLocation(familyId, userId, point): Promise<void>
}

export const notificationApi = {
    // subscribeToNotifications(userId, cb): unsubscribe
    // markRead(userId, notificationId): Promise<void>
}
