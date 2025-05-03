
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
      // Если кампания не существует, перенаправляем на главную страницу
      navigate('/', { replace: true });
    }
  }, [campaign, id, navigate]);
  
  if (!campaign) {
    return null; // Перенаправление произойдет через useEffect
  }
  
  // Генерируем причину рекомендации на основе свойств кампании
  const getRecommendationReason = () => {
    if (campaign.urgency === 'high') {
      return `Рекомендуется из-за высокой срочности в категории ${campaign.category.join(', ')}`;
    }
    if (campaign.supportLevel === 'rare') {
      return "Рекомендуется из-за недостаточной поддержки, нуждается в большем внимании";
    }
    if (campaign.transparency === 'complete') {
      return "Рекомендуется из-за полной прозрачности в операциях и финансовой отчетности";
    }
    return `Рекомендуется, так как соответствует интересу в категории ${campaign.category.join(', ')}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
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
