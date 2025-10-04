import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";

export const CreateAdPage = () => {
  const [isPremium, setIsPremium] = useState(false);

  return (
    <div className="min-h-screen bg-secondary/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Icon name="Plus" size={28} className="text-primary" />
              Разместить объявление
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category">Категория *</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Электроника</SelectItem>
                  <SelectItem value="realestate">Недвижимость</SelectItem>
                  <SelectItem value="transport">Транспорт</SelectItem>
                  <SelectItem value="work">Работа</SelectItem>
                  <SelectItem value="services">Услуги</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Название объявления *</Label>
              <Input
                id="title"
                placeholder="Например: iPhone 14 Pro Max 256GB"
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Описание *</Label>
              <Textarea
                id="description"
                placeholder="Подробно опишите товар или услугу..."
                className="min-h-32 text-base"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Цена, ₽ *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0"
                  className="text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Город *</Label>
                <Input
                  id="location"
                  placeholder="Москва"
                  className="text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Фотографии</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-1">
                  Нажмите или перетащите файлы
                </p>
                <p className="text-xs text-muted-foreground">
                  Максимум 10 фотографий, до 5 МБ каждая
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Контактный телефон *</Label>
              <Input
                id="contact"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                className="text-base"
              />
            </div>

            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Rocket" size={24} className="text-accent" />
                      <h3 className="font-semibold text-lg">Платное продвижение</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ваше объявление будет показано в 3 раза чаще и выделено оранжевым цветом
                    </p>
                    <p className="text-lg font-bold text-accent mt-2">299 ₽ / неделя</p>
                  </div>
                  <Switch
                    checked={isPremium}
                    onCheckedChange={setIsPremium}
                    className="ml-4"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 pt-4">
              <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90">
                <Icon name="Check" size={20} className="mr-2" />
                Опубликовать
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                Сохранить черновик
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
