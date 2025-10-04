import { useState } from "react";
import { Header } from "@/components/Header";
import { HomePage } from "@/components/HomePage";
import { CatalogPage } from "@/components/CatalogPage";
import { CreateAdPage } from "@/components/CreateAdPage";
import { ProfilePage } from "@/components/ProfilePage";
import { FavoritesPage } from "@/components/FavoritesPage";
import { MessagesPage } from "@/components/MessagesPage";
import { AdDetailPage } from "@/components/AdDetailPage";
import { MapCatalogPage } from "@/components/MapCatalogPage";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalog' | 'create' | 'profile' | 'favorites' | 'messages' | 'adDetail' | 'map'>('home');

  return (
    <div className="min-h-screen">
      <Header onNavigate={setCurrentPage} />
      {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
      {currentPage === 'catalog' && <CatalogPage />}
      {currentPage === 'create' && <CreateAdPage />}
      {currentPage === 'profile' && <ProfilePage />}
      {currentPage === 'favorites' && <FavoritesPage />}
      {currentPage === 'messages' && <MessagesPage />}
      {currentPage === 'adDetail' && <AdDetailPage onBack={() => setCurrentPage('catalog')} />}
      {currentPage === 'map' && <MapCatalogPage />}
    </div>
  );
};

export default Index;