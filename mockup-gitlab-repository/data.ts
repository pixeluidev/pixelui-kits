// --- Tipe File (Sama seperti sebelumnya) ---
export interface RepoFileData {
	type: 'file' | 'dir';
	name: string;
	lastCommitMessage: string;
	lastCommitDate: string;
}

// --- GitLab Sidebar Items ---
import {
	AlertCircle,
	Book,
	Code2,
	GitCommit,
	GitMerge,
	Info,
	Monitor,
	Package,
	Rocket,
	Settings,
	Shield
} from '@lucide/svelte';

export interface GitlabSidebarItem {
	id: string;
	label: string;
	icon: typeof AlertCircle;
	href?: string;
	isActive?: boolean; // Tandai item aktif
	isSection?: boolean; // Tandai sebagai judul section
	children?: GitlabSidebarItem[]; // Untuk submenu (tidak diimplementasikan di contoh ini)
}

export const gitlabSidebarItems: GitlabSidebarItem[] = [
	{
		id: 'project-info',
		label: 'Project information',
		icon: Info,
		isActive: false,
		isSection: true
	},
	{ id: 'activity', label: 'Activity', icon: Book, href: '#' },
	{ id: 'repository', label: 'Repository', icon: Code2, isActive: true }, // Contoh aktif
	{ id: 'issues', label: 'Issues', icon: AlertCircle, href: '#' }, // Impor AlertCircle
	{ id: 'merge-requests', label: 'Merge requests', icon: GitMerge, href: '#' },
	{ id: 'ci-cd', label: 'CI/CD', icon: Rocket, isSection: true },
	{ id: 'pipelines', label: 'Pipelines', icon: GitCommit, href: '#' }, // Menggunakan GitCommit untuk pipeline
	{ id: 'deployments', label: 'Deployments', icon: Rocket, href: '#' },
	{ id: 'packages', label: 'Packages & Registries', icon: Package, href: '#' },
	{ id: 'operations', label: 'Operations', icon: Monitor, isSection: true },
	{ id: 'security', label: 'Security & Compliance', icon: Shield, href: '#' },
	{ id: 'settings', label: 'Settings', icon: Settings, isSection: true }
	// Tambahkan item lain sesuai kebutuhan
];

// --- GitLab Tabs (Subset dari Sidebar seringkali) ---
export const gitlabTabItems: Pick<GitlabSidebarItem, 'id' | 'label' | 'href'>[] = [
	{ id: 'repository', label: 'Repository', href: '#' },
	{ id: 'commits', label: 'Commits', href: '#' }, // Contoh tab tambahan
	{ id: 'branches', label: 'Branches', href: '#' },
	{ id: 'tags', label: 'Tags', href: '#' },
	{ id: 'contributors', label: 'Contributors', href: '#' },
	{ id: 'graph', label: 'Graph', href: '#' }
];

// --- Contoh Data Lain ---
export const gitlabRepoData = {
	groupName: 'pixeluidev',
	projectName: 'dashboard-template',
	description: 'Central repository for the company-wide design system components and guidelines.',
	isPrivate: false,
	currentBranch: 'main',
	stars: 88,
	forks: 15
};

// Contoh Data File
export const repoFilesData: RepoFileData[] = [
	{
		type: 'dir',
		name: '.idea',
		lastCommitMessage: 'Update workflow triggers',
		lastCommitDate: '1 day ago'
	},
	{
		type: 'dir',
		name: 'src',
		lastCommitMessage: 'Refactor component structure',
		lastCommitDate: '6 hours ago'
	},
	{
		type: 'file',
		name: '.gitignore',
		lastCommitMessage: 'Add node_modules',
		lastCommitDate: '3 days ago'
	},
	{
		type: 'file',
		name: '.gitlab-ci.yml',
		lastCommitMessage: 'Deploy to server',
		lastCommitDate: '1 days ago'
	},
	{
		type: 'file',
		name: 'README.md',
		lastCommitMessage: 'Initial commit',
		lastCommitDate: '5 days ago'
	},
	{
		type: 'file',
		name: 'package.json',
		lastCommitMessage: 'Update dependencies',
		lastCommitDate: '2 hours ago'
	},
	{
		type: 'file',
		name: 'svelte.config.js',
		lastCommitMessage: 'Configure adapter',
		lastCommitDate: '4 days ago'
	}
];
