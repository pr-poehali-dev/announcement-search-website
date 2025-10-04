import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "./AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  onNavigate: (page: string) => void;
}

export const Header = ({ onNavigate }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated, login, logout } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <div 
              className="text-2xl font-bold text-primary cursor-pointer flex items-center gap-2"
              onClick={() => onNavigate('home')}
            >
              <Icon name="Store" size={32} />
              <span>Объявления</span>
            </div>
            
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Поиск объявлений..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
                <Icon 
                  name="Search" 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                  size={20} 
                />
              </div>
            </div>

            <nav className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => onNavigate('catalog')}>
                <Icon name="Grid3x3" size={18} className="mr-2" />
                Каталог
              </Button>
              <Button variant="ghost" onClick={() => onNavigate('map')}>
                <Icon name="Map" size={18} className="mr-2" />
                Карта
              </Button>
              
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" onClick={() => onNavigate('messages')}>
                    <Icon name="MessageCircle" size={18} className="mr-2" />
                    Сообщения
                  </Button>
                  <Button variant="ghost" onClick={() => onNavigate('favorites')}>
                    <Icon name="Heart" size={18} className="mr-2" />
                    Избранное
                  </Button>
                  <Button onClick={() => onNavigate('create')} className="bg-accent hover:bg-accent/90">
                    <Icon name="Plus" size={18} className="mr-2" />
                    Разместить
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar>
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {getInitials(user?.name || '')}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user?.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onNavigate('profile')}>
                        <Icon name="User" size={16} className="mr-2" />
                        Профиль
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onNavigate('favorites')}>
                        <Icon name="Heart" size={16} className="mr-2" />
                        Избранное
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onNavigate('messages')}>
                        <Icon name="MessageCircle" size={16} className="mr-2" />
                        Сообщения
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="text-destructive">
                        <Icon name="LogOut" size={16} className="mr-2" />
                        Выйти
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setIsAuthModalOpen(true)}>
                    <Icon name="LogIn" size={18} className="mr-2" />
                    Вход
                  </Button>
                  <Button onClick={() => setIsAuthModalOpen(true)} className="bg-accent hover:bg-accent/90">
                    <Icon name="UserPlus" size={18} className="mr-2" />
                    Регистрация
                  </Button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onAuth={login}
      />
    </>
  );
};
