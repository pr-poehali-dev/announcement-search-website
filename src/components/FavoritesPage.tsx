import { AdCard } from "./AdCard";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export const FavoritesPage = () => {
  const favoriteAds = [
    {
      id: 1,
      title: "Toyota Camry 2020, 2.5 AT",
      price: 2450000,
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
      location: "Екатеринбург",
      date: "Вчера, 18:45",
      isPremium: true,
      isFavorite: true,
    },
    {
      id: 2,
      title: "2-комнатная квартира, 54 м²",
      price: 12500000,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      location: "Санкт-Петербург",
      date: "Сегодня, 12:15",
      isFavorite: true,
    },
    {
      id: 3,
      title: "Игровой ноутбук ASUS ROG",
      price: 125000,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
      location: "Казань",
      date: "Вчера, 16:20",
      isFavorite: true,
    },
    {
      id: 4,
      title: "Samsung Galaxy S23 Ultra",
      price: 79900,
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
      location: "Москва",
      date: "Вчера, 14:10",
      isFavorite: true,
    },
  ];

  return (
    <div className="min-h-screen bg-secondary/30 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Icon name="Heart" size={32} className="text-red-500" />
            Избранные объявления
          </h1>
          <Button variant="outline">
            <Icon name="Trash2" size={18} className="mr-2" />
            Очистить всё
          </Button>
        </div>

        {favoriteAds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteAds.map((ad) => (
              <AdCard key={ad.id} {...ad} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Icon name="Heart" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium text-foreground mb-2">
              У вас пока нет избранных объявлений
            </h2>
            <p className="text-muted-foreground">
              Добавляйте понравившиеся объявления в избранное, чтобы не потерять их
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
