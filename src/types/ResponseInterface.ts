// Backend Service에서 내려주는 응답 구조
export interface APIResponse<T = any> {
    isSuccess: boolean // 성공여부
    message: string // 메시지
    code: number // 백엔드 커스텀 코드
    result: T // 실제 return data
}