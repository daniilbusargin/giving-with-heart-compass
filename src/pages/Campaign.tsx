
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
      navigate('/', { replace: true });
    }
  }, [campaign, id, navigate]);
  
  if (!campaign) {
    return null;
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
  
  // Переводим информацию о кампании на русский язык
  const translatedCampaign = {
    ...campaign,
    impact: {
      ...campaign.impact,
      title: "Ваше влияние",
      description: campaign.impact.description
        .replace("Your donation will", "Ваше пожертвование поможет")
        .replace("help", "")
        .replace("provide", "предоставить")
        .replace("support", "поддержать")
        .replace("fund", "финансировать")
        .replace("children", "детей")
        .replace("families", "семьи")
        .replace("communities", "сообщества")
        .replace("medical", "медицинскую")
        .replace("care", "помощь")
        .replace("education", "образование")
        .replace("resources", "ресурсы")
    },
    usagePlan: {
      ...campaign.usagePlan,
      title: "Как будут использованы средства",
      items: campaign.usagePlan.items.map(item => ({
        ...item,
        title: item.title
          .replace("Medical supplies", "Медицинские принадлежности")
          .replace("Education", "Образование")
          .replace("Food", "Питание")
          .replace("Shelter", "Жилье")
          .replace("Research", "Исследования")
          .replace("Infrastructure", "Инфраструктура")
          .replace("Emergency aid", "Экстренная помощь")
          .replace("Administrative", "Административные расходы"),
        description: item.description
          .replace("Providing essential", "Предоставление необходимых")
          .replace("supplies", "принадлежностей")
          .replace("to", "для")
          .replace("Supporting", "Поддержка")
          .replace("programs", "программ")
          .replace("Ensuring", "Обеспечение")
          .replace("access", "доступа")
          .replace("services", "услуг")
          .replace("facilities", "учреждений")
          .replace("research", "исследований")
      }))
    },
    organization: {
      ...campaign.organization,
      description: campaign.organization.description
        .replace("Founded", "Основан")
        .replace("in", "в")
        .replace("year", "году")
        .replace("works", "работает")
        .replace("to", "чтобы")
        .replace("provide", "предоставить")
        .replace("support", "поддержку")
        .replace("is dedicated", "посвящен")
        .replace("mission", "миссии")
        .replace("has helped", "помог")
        .replace("over", "более чем")
        .replace("people", "людям")
        .replace("communities", "сообществам")
        .replace("since", "с")
    },
    testimonials: campaign.testimonials.map(testimonial => ({
      ...testimonial,
      content: testimonial.content
        .replace("I've seen firsthand", "Я видел собственными глазами")
        .replace("This organization", "Эта организация")
        .replace("Their work", "Их работа")
        .replace("incredible", "невероятная")
        .replace("amazing", "удивительная")
        .replace("important", "важная")
        .replace("impact", "влияние")
        .replace("community", "сообщество")
        .replace("grateful", "благодарен")
        .replace("changed", "изменила")
        .replace("life", "жизнь")
        .replace("lives", "жизни"),
      role: testimonial.role
        .replace("Volunteer", "Волонтер")
        .replace("Donor", "Донор")
        .replace("Beneficiary", "Благополучатель")
        .replace("Partner", "Партнер")
        .replace("Director", "Директор")
        .replace("Program Manager", "Руководитель программы")
    }))
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <CampaignDetails 
          campaign={translatedCampaign}
          recommendationReason={getRecommendationReason()}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Campaign;
