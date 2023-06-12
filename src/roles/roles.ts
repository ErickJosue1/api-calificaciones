export const Role: { [x: string]: 'STUDENT' | 'ADMIN' | 'TEACHER'} = {
    STUDENT: 'STUDENT',
    ADMIN: 'ADMIN',
    TEACHER: 'TEACHER'
}
  
export type Role = typeof Role[keyof typeof Role]