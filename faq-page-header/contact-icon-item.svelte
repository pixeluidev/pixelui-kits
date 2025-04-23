<script lang="ts">
	import type { ContactIconInfo } from './data';

	export let contact: ContactIconInfo;

	// Determine the tag based on whether href exists
	const tag = contact.href ? 'a' : 'div';
</script>

<svelte:element
	this={tag}
	class="group flex items-start gap-4"
	href={contact.href}
	rel={tag === 'a' ? 'noopener noreferrer' : undefined}
	target={tag === 'a' ? '_blank' : undefined}
>
	<div
		class="text-primary mt-1 flex-shrink-0 rounded-md bg-orange-100 p-2 dark:bg-orange-900/50 dark:text-orange-400"
	>
		<svelte:component this={contact.icon} class="h-5 w-5" strokeWidth={2} />
	</div>
	<div>
		<h3 class="text-base font-medium text-gray-800 dark:text-white">{contact.title}</h3>
		<p
			class="text-sm text-gray-500 transition-colors duration-200 dark:text-gray-400"
			class:dark:group-hover:text-orange-400={!!contact.href}
			class:group-hover:text-primary={!!contact.href}
		>
			{contact.description}
		</p>
	</div>
</svelte:element>
