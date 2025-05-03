
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { Campaign } from "@/lib/donationData";

interface DonationCardProps {
  campaign: Campaign;
  donationAmount?: string;
}

const DonationCard = ({ campaign, donationAmount }: DonationCardProps) => {
  const progressPercentage = Math.min(
    Math.round((campaign.raisedAmount / campaign.goalAmount) * 100),
    100
  );

  const getRecommendationReason = () => {
    if (campaign.urgency === 'high') {
      return `Срочная необходимость в категории ${campaign.category.join(', ')}`;
    }
    if (campaign.supportLevel === 'rare') {
      return "Редко поддерживаемый проект, которому нужно внимание";
    }
    if (campaign.transparency === 'complete') {
      return "Высокая прозрачность с полной документацией";
    }
    return `Соответствует вашему интересу в категории ${campaign.category.join(', ')}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { 
      style: 'currency', 
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow animate-fade-in">
      <div className="relative">
        <img
          src={campaign.imageUrl}
          alt={campaign.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 text-gray-800">
            {campaign.type === 'fund' ? 'Фонд' : 'Кампания'}
          </Badge>
          
          {campaign.urgency === 'high' && (
            <span className="urgency-badge">
              Срочно
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{campaign.title}</h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {campaign.shortDescription}
        </p>

        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Прогресс</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-value" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>{formatCurrency(campaign.raisedAmount)}</span>
            <span>из {formatCurrency(campaign.goalAmount)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {campaign.verification && (
            <span className="verification-badge">
              ✓ Проверено
            </span>
          )}
          
          {campaign.transparency === 'complete' && (
            <span className="trust-badge">
              Полная прозрачность
            </span>
          )}
          
          {campaign.reviews.count > 0 && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              ★ {campaign.reviews.averageRating} ({campaign.reviews.count} отзывов)
            </span>
          )}
        </div>

        {donationAmount && campaign.impactMetrics[donationAmount] && (
          <div className="mb-3 text-sm bg-donation-soft-green/30 p-2 rounded">
            <span className="font-medium">Влияние пожертвования ₽{donationAmount}:</span> {campaign.impactMetrics[donationAmount]}
          </div>
        )}

        <div className="border-t pt-3 mt-3">
          <p className="text-xs text-gray-500 mb-3">
            <span className="font-medium">Почему мы рекомендуем:</span> {getRecommendationReason()}
          </p>
          
          <div className="flex justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-donation-purple border-donation-purple hover:bg-donation-purple/10"
              asChild
            >
              <Link to={`/campaign/${campaign.id}`}>
                Подробнее
              </Link>
            </Button>
            
            <Button
              size="sm"
              className="bg-donation-purple hover:bg-donation-dark-purple"
            >
              Пожертвовать сейчас
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
