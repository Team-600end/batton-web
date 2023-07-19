// Backend Service에서 내려주는 응답 구조
export interface APIResponse<T = any> {
  statusCode: number // 상태코드
  errorCode: number // 에러코드
  message: string // 메시지
  result: T // 데이터 내용
}