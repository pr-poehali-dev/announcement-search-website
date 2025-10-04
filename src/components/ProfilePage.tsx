import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AdCard } from "./AdCard";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/contexts/AuthContext";

export const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();

  const userAds = [
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
      title: "MacBook Pro 16 M2 Max",
      price: 289000,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      location: "Москва",
      date: "2 дня назад",
    },
  ];

  const favoriteAds = [
    {
      id: 3,
      title: "Toyota Camry 2020, 2.5 AT",
      price: 2450000,
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
      location: "Екатеринбург",
      date: "Вчера, 18:45",
      isFavorite: true,
    },
    {
      id: 4,
      title: "2-комнатная квартира, 54 м²",
      price: 12500000,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      location: "Санкт-Петербург",
      date: "Сегодня, 12:15",
      isFavorite: true,
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <Icon name="UserX" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Войдите в аккаунт</h2>
            <p className="text-muted-foreground mb-6">
              Для просмотра профиля необходимо войти в систему
            </p>
            <Button className="w-full">
              <Icon name="LogIn" size={18} className="mr-2" />
              Войти
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground mb-2">{user.name}</h1>
                <p className="text-muted-foreground mb-1">{user.email}</p>
                <p className="text-sm text-muted-foreground mb-3">На сайте с октября 2024</p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Icon name="Package" size={18} className="text-primary" />
                    <span className="text-sm">{userAds.length} объявлений</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Star" size={18} className="text-accent" />
                    <span className="text-sm">4.8 рейтинг</span>
                  </div>
                </div>
              </div>
              <Button variant="outline">
                <Icon name="Settings" size={18} className="mr-2" />
                Настройки
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="my-ads" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="my-ads">Мои объявления</TabsTrigger>
            <TabsTrigger value="favorites">Избранное</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          </TabsList>

          <TabsContent value="my-ads" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userAds.map((ad) => (
                <AdCard key={ad.id} {...ad} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteAds.map((ad) => (
                <AdCard key={ad.id} {...ad} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Icon name="Eye" size={20} className="text-primary" />
                    Просмотры
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-foreground">1,248</p>
                  <p className="text-sm text-muted-foreground mt-1">за последние 7 дней</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Icon name="Phone" size={20} className="text-accent" />
                    Звонки
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-foreground">34</p>
                  <p className="text-sm text-muted-foreground mt-1">за последние 7 дней</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Icon name="Heart" size={20} className="text-red-500" />
                    В избранном
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-foreground">87</p>
                  <p className="text-sm text-muted-foreground mt-1">пользователей</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Рекомендации по продвижению</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                  <Icon name="TrendingUp" size={20} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Используйте премиум-продвижение</h4>
                    <p className="text-sm text-muted-foreground">
                      Объявления с премиум получают на 300% больше просмотров
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                  <Icon name="Image" size={20} className="text-accent mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Добавьте качественные фото</h4>
                    <p className="text-sm text-muted-foreground">
                      Объявления с 5+ фотографиями продаются в 2 раза быстрее
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
