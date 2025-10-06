export interface Certificate {
  id: string
  name: string
  moduleName: string
  issueDate: string
  expiryDate?: string
  score: number
  verificationCode: string
  status: 'active' | 'expired' | 'revoked'
  recipientName: string
  organization: string
}
