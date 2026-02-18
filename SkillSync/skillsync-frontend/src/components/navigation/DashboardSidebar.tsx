import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Zap as SkillsIcon, 
  FolderKanban, 
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/context/SidebarContext';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { title: 'Skills', href: '/skills', icon: <SkillsIcon className="h-5 w-5" /> },
  { title: 'Projects', href: '/projects', icon: <FolderKanban className="h-5 w-5" /> },
];

const bottomNavItems: NavItem[] = [
  { title: 'Profile', href: '/profile', icon: <User className="h-5 w-5" /> },
  { title: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> },
];

export const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  const { isOpen, isCollapsed, isMobile, close, toggle } = useSidebar();

  const isActive = (href: string) => location.pathname === href;

  const NavLink: React.FC<{ item: NavItem }> = ({ item }) => (
    <Link
      to={item.href}
      onClick={() => isMobile && close()}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
        'hover:bg-primary/10 hover:text-primary',
        isActive(item.href) 
          ? 'bg-primary/10 text-primary border-l-2 border-primary' 
          : 'text-muted-foreground',
        isCollapsed && !isMobile && 'justify-center px-2'
      )}
    >
      {item.icon}
      {(!isCollapsed || isMobile) && (
        <span className="font-medium text-sm">{item.title}</span>
      )}
    </Link>
  );

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className={cn(
        'flex items-center gap-2 px-4 py-5 border-b border-border/50',
        isCollapsed && !isMobile && 'justify-center px-2'
      )}>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Zap className="h-5 w-5 text-primary" />
        </div>
        {(!isCollapsed || isMobile) && (
          <span className="text-lg font-bold text-foreground">
            Skill<span className="text-primary">Sync</span>
          </span>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {mainNavItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-3 py-4 border-t border-border/50 space-y-1">
        {bottomNavItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </div>

      {/* Collapse Toggle - Desktop only */}
      {!isMobile && (
        <button
          onClick={toggle}
          className={cn(
            'flex items-center justify-center py-3 border-t border-border/50',
            'text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors'
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      )}
    </>
  );

  // Mobile Sidebar (Overlay)
  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        <div
          className={cn(
            'fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300',
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          onClick={close}
        />
        
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed top-0 left-0 z-50 h-full w-64 bg-sidebar border-r border-sidebar-border',
            'flex flex-col transition-transform duration-300 ease-out',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {sidebarContent}
        </aside>
      </>
    );
  }

  // Desktop/Tablet Sidebar
  return (
    <aside
      className={cn(
        'sticky top-0 h-screen bg-sidebar border-r border-sidebar-border',
        'flex flex-col transition-all duration-300 ease-out',
        isCollapsed ? 'w-16' : 'w-60'
      )}
    >
      {sidebarContent}
    </aside>
  );
};
