import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useState } from "react";

interface HeaderProps {
  onNavigate: (page: string) => void;
}

export const Header = ({ onNavigate }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
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
            <Button variant="ghost" onClick={() => onNavigate('messages')}>
              <Icon name="MessageCircle" size={18} className="mr-2" />
              Сообщения
            </Button>
            <Button variant="ghost" onClick={() => onNavigate('favorites')}>
              <Icon name="Heart" size={18} className="mr-2" />
              Избранное
            </Button>
            <Button variant="ghost" onClick={() => onNavigate('profile')}>
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </Button>
            <Button onClick={() => onNavigate('create')} className="bg-accent hover:bg-accent/90">
              <Icon name="Plus" size={18} className="mr-2" />
              Разместить
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};