import { CategoryCard } from "./CategoryCard";
import { AdCard } from "./AdCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage = ({ onNavigate }: HomePageProps) => {
  const categories = [
    { name: "Электроника", icon: "Smartphone", count: 12500 },
    { name: "Недвижимость", icon: "Home", count: 8900 },
    { name: "Транспорт", icon: "Car", count: 15600 },
    { name: "Работа", icon: "Briefcase", count: 5400 },
    { name: "Услуги", icon: "Wrench", count: 9800 },
    { name: "Одежда", icon: "Shirt", count: 7200 },
    { name: "Для дома", icon: "Sofa", count: 6700 },
    { name: "Хобби", icon: "Music", count: 4300 },
  ];

  const featuredAds = [
    {
      id: 1,
      title: "iPhone 14 Pro Max 256GB Deep Purple",
      price: 89900,
      image: "https://images.unsplash.com/photo-1678652197950-006b69d0c7d2?w=400&h=300&fit=crop",
      location: "Москва, Арбатская",
      date: "Сегодня, 14:30",
      isPremium: true,
    },
    {
      id: 2,
      title: "2-комнатная квартира, 54 м²",
      price: 12500000,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      location: "Санкт-Петербург",
      date: "Сегодня, 12:15",
    },
    {
      id: 3,
      title: "Toyota Camry 2020, 2.5 AT",
      price: 2450000,
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
      location: "Екатеринбург",
      date: "Вчера, 18:45",
      isPremium: true,
    },
    {
      id: 4,
      title: "Игровой ноутбук ASUS ROG",
      price: 125000,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
      location: "Казань",
      date: "Вчера, 16:20",
    },
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="bg-gradient-to-b from-primary/10 to-transparent py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-foreground mb-4">
            Найдите всё, что нужно
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Более 50 000 объявлений в вашем городе
          </p>
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input 
                  placeholder="Что вы ищете?"
                  className="h-12"
                />
              </div>
              <div className="w-64">
                <Input 
                  placeholder="Город"
                  className="h-12"
                />
              </div>
              <Button 
                size="lg" 
                className="px-8 bg-primary hover:bg-primary/90"
                onClick={() => onNavigate('catalog')}
              >
                <Icon name="Search" size={20} className="mr-2" />
                Найти
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Популярные категории</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-12">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              {...category}
              onClick={() => onNavigate('catalog')}
            />
          ))}
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-6">Рекомендуемые объявления</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAds.map((ad) => (
            <AdCard
              key={ad.id}
              {...ad}
              onClick={() => onNavigate('catalog')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
