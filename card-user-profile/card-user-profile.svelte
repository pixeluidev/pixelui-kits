<script lang="ts">
	import Avatar from '../assets/icons/avatar.svelte';
</script>

<div class="flex flex-col items-center justify-center">
	<div
		class="dark:!bg-navy-800 relative mx-auto flex w-[400px] flex-col items-center rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border p-4 shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:text-white dark:shadow-none"
	>
		<div class="relative flex h-32 w-full justify-center rounded-xl bg-cover">
			<img
				alt="Banner"
				class="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
				src="/images/banner-gradient.png"
			/>
			<div
				class="dark:!border-navy-700 absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border border-[4px] bg-white"
			>
				<Avatar class="size-4/5  rounded-full" />
			</div>
		</div>
		<div class="mt-16 flex flex-col items-center">
			<h4 class="text-navy-700 text-xl font-bold dark:text-white">Hadie Danker</h4>
			<p class="text-base font-normal text-gray-600">Product Manager</p>
		</div>
		<div class="mt-6 mb-3 flex gap-14 md:!gap-14">
			<div class="flex flex-col items-center justify-center">
				<p class="text-navy-700 text-2xl font-bold dark:text-white">17</p>
				<p class="text-sm font-normal text-gray-600">Posts</p>
			</div>
			<div class="flex flex-col items-center justify-center">
				<p class="text-navy-700 text-2xl font-bold dark:text-white">9.7K</p>
				<p class="text-sm font-normal text-gray-600">Followers</p>
			</div>
			<div class="flex flex-col items-center justify-center">
				<p class="text-navy-700 text-2xl font-bold dark:text-white">434</p>
				<p class="text-sm font-normal text-gray-600">Following</p>
			</div>
		</div>
	</div>
</div>
