// src/lib/data.ts (atau langsung di script jika sederhana)
import type { Icon } from 'lucide-svelte';

// Ikon untuk tab
import Code from 'lucide-svelte/icons/code-2';
import AlertCircle from 'lucide-svelte/icons/alert-circle';
import GitPullRequest from 'lucide-svelte/icons/git-pull-request';
import Play from 'lucide-svelte/icons/play-circle'; // Actions
import Kanban from 'lucide-svelte/icons/kanban-square'; // Projects
import BookOpen from 'lucide-svelte/icons/book-open'; // Wiki
import Shield from 'lucide-svelte/icons/shield'; // Security
import Settings from 'lucide-svelte/icons/settings';

export interface RepoNavItem {
	id: string;
	label: string;
	icon: typeof Icon;
	count?: number; // Optional count for Issues/PRs
	href?: string; // Link (opsional)
}

export interface RepoFileData {
	type: 'file' | 'dir';
	name: string;
	lastCommitMessage: string;
	lastCommitDate: string; // e.g., "2 days ago"
}

// Contoh Data Navigasi Tab
export const repoNavItems: RepoNavItem[] = [
	{ id: 'code', label: 'Code', icon: Code },
	{ id: 'issues', label: 'Issues', icon: AlertCircle, count: 12 },
	{ id: 'pulls', label: 'Pull requests', icon: GitPullRequest, count: 3 },
	{ id: 'actions', label: 'Actions', icon: Play },
	{ id: 'projects', label: 'Projects', icon: Kanban },
	{ id: 'wiki', label: 'Wiki', icon: BookOpen },
	{ id: 'security', label: 'Security', icon: Shield },
	{ id: 'settings', label: 'Settings', icon: Settings }
];

// Contoh Data File
export const repoFilesData: RepoFileData[] = [
	{
		type: 'dir',
		name: '.github',
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
