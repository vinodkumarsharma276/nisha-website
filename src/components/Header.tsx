import React, { useState } from 'react';
import { Linkedin, Twitter, Menu, X } from 'lucide-react';

const nav = [
	{ id: 'home', label: 'Home' },
	{ id: 'services', label: 'Services' },
	{ id: 'blogs', label: 'Blogs' },
	{ id: 'projects', label: 'Projects' },
	{ id: 'experience', label: 'Experience' },
	{ id: 'contact', label: 'Contact' }
];

const Header: React.FC = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const scrollToSection = (id: string) => {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth' });
		setIsMobileMenuOpen(false);
	};

	return (
		<header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-white/75 border-b border-slate-200/70">
			<div className="container mx-auto flex items-center justify-between px-4 py-3">
				<button onClick={() => scrollToSection('home')} className="flex items-center gap-3 group">
					<div className="w-10 h-10 rounded-md bg-accent-soft flex items-center justify-center text-accent font-bold tracking-tight shadow-sm">N</div>
					<span className="font-semibold text-slate-800 group-hover:text-accent transition-colors">Nisha, CA</span>
				</button>
				<nav className="hidden md:flex items-center gap-8 text-sm font-medium">
					{nav.map(item => (
						<button
							key={item.id}
							onClick={() => scrollToSection(item.id)}
							className="relative text-slate-600 hover:text-accent transition-colors py-2 group"
						>
							{item.label}
							<span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-accent transition-all group-hover:w-full" />
						</button>
					))}
					<div className="flex items-center gap-4 pl-4 ml-4 border-l border-slate-200">
						<a href="https://linkedin.com" aria-label="LinkedIn" className="text-slate-500 hover:text-accent transition-colors"><Linkedin size={18} /></a>
						<a href="https://twitter.com" aria-label="Twitter" className="text-slate-500 hover:text-accent transition-colors"><Twitter size={18} /></a>
					</div>
				</nav>
				<button onClick={() => setIsMobileMenuOpen(p => !p)} className="md:hidden p-2 rounded-md text-slate-600 hover:bg-accent-soft">
					{isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
				</button>
			</div>
			{isMobileMenuOpen && (
				<div className="md:hidden border-t border-slate-200 bg-white/80 backdrop-blur-xl">
					<nav className="flex flex-col px-4 py-4 gap-2">
						{nav.map(item => (
							<button key={item.id} onClick={() => scrollToSection(item.id)} className="text-left px-2 py-2 rounded-md text-slate-700 hover:bg-accent-soft hover:text-accent font-medium">{item.label}</button>
						))}
						<div className="flex items-center gap-5 pt-3 mt-2 border-t border-slate-200">
							<a href="https://linkedin.com" className="text-slate-500 hover:text-accent"><Linkedin size={20} /></a>
							<a href="https://twitter.com" className="text-slate-500 hover:text-accent"><Twitter size={20} /></a>
						</div>
					</nav>
				</div>
			)}
		</header>
	);
};

export default Header;
