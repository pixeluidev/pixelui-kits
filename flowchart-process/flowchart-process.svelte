<script lang="ts">
	import ProcessFlowchart from './flowchart-item.svelte';
	import { exampleFlowchartSteps } from './data';
</script>

<main class="min-h-screen bg-gray-50 p-10 dark:bg-neutral-900">
	<h1 class="mb-8 text-center text-2xl font-bold dark:text-white">Project Workflow</h1>

	<div class="mb-10">
		<h2 class="mb-4 text-lg font-semibold dark:text-white">Default Flow (Light Theme)</h2>
		<ProcessFlowchart theme="light" />
	</div>

	<div class="mb-10 rounded-lg bg-neutral-800 p-6">
		<h2 class="mb-4 text-lg font-semibold text-white">Default Flow (Dark Theme)</h2>
		<ProcessFlowchart theme="dark" />
	</div>

	<div class="mb-10">
		<h2 class="mb-4 text-lg font-semibold dark:text-white">Custom Flow Example (Light Theme)</h2>
		<ProcessFlowchart steps={exampleFlowchartSteps} theme="light" />
	</div>
</main>
