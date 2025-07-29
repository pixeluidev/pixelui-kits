<script lang="ts">
	// Import Lucide Icons
	import {
		PieChart,
		Landmark,
		Briefcase,
		DollarSign, // atau CircleDollarSign
		Rocket,
		Cog
	} from '@lucide/svelte';

	// Data untuk fitur (lebih mudah dikelola daripada hardcoding)
	const features = [
		{
			icon: PieChart,
			title: 'Marketing',
			description:
				'Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit your marketing goals every month with our marketing plan.'
		},
		{
			icon: Landmark,
			title: 'Legal',
			description:
				'Protect your organization, devices and stay compliant with our structured workflows and custom permissions made for you.'
		},
		{
			icon: Briefcase,
			title: 'Business Automation',
			description:
				'Auto-assign tasks, send Slack messages, and much more. Now power up with hundreds of new templates to help you get started.'
		},
		{
			icon: DollarSign,
			title: 'Finance',
			description:
				'Audit-proof software built for critical financial operations like month-end close and quarterly budgeting.'
		},
		{
			icon: Rocket,
			title: 'Enterprise Design',
			description:
				'Craft beautiful, delightful experiences for both marketing and product with real cross-company collaboration.'
		},
		{
			icon: Cog,
			title: 'Operations',
			description:
				'Keep your company’s lights on with customizable, iterative, and structured workflows built for all efficient teams and individual.'
		}
	];

	// Definisikan kelas warna primary (konsisten dengan contoh sebelumnya)
	const primaryColorClass = 'text-primary-600 dark:text-primary-300';
	const iconSizeClass = 'w-10 h-10'; // Sesuaikan ukuran ikon jika perlu
</script>

<section class="bg-white antialiased dark:bg-gray-900">
	<div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
		<!-- Hero Header -->
		<div class="mx-auto mb-8 max-w-screen-md text-center lg:mb-16">
			<h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
				Designed for business teams like yours
			</h2>
			<p class="text-gray-500 sm:text-xl dark:text-gray-400">
				Here at Flowbite we focus on markets where technology, innovation, and capital can unlock
				long-term value and drive economic growth.
			</p>
		</div>

		<!-- Feature Grid -->
		<div class="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
			{#each features as feature (feature.title)}
				<div>
					<div
						class="bg-primary-100 dark:bg-primary-900 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12"
					>
						<!-- Render ikon secara dinamis -->
						<svelte:component
							this={feature.icon}
							class="{primaryColorClass} {iconSizeClass} lg:h-6 lg:w-6"
							strokeWidth={2}
						/>
						<!-- Atau jika ingin ukuran tetap: class="{primaryColorClass} w-5 h-5 lg:w-6 lg:h-6" -->
					</div>
					<h3 class="mb-2 text-xl font-bold dark:text-white">{feature.title}</h3>
					<p class="text-gray-500 dark:text-gray-400">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
