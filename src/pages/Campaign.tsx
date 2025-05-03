
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CampaignDetails from '@/components/CampaignDetails';
import { getCampaignById } from '@/lib/donationData';

const Campaign = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const campaign = id ? getCampaignById(id) : undefined;
  
  useEffect(() => {
    if (!campaign && id) {
      // If campaign doesn't exist, redirect to home page
      navigate('/', { replace: true });
    }
  }, [campaign, id, navigate]);
  
  if (!campaign) {
    return null; // Will redirect via useEffect
  }
  
  // Generate recommendation reason based on campaign properties
  const getRecommendationReason = () => {
    if (campaign.urgency === 'high') {
      return `This is an urgent need related to ${campaign.category.join(', ')}`;
    }
    if (campaign.supportLevel === 'rare') {
      return "This is an under-supported cause that needs more attention";
    }
    if (campaign.transparency === 'complete') {
      return "This organization provides complete transparency in their operations and financial reporting";
    }
    return `This matches your interest in ${campaign.category.join(', ')}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <CampaignDetails 
          campaign={campaign}
          recommendationReason={getRecommendationReason()}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Campaign;
