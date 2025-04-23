<script lang="ts">
	import EbookMockup3D from './mockup.svelte';
</script>

<main
	class="grid min-h-screen grid-cols-1 place-items-center gap-16 bg-gray-100 p-10 md:grid-cols-2 lg:grid-cols-3 dark:bg-neutral-900"
>
	<!-- Contoh 1 -->
	<EbookMockup3D
		altText="Designing for the Web Ebook"
		coverImageUrl="/images/ebook-cover-design.jpg"
		height={480}
		spineColor="bg-blue-700 dark:bg-blue-800"
		thickness={28}
		width={300}
	/>

	<!-- Contoh 2 -->
	<EbookMockup3D
		altText="Minimalist Cookbook"
		coverImageUrl="/images/ebook-cover-minimal.png"
		height={250}
		hoverRotationY={-15}
		initialRotationY={-30}
		pageColor="bg-amber-50 dark:bg-amber-900/30"
		spineColor="bg-amber-700 dark:bg-amber-800"
		thickness={20}
		width={190}
	/>

	<!-- Contoh 3 -->
	<EbookMockup3D
		altText="Fantasy Novel Ebook"
		coverImageUrl="/images/ebook-cover-fantasy.webp"
		height={280}
		hoverRotationX={0}
		hoverRotationY={0}
		initialRotationX={5}
		initialRotationY={-20}
		pageColor="bg-stone-200 dark:bg-stone-600"
		spineColor="bg-stone-800 dark:bg-stone-900"
		thickness={32}
		width={200}
	/>
</main>
