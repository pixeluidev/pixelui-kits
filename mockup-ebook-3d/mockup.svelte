<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	// --- Props ---
	/** URL gambar cover depan */
	export let coverImageUrl: string;
	/** Alt text untuk gambar cover */
	export let altText: string = 'Ebook Cover';
	/** Warna dasar untuk tepi halaman */
	export let pageColor: string = 'bg-neutral-100 dark:bg-neutral-700';
	/** Warna dasar untuk sisi spine */
	export let spineColor: string = 'bg-neutral-200 dark:bg-neutral-600';
	/** Ketebalan buku dalam piksel (pengaruhi lebar spine & pages) */
	export let thickness: number = 24; // Sesuaikan ketebalan default
	/** Lebar cover buku (pengaruhi ukuran keseluruhan) */
	export let width: number = 200; // Lebar default dalam piksel
	/** Tinggi cover buku */
	export let height: number = 280; // Tinggi default dalam piksel
	/** Kelas CSS tambahan untuk wrapper terluar */
	export let className: string = '';
	/** Rotasi Y awal (derajat) */
	export let initialRotationY: number = -25;
	/** Rotasi Y saat hover (derajat) */
	export let hoverRotationY: number = -10;
	/** Rotasi X awal (derajat) */
	export let initialRotationX: number = 10;
	/** Rotasi X saat hover (derajat) */
	export let hoverRotationX: number = 5;

	// --- State & Animation ---
	let isHovered = false;
	// Gunakan tweened untuk animasi rotasi yang mulus
	const rotationY = tweened(initialRotationY, { duration: 400, easing: cubicOut });
	const rotationX = tweened(initialRotationX, { duration: 400, easing: cubicOut });

	function handleMouseEnter() {
		isHovered = true;
		rotationY.set(hoverRotationY);
		rotationX.set(hoverRotationX);
	}

	function handleMouseLeave() {
		isHovered = false;
		rotationY.set(initialRotationY);
		rotationX.set(initialRotationX);
	}

	// --- Styles ---
	// Definisikan variabel CSS untuk ukuran dinamis
	$: bookStyle = `
        --book-width: ${width}px;
        --book-height: ${height}px;
        --book-thickness: ${thickness}px;
        width: var(--book-width);
        height: var(--book-height);
        transform: rotateX(${$rotationX}deg) rotateY(${$rotationY}deg);
    `;

	// Style untuk elemen individual (inline untuk akses mudah ke variabel)
	const coverStyle = 'transform: translateZ(calc(var(--book-thickness) / 2));';
	const spineStyle =
		'width: var(--book-thickness); transform: rotateY(-90deg) translateX(calc(-1 * var(--book-thickness))) translateZ(calc(-1 * var(--book-thickness) / 2));';
	const pagesStyle = 'width: var(--book-thickness); ';

	// Gradient untuk simulasi halaman bertumpuk
	const pageGradient = `repeating-linear-gradient(to right, rgba(0,0,0,0.05), rgba(0,0,0,0.05) 1px, transparent 1px, transparent 3px)`;
</script>

<!-- Wrapper luar untuk perspektif & centering -->
<div class="perspective flex items-center justify-center p-10 {className}">
	<!-- Kontainer buku untuk 3D & hover -->
	<div
		aria-label={altText}
		class="book preserve-3d relative transition-transform duration-500 ease-out"
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
		role="img"
		style={bookStyle}
	>
		<!-- 1. Cover Depan -->
		<div
			class="book-cover absolute inset-0 overflow-hidden rounded-r-md shadow-lg backface-hidden"
			style={coverStyle}
		>
			<img alt={altText} class="h-full w-full object-cover" loading="lazy" src={coverImageUrl} />
		</div>

		<!-- 2. Sisi Spine (Kiri) -->
		<div
			class="book-spine transform-origin-left absolute top-0 left-0 h-full rounded-l-sm shadow-inner backface-hidden"
			class:spineColor
			style={spineStyle}
		>
			<!-- Optional: Tambahkan sedikit detail pada spine jika mau -->
			<!-- <div class="h-full w-full bg-gradient-to-r from-black/10 via-transparent to-black/5"></div> -->
		</div>

		<!-- 3. Sisi Halaman (Kanan) -->
		<div
			class="book-pages sisi-buku transform-origin-right absolute top-[2px] right-[1px] h-[calc(100%-2px)] translate-x-[calc(var(--book-width)-var(--book-thickness))] translate-z-[calc(20+20px)] rotate-y-5 rounded-r-sm shadow-inner backface-hidden hover:opacity-0"
			class:pageColor
			style={`background-image: ${pageGradient}; ${pagesStyle}`}
		></div>

		<!-- 4. Bayangan Bawah (Opsional) -->
		<!-- Div ini terpisah dan tidak ikut berputar -->
		<div
			class="absolute bottom-[-15px] left-[5%] -z-10 h-[15px] w-[90%] rounded-[50%] bg-black/30 blur-lg filter transition-opacity duration-300 ease-in-out dark:bg-black/50"
			class:opacity-50={!isHovered}
			class:opacity-70={isHovered}
			class:scale-105={isHovered}
		></div>
	</div>
</div>

<style lang="postcss">
    @reference "tailwindcss";
    /* Setup 3D */
    .perspective {
        perspective: 1500px;
    }

    .preserve-3d {
        transform-style: preserve-3d;
    }

    .backface-hidden {
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
    }

    /* Tentukan transform origin agar rotasi benar */
    .book-cover {
        transform-origin: left center;
    }

    .book-spine {
        transform-origin: left center;
    }

    .book-pages {
        transform-origin: right center;
    }

    /* Styling scrollbar tidak relevan untuk komponen ini */
</style>
