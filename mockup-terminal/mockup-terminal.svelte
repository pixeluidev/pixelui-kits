<script lang="ts">
	import TerminalMockup from './mockup.svelte';
</script>

<main class="flex min-h-screen flex-col items-center gap-10 bg-gray-100 p-10 dark:bg-neutral-900">
	<!-- Contoh 1: Tema Gelap (Default) -->
	<div class="w-full max-w-2xl">
		<TerminalMockup contentHeight="h-72" title="~/my-project">
			<!-- Gunakan <pre><code> untuk menjaga format dan semantic -->
			<pre><code
					><span class="text-green-400">user@svelte:</span><span class="text-blue-400"
						>~/my-project</span
					>$ npm install


				<span class="text-gray-400">added 150 packages in 20s</span>

<span class="text-green-400">user@svelte:</span><span class="text-blue-400">~/my-project</span
					>$ npm run dev

<span class="text-yellow-400">> my-svelte-project@0.0.1 dev</span>
<span class="text-yellow-400">> vite dev</span>

<span class="text-cyan-400"> VITE v5.x.x</span> ready in 350 ms

<span class="text-gray-400"> ➜</span> <span class="text-cyan-400"> Local:</span
					> http://localhost:5173/
<span class="text-gray-400"> ➜</span> <span class="text-cyan-400"> Network:</span
					> use --host to expose
<span class="text-gray-400"> ➜</span> <span
						class="text-cyan-400"> press h + enter to show help</span
					>
<span class="text-green-400">user@svelte:</span><span class="text-blue-400">~/my-project</span
					>$ <span class="animate-pulse">▋</span></code
				></pre>
		</TerminalMockup>
	</div>

	<!-- Contoh 2: Tema Terang dengan Tinggi Berbeda -->
	<div class="w-full max-w-lg">
		<TerminalMockup contentHeight="h-60" showCopyButton={false} theme="light" title="C:\Users\Dev">
			<pre><code
					><span class="text-purple-600">PS C:\Users\Dev></span> <span class="text-gray-700"
						>git status</span
					>

On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
<span class="text-purple-600">PS C:\Users\Dev></span> <span class="animate-pulse">▋</span></code
				></pre>
		</TerminalMockup>
	</div>

	<!-- Contoh 3: Tanpa Header -->
	<div class="w-full max-w-md">
		<TerminalMockup contentHeight="h-32" showHeader={false}>
			<pre><code
					>Simple output line 1
Another line of text...
Done.</code
				></pre>
		</TerminalMockup>
	</div>
</main>
