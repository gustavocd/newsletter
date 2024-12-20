<script lang="ts">
	import * as v from '@valibot/valibot'
	import CheckFill from '$components/CheckFill.svelte'
	import { SubscribeSchema } from '$validation'
	import type { EventHandler } from 'svelte/elements'
	import type { Status, Issue } from '$validation'

	let email = $state('')
	let loading = $state<Status>('idle')
	let errors = $state<Issue[]>([])

	const handleSubmit: EventHandler<SubmitEvent> = event => {
		event.preventDefault()
		const result = v.safeParse(SubscribeSchema, { email })
		if (!result.success) {
			errors = result.issues
			return
		}
		errors = []
		loading = 'submitting'
		console.log(`You have successfully subscribed with the email ${email}`)
		setTimeout(() => {
			loading = 'success'
			email = ''
		}, 400)
	}
</script>

<main class="mx-auto max-w-7xl flex-row items-center gap-8 p-8 md:h-screen lg:flex">
	<article class="mb-4">
		<h1 class="mb-16 text-5xl text-neutral-900">
			Get the finest curated abstracts delivered weekly to your inbox
		</h1>
		<ul class="mb-14 flex flex-col gap-5 text-neutral-600">
			<li class="flex">
				<CheckFill className="mr-3" /> Exclusive access to new abstract images and collections
			</li>
			<li class="flex">
				<CheckFill className="mr-3" /> Unlock special promotions only for subscribers
			</li>
			<li class="flex">
				<CheckFill className="mr-3" /> Regular doses of artistic inspiration
			</li>
		</ul>
		<form action="#" onsubmit={handleSubmit}>
			<fieldset class="mb-3 flex flex-col gap-3 lg:flex-row">
				<div class="w-full">
					<input
						class:border-red-500={errors.length > 0}
						class:focus:border-red-500={errors.length > 0}
						class="mb-3 h-10 w-full rounded border-neutral-200 bg-neutral-50 text-neutral-900 outline-none"
						name="email"
						id="email"
						placeholder="Enter your email"
						bind:value={email}
					/>
					{#if errors.length > 0}
						<ul class="mb-4 text-red-500">
							{#each errors as error}
								<li>{error.message}</li>
							{/each}
						</ul>
					{/if}
					<span class="text-neutral-600">We only send you the best! No spam.</span>
				</div>
				<button
					class="flex h-10 w-full items-center justify-center rounded bg-indigo-700 p-3 text-white hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-90 md:w-32"
					disabled={email === '' || loading === 'submitting'}
					type="submit"
				>
					{#if loading === 'submitting'}
						Subscribing...
					{:else}
						Subscribe
					{/if}
				</button>
			</fieldset>
		</form>
	</article>
	<img src="/abstract.png" class="w-full" alt="Abstract art for the newsletter" />
</main>
