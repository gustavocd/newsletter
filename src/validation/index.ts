import * as v from '@valibot/valibot'

export const SubscribeSchema = v.object({
	email: v.pipe(
		v.string('Your email must be a string.'),
		v.nonEmpty('Please enter your email.'),
		v.email('The email address is badly formatted.')
	)
})

export type Issue = v.InferIssue<typeof SubscribeSchema>

export type Status = 'idle' | 'submitting' | 'success' | 'error'
