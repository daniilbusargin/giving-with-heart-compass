
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RecommendationFilters, { FilterOptions } from '@/components/RecommendationFilters';
import DonationCard from '@/components/DonationCard';
import { Button } from "@/components/ui/button";
import { getRecommendation } from '@/lib/donationData';
import { toast } from "sonner";

const Index = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    type: 'all',
    categories: [],
    urgency: 'any',
    transparency: 'any',
    supportLevel: 'any',
    donationAmount: '',
  });
  
  const [showUnderSupported, setShowUnderSupported] = useState(false);
  const [randomSelection, setRandomSelection] = useState<boolean>(false);
  
  const recommendations = getRecommendation({
    type: filterOptions.type,
    categories: filterOptions.categories.length > 0 ? filterOptions.categories : undefined,
    urgency: filterOptions.urgency,
    transparency: filterOptions.transparency,
    supportLevel: showUnderSupported ? 'rare' : filterOptions.supportLevel,
  });

  const handleFilterChange = (filters: FilterOptions) => {
    setFilterOptions(filters);
    if (showUnderSupported) {
      setShowUnderSupported(false);
    }
    if (randomSelection) {
      setRandomSelection(false);
    }
  };

  const toggleUnderSupported = () => {
    setShowUnderSupported(!showUnderSupported);
    if (randomSelection) {
      setRandomSelection(false);
    }
  };
  
  const handleRandomSelect = () => {
    if (recommendations.length === 0) {
      toast.error("Нет доступных кампаний для случайного выбора. Пожалуйста, измените фильтры.");
      return;
    }
    
    setRandomSelection(true);
    toast.success("Мы выбрали для вас один случайный сбор");
  };
  
  // Отфильтрованные рекомендации, учитывая случайный выбор
  const filteredRecommendations = randomSelection 
    ? [recommendations[Math.floor(Math.random() * recommendations.length)]] 
    : recommendations;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-2">Рекомендации по пожертвованиям</h1>
        <p className="text-center text-gray-600 mb-8">
          Найдите проекты, которые соответствуют вашим ценностям, и сделайте значимый вклад
        </p>
        
        <RecommendationFilters 
          onFilterChange={handleFilterChange}
          onRandomSelect={handleRandomSelect} 
        />
        
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {showUnderSupported 
              ? 'Недостаточно поддерживаемые кампании и фонды' 
              : randomSelection 
                ? 'Ваш случайный добрый выбор' 
                : 'Рекомендовано для вас'
            }
          </h2>
          
          {!randomSelection && (
            <Button 
              variant="outline"
              onClick={toggleUnderSupported}
              className={`text-sm border-donation-purple text-donation-purple ${
                showUnderSupported ? 'bg-donation-purple/10' : ''
              }`}
            >
              {showUnderSupported 
                ? 'Показать все рекомендации' 
                : 'Показать редко поддерживаемые кампании'
              }
            </Button>
          )}
        </div>
        
        {filteredRecommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecommendations.map((campaign) => (
              <DonationCard 
                key={campaign.id} 
                campaign={campaign}
                donationAmount={filterOptions.donationAmount}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              Подходящих кампаний не найдено. Попробуйте изменить фильтры.
            </p>
            <Button 
              className="mt-4 bg-donation-purple hover:bg-donation-dark-purple"
              onClick={() => {
                const resetFilters = {
                  type: 'all',
                  categories: [],
                  urgency: 'any',
                  transparency: 'any',
                  supportLevel: 'any',
                  donationAmount: '',
                };
                setFilterOptions(resetFilters);
                setShowUnderSupported(false);
                setRandomSelection(false);
              }}
            >
              Сбросить фильтры
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
