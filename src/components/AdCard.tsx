import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";

interface AdCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  location: string;
  date: string;
  isPremium?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onClick?: () => void;
}

export const AdCard = ({ 
  title, 
  price, 
  image, 
  location, 
  date, 
  isPremium, 
  isFavorite = false,
  onToggleFavorite,
  onClick 
}: AdCardProps) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorite(!favorite);
    onToggleFavorite?.();
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 overflow-hidden group"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isPremium && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
            Премиум
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/90 hover:bg-white"
          onClick={handleFavoriteClick}
        >
          <Icon 
            name={favorite ? "Heart" : "Heart"} 
            size={20} 
            className={favorite ? "fill-red-500 text-red-500" : "text-foreground"}
          />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-lg text-foreground mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-2xl font-bold text-foreground mb-3">
          {price.toLocaleString()} ₽
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="MapPin" size={14} />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <Icon name="Clock" size={14} />
          <span>{date}</span>
        </div>
      </CardContent>
    </Card>
  );
};
