import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  name: string;
  icon: string;
  count: number;
  onClick?: () => void;
}

export const CategoryCard = ({ name, icon, count, onClick }: CategoryCardProps) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
      onClick={onClick}
    >
      <CardContent className="p-6 flex flex-col items-center text-center gap-3">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name={icon} size={32} className="text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{count.toLocaleString()} объявлений</p>
        </div>
      </CardContent>
    </Card>
  );
};
