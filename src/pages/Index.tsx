
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RecommendationFilters, { FilterOptions } from '@/components/RecommendationFilters';
import DonationCard from '@/components/DonationCard';
import { Button } from "@/components/ui/button";
import { getRecommendation } from '@/lib/donationData';

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
  };

  const toggleUnderSupported = () => {
    setShowUnderSupported(!showUnderSupported);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-2">Donation Recommendations</h1>
        <p className="text-center text-gray-600 mb-8">
          Find causes that align with your values and make a meaningful impact
        </p>
        
        <RecommendationFilters onFilterChange={handleFilterChange} />
        
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {showUnderSupported ? 'Under-supported Campaigns & Funds' : 'Recommended for You'}
          </h2>
          
          <Button 
            variant="outline"
            onClick={toggleUnderSupported}
            className={`text-sm border-donation-purple text-donation-purple ${
              showUnderSupported ? 'bg-donation-purple/10' : ''
            }`}
          >
            {showUnderSupported 
              ? 'Show all recommendations' 
              : 'See under-supported campaigns'
            }
          </Button>
        </div>
        
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((campaign) => (
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
              No matching campaigns found. Try adjusting your filters.
            </p>
            <Button 
              className="mt-4 bg-donation-purple hover:bg-donation-dark-purple"
              onClick={() => setFilterOptions({
                type: 'all',
                categories: [],
                urgency: 'any',
                transparency: 'any',
                supportLevel: 'any',
                donationAmount: '',
              })}
            >
              Reset filters
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
