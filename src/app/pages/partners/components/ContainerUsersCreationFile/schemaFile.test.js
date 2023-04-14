import { schema } from './schema'

it('should return correct email', () => {
  expect(schema.email.type('bamba@vivebamba.com')).toBe('bamba@vivebamba.com')
})

it('should return an error if they not match', () => {
  expect(() => schema.email.type('danielvivebamba.com')).toThrow(
    'Ingrese un email válido',
  )
})
