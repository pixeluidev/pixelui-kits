<script lang="ts">
	import {
		BadgePlusIcon,
		FilePenLineIcon,
		ShieldCheckIcon,
		Trash2Icon,
		UserRoundMinusIcon,
		Wallet2Icon
	} from 'lucide-svelte';

	const actions = [
		{
			title: 'Create a new agreement',
			description: 'Create a new Direct Employee Agreement template.',
			icon: BadgePlusIcon
		},
		{
			title: 'Edit agreement',
			description: 'Edit the Direct Employee Agreement template.',
			icon: FilePenLineIcon
		},
		{
			title: 'Verify identity',
			description: 'Verify your identity to access all features.',
			icon: ShieldCheckIcon
		},
		{
			title: 'Add payment method',
			description: 'Add a new payment method to your account.',
			icon: Wallet2Icon
		},
		{
			title: 'Set to inactive',
			description: 'Deactivate the employee agreement.',
			icon: UserRoundMinusIcon
		},
		{
			title: 'Delete agreement',
			description: 'Delete the employee agreement.',
			icon: Trash2Icon
		}
	];
</script>

<div class="container">
	<div class="flex max-w-sm flex-col gap-3 mx-auto">
		{#each actions as { title, description, icon: Icon } (title)}
			<button
				class="bg-background data-[focus-visible=true]:outline-focus  transition-transform-background relative mx-auto box-border flex h-auto w-full max-w-[500px] flex-col overflow-hidden rounded-lg border px-4 py-2 shadow-sm outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 motion-reduce:transition-none"
			>
				<div
					class="place-content-inherit align-items-inherit relative flex h-full w-full flex-auto flex-row items-start gap-3 overflow-y-auto p-4 text-left break-words"
				>
					<div class="item-center justify-center flex rounded-md border border-gray-100 bg-gray-50 dark:bg-gray-800 dark:border-gray-900 p-2">
						<Icon class="size-6 dark:text-gray-200" />
					</div>
					<div class="flex flex-col dark:text-gray-200">
						<p class="text-base font-bold">{title}</p>
						<p class="text-sm text-gray-400">{description}</p>
					</div>
				</div>
			</button>
		{/each}
	</div>
</div>
