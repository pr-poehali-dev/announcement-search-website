import { useState } from "react";
import { AdCard } from "./AdCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";

export const CatalogPage = () => {
  const [priceRange, setPriceRange] = useState([0, 1000000]);

  const allAds = [
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
    {
      id: 5,
      title: "Samsung Galaxy S23 Ultra",
      price: 79900,
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
      location: "Москва",
      date: "Вчера, 14:10",
    },
    {
      id: 6,
      title: "MacBook Pro 16 M2 Max",
      price: 289000,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      location: "Санкт-Петербург",
      date: "2 дня назад",
      isPremium: true,
    },
    {
      id: 7,
      title: "3-комнатная квартира, 85 м²",
      price: 18900000,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      location: "Москва, Тверская",
      date: "2 дня назад",
    },
    {
      id: 8,
      title: "Велосипед горный Trek",
      price: 45000,
      image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&h=300&fit=crop",
      location: "Новосибирск",
      date: "3 дня назад",
    },
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="w-80 bg-white rounded-lg p-6 h-fit sticky top-20">
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Icon name="SlidersHorizontal" size={24} />
              Фильтры
            </h2>

            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-2 block">Категория</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Все категории" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Электроника</SelectItem>
                    <SelectItem value="realestate">Недвижимость</SelectItem>
                    <SelectItem value="transport">Транспорт</SelectItem>
                    <SelectItem value="work">Работа</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Город</Label>
                <Input placeholder="Введите город" />
              </div>

              <div>
                <Label className="text-sm font-medium mb-4 block">
                  Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽
                </Label>
                <Slider
                  min={0}
                  max={1000000}
                  step={10000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium block">Тип объявления</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="premium" />
                  <Label htmlFor="premium" className="text-sm font-normal cursor-pointer">
                    Только премиум
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="photo" />
                  <Label htmlFor="photo" className="text-sm font-normal cursor-pointer">
                    С фото
                  </Label>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full" variant="outline">
                  Сбросить фильтры
                </Button>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Найдено {allAds.length} объявлений
              </div>
              <Select defaultValue="date">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">По дате</SelectItem>
                  <SelectItem value="price-asc">Сначала дешевые</SelectItem>
                  <SelectItem value="price-desc">Сначала дорогие</SelectItem>
                  <SelectItem value="popular">По популярности</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allAds.map((ad) => (
                <AdCard key={ad.id} {...ad} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button variant="outline" size="lg">
                Показать ещё
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
