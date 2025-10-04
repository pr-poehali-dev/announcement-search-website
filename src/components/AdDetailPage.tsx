import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface AdDetailPageProps {
  onBack: () => void;
}

export const AdDetailPage = ({ onBack }: AdDetailPageProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1678652197950-006b69d0c7d2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1592286927505-c0d6c944ab09?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1611472173362-3f53dbd65d80?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1678911820864-e5c3c4f5b4b2?w=800&h=600&fit=crop",
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-secondary/30 py-6">
      <div className="container mx-auto px-4 max-w-7xl">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={onBack}
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад к объявлениям
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-0">
                <div className="relative bg-black">
                  <img
                    src={images[currentImageIndex]}
                    alt="Фото товара"
                    className="w-full h-[500px] object-contain"
                  />
                  
                  {images.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                        onClick={handlePrevImage}
                      >
                        <Icon name="ChevronLeft" size={24} />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                        onClick={handleNextImage}
                      >
                        <Icon name="ChevronRight" size={24} />
                      </Button>
                      
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {images.length}
                      </div>
                    </>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="p-4 flex gap-2 overflow-x-auto">
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Миниатюра ${index + 1}`}
                        className={`w-20 h-20 object-cover rounded cursor-pointer transition-all ${
                          index === currentImageIndex
                            ? "ring-2 ring-primary"
                            : "opacity-60 hover:opacity-100"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-accent text-accent-foreground">Премиум</Badge>
                      <span className="text-sm text-muted-foreground">ID: 123456</span>
                    </div>
                    <CardTitle className="text-3xl mb-4">
                      iPhone 14 Pro Max 256GB Deep Purple
                    </CardTitle>
                    <p className="text-4xl font-bold text-foreground">89 900 ₽</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Icon
                      name="Heart"
                      size={28}
                      className={isFavorite ? "fill-red-500 text-red-500" : "text-foreground"}
                    />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Описание</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Продаю iPhone 14 Pro Max 256GB в идеальном состоянии. Цвет Deep Purple.
                    Телефон куплен в официальном магазине Apple 3 месяца назад. Полный комплект:
                    коробка, кабель, документы. Всегда использовался в чехле и с защитным стеклом.
                    Батарея 100%. Без царапин и сколов. Причина продажи - переход на Android.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-3">Характеристики</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex justify-between items-center p-2 bg-secondary/50 rounded">
                      <span className="text-muted-foreground">Память:</span>
                      <span className="font-medium">256 GB</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-secondary/50 rounded">
                      <span className="text-muted-foreground">Цвет:</span>
                      <span className="font-medium">Deep Purple</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-secondary/50 rounded">
                      <span className="text-muted-foreground">Состояние:</span>
                      <span className="font-medium">Отличное</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-secondary/50 rounded">
                      <span className="text-muted-foreground">Гарантия:</span>
                      <span className="font-medium">Да, 9 мес.</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="MapPin" size={18} />
                  <span>Москва, м. Арбатская</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon name="Eye" size={18} />
                  <span>1,248 просмотров</span>
                  <span className="mx-2">•</span>
                  <Icon name="Clock" size={18} />
                  <span>Сегодня, 14:30</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Продавец</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                    <AvatarFallback>ИИ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">Иван Иванов</h4>
                    <p className="text-sm text-muted-foreground">На сайте с 2023</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Icon name="Star" size={16} className="text-accent fill-accent" />
                      <span className="text-sm font-medium">4.8</span>
                      <span className="text-sm text-muted-foreground">(24 отзыва)</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button className="w-full h-12 text-base" size="lg">
                    <Icon name="Phone" size={20} className="mr-2" />
                    Показать телефон
                  </Button>
                  <Button className="w-full h-12 text-base" variant="outline" size="lg">
                    <Icon name="MessageCircle" size={20} className="mr-2" />
                    Написать сообщение
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="Package" size={16} className="text-primary" />
                    <span className="text-muted-foreground">15 активных объявлений</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={16} className="text-primary" />
                    <span className="text-muted-foreground">Обычно отвечает за 2 часа</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Icon name="Shield" size={24} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Безопасная сделка</h4>
                    <p className="text-sm text-muted-foreground">
                      Проверяйте товар перед покупкой. Встречайтесь в людных местах.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
