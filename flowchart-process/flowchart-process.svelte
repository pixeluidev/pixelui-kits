<script lang="ts">
	import ProcessFlowchart from './flowchart-item.svelte';
	import { exampleFlowchartSteps } from './data';


</script>

<main class="p-10 bg-gray-50 dark:bg-neutral-900 min-h-screen">
	<h1 class="text-2xl font-bold mb-8 text-center dark:text-white">Project Workflow</h1>

	<div class="mb-10">
		<h2 class="text-lg font-semibold mb-4 dark:text-white">Default Flow (Light Theme)</h2>
		<ProcessFlowchart theme="light" />
	</div>

	<div class="mb-10 p-6 bg-neutral-800 rounded-lg">
		<h2 class="text-lg font-semibold mb-4 text-white">Default Flow (Dark Theme)</h2>
		<ProcessFlowchart theme="dark" />
	</div>

	<div class="mb-10">
		<h2 class="text-lg font-semibold mb-4 dark:text-white">Custom Flow Example (Light Theme)</h2>
		<ProcessFlowchart steps={exampleFlowchartSteps} theme="light" />
	</div>

</main>