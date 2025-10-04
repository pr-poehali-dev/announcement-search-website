import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const MapCatalogPage = () => {
  const [selectedAdId, setSelectedAdId] = useState<number | null>(null);
  const [maxDistance, setMaxDistance] = useState([10]);
  const [centerLat, setCenterLat] = useState(55.7558);
  const [centerLng, setCenterLng] = useState(37.6173);
  const [sortBy, setSortBy] = useState("distance");

  const allAds: Ad[] = [
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
    {
      id: 5,
      title: "Samsung Galaxy S23 Ultra",
      price: 79900,
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=200&fit=crop",
      location: "Третьяковская",
      lat: 55.7414,
      lng: 37.6208,
    },
    {
      id: 6,
      title: "1-комнатная квартира, 38 м²",
      price: 8900000,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop",
      location: "Пушкинская",
      lat: 55.7655,
      lng: 37.6047,
      isPremium: true,
    },
  ];

  const filteredAds = useMemo(() => {
    const adsWithDistance = allAds.map(ad => ({
      ...ad,
      distance: calculateDistance(centerLat, centerLng, ad.lat, ad.lng)
    })).filter(ad => ad.distance <= maxDistance[0]);

    if (sortBy === "distance") {
      return adsWithDistance.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === "price-asc") {
      return adsWithDistance.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      return adsWithDistance.sort((a, b) => b.price - a.price);
    }
    return adsWithDistance;
  }, [centerLat, centerLng, maxDistance, sortBy]);

  const selectedAd = filteredAds.find(ad => ad.id === selectedAdId);
  const markers = filteredAds.map(ad => `${ad.lng},${ad.lat},pm2${ad.isPremium ? 'or' : 'bl'}m`).join('~');
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
                          Найдено: {filteredAds.length}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <Card className="bg-white/95 backdrop-blur">
                    <CardContent className="p-4 space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-3 block flex items-center gap-2">
                          <Icon name="Navigation" size={16} className="text-primary" />
                          Радиус поиска: {maxDistance[0]} км
                        </Label>
                        <Slider
                          min={1}
                          max={20}
                          step={1}
                          value={maxDistance}
                          onValueChange={setMaxDistance}
                          className="mb-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1 км</span>
                          <span>20 км</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs mb-1 block">Широта</Label>
                          <Input
                            type="number"
                            step="0.0001"
                            value={centerLat}
                            onChange={(e) => setCenterLat(Number(e.target.value))}
                            className="h-8 text-xs"
                          />
                        </div>
                        <div>
                          <Label className="text-xs mb-1 block">Долгота</Label>
                          <Input
                            type="number"
                            step="0.0001"
                            value={centerLng}
                            onChange={(e) => setCenterLng(Number(e.target.value))}
                            className="h-8 text-xs"
                          />
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setCenterLat(55.7558);
                          setCenterLng(37.6173);
                        }}
                      >
                        <Icon name="MapPin" size={14} className="mr-2" />
                        Сбросить центр
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Объявления поблизости</h3>
                  <Badge variant="secondary">{filteredAds.length}</Badge>
                </div>

                <div>
                  <Label className="text-xs mb-1 block">Сортировка</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distance">По расстоянию</SelectItem>
                      <SelectItem value="price-asc">Сначала дешевые</SelectItem>
                      <SelectItem value="price-desc">Сначала дорогие</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {filteredAds.map((ad) => (
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
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Icon name="MapPin" size={12} />
                                <span>{ad.location}</span>
                              </div>
                              <div className="flex items-center gap-1 text-primary font-medium">
                                <Icon name="Navigation" size={12} />
                                <span>{ad.distance.toFixed(1)} км</span>
                              </div>
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
                  <p className="text-sm text-muted-foreground mb-1">
                    {selectedAd.title}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                    <Icon name="Navigation" size={12} className="text-primary" />
                    {selectedAd.distance.toFixed(2)} км от центра
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
