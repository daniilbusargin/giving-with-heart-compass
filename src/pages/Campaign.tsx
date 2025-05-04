
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CampaignDetails from '@/components/CampaignDetails';
import { getCampaignById, Campaign as DonationCampaign } from '@/lib/donationData';

const Campaign = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Get the campaign data from the API
  const campaignData = id ? getCampaignById(id) : undefined;
  
  useEffect(() => {
    if (!campaignData && id) {
      navigate('/', { replace: true });
    }
  }, [campaignData, id, navigate]);
  
  if (!campaignData) {
    return null;
  }
  
  // Адаптируем данные кампании к ожидаемой структуре CampaignDetails
  const campaign = {
    ...campaignData,
    // Переименовываем поля для соответствия CampaignDetails
    raisedAmount: campaignData.raisedAmount,
    goalAmount: campaignData.goalAmount,
    imageUrl: campaignData.imageUrl,
    verification: campaignData.verification,
    
    // Создаем структуру impact, если она не существует
    impact: {
      title: "Ваше влияние",
      description: campaignData.fullDescription || "Описание влияния вашего пожертвования"
    },
    
    // Создаем структуру usagePlan
    usagePlan: {
      title: "Как будут использованы средства",
      items: Object.entries(campaignData.impactMetrics || {}).map(([amount, impact], index) => ({
        title: `Сумма ₽${amount}`,
        percentage: Math.round(100 / (Object.keys(campaignData.impactMetrics || {}).length) * (index + 1)),
        description: impact
      }))
    },
    
    // Создаем структуру organization
    organization: {
      name: campaignData.organization || "Организация",
      description: campaignData.fullDescription || "Описание организации",
      yearFounded: 2020, // Примерное значение если не указан
      logo: campaignData.imageUrl
    },
    
    // Используем отзывы из reviews
    testimonials: (campaignData.reviews?.comments || []).map(comment => ({
      name: comment.author,
      role: "Донатор", // Используем фиксированное значение
      content: comment.comment,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" // Используем фиксированное изображение
    }))
  };

  // Генерируем причину рекомендации на основе свойств кампании
  const getRecommendationReason = () => {
    if (campaignData.urgency === 'high') {
      return `Рекомендуется из-за высокой срочности в категории ${campaignData.category.join(', ')}`;
    }
    if (campaignData.supportLevel === 'rare') {
      return "Рекомендуется из-за недостаточной поддержки, нуждается в большем внимании";
    }
    if (campaignData.transparency === 'complete') {
      return "Рекомендуется из-за полной прозрачности в операциях и финансовой отчетности";
    }
    return `Рекомендуется, так как соответствует интересу в категории ${campaignData.category.join(', ')}`;
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
