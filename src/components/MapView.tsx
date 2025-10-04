import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface MapViewProps {
  location: string;
  lat?: number;
  lng?: number;
}

export const MapView = ({ location, lat = 55.7558, lng = 37.6173 }: MapViewProps) => {
  const mapUrl = `https://static-maps.yandex.ru/1.x/?ll=${lng},${lat}&z=14&l=map&size=600,300&pt=${lng},${lat},pm2rdm`;

  return (
    <Card>
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={mapUrl}
            alt="Карта местоположения"
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex items-center gap-2 text-white">
              <Icon name="MapPin" size={20} />
              <span className="font-medium">{location}</span>
            </div>
          </div>
        </div>
        <div className="p-4 bg-secondary/30">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Точный адрес сообщит продавец
            </p>
            <a
              href={`https://yandex.ru/maps/?ll=${lng},${lat}&z=14&pt=${lng},${lat}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              Открыть на карте
              <Icon name="ExternalLink" size={14} />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
