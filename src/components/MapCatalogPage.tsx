import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Ad {
  id: number;
  title: string;
  price: number;
  image: string;
  location: string;
  lat: number;
  lng: number;
  isPremium?: boolean;
}

export const MapCatalogPage = () => {
  const [selectedAdId, setSelectedAdId] = useState<number | null>(null);

  const ads: Ad[] = [
    {
      id: 1,
      title: "iPhone 14 Pro Max 256GB",
      price: 89900,
      image: "https://images.unsplash.com/photo-1678652197950-006b69d0c7d2?w=300&h=200&fit=crop",
      location: "м. Арбатская",
      lat: 55.7522,
      lng: 37.6006,
      isPremium: true,
    },
    {
      id: 2,
      title: "2-комнатная квартира, 54 м²",
      price: 12500000,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop",
      location: "Тверская",
      lat: 55.7654,
      lng: 37.6068,
    },
    {
      id: 3,
      title: "MacBook Pro 16 M2",
      price: 289000,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop",
      location: "Парк Культуры",
      lat: 55.7358,
      lng: 37.5933,
      isPremium: true,
    },
    {
      id: 4,
      title: "Toyota Camry 2020",
      price: 2450000,
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=300&h=200&fit=crop",
      location: "Курская",
      lat: 55.7584,
      lng: 37.6594,
    },
  ];

  const selectedAd = ads.find(ad => ad.id === selectedAdId);
  const centerLat = 55.7558;
  const centerLng = 37.6173;

  const markers = ads.map(ad => `${ad.lng},${ad.lat},pm2${ad.isPremium ? 'or' : 'bl'}m`).join('~');
  const mapUrl = `https://static-maps.yandex.ru/1.x/?ll=${centerLng},${centerLat}&z=12&l=map&size=650,600&pt=${markers}`;

  return (
    <div className="min-h-screen bg-secondary/30 py-6">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Icon name="Map" size={32} className="text-primary" />
            Объявления на карте
          </h1>
          <Button variant="outline">
            <Icon name="List" size={18} className="mr-2" />
            Списком
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={mapUrl}
                  alt="Карта объявлений"
                  className="w-full h-[600px] object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4 right-4">
                  <Card className="bg-white/95 backdrop-blur">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                          <span>Премиум</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span>Обычное</span>
                        </div>
                        <span className="ml-auto text-muted-foreground">
                          Найдено: {ads.length}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Объявления в этом районе</h3>
                <div className="space-y-3 max-h-[540px] overflow-y-auto">
                  {ads.map((ad) => (
                    <Card
                      key={ad.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedAdId === ad.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedAdId(ad.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex gap-3">
                          <img
                            src={ad.image}
                            alt={ad.title}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            {ad.isPremium && (
                              <Badge className="mb-1 bg-accent text-accent-foreground text-xs">
                                Премиум
                              </Badge>
                            )}
                            <h4 className="font-medium text-sm line-clamp-2 mb-1">
                              {ad.title}
                            </h4>
                            <p className="text-lg font-bold text-foreground mb-1">
                              {ad.price.toLocaleString()} ₽
                            </p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Icon name="MapPin" size={12} />
                              <span>{ad.location}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedAd && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Выбранное объявление</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {selectedAd.title}
                  </p>
                  <Button className="w-full">
                    <Icon name="ExternalLink" size={16} className="mr-2" />
                    Открыть объявление
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
