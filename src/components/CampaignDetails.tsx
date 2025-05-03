
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Clock, Check, ChevronDown, ChevronUp, Info, ArrowLeft, Star } from "lucide-react";
import type { Campaign } from "@/lib/donationData";
import { toast } from "sonner";

interface CampaignDetailsProps {
  campaign: Campaign;
  recommendationReason?: string;
}

const CampaignDetails = ({ campaign, recommendationReason }: CampaignDetailsProps) => {
  const [donationAmount, setDonationAmount] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);
  const navigate = useNavigate();

  const progressPercentage = Math.min(
    Math.round((campaign.raisedAmount / campaign.goalAmount) * 100),
    100
  );
  
  // Calculate days left (just for demonstration)
  const daysLeft = campaign.urgency === 'high' ? 7 : (campaign.urgency === 'medium' ? 14 : 30);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { 
      style: 'currency', 
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleDonate = () => {
    if (!donationAmount || isNaN(Number(donationAmount))) {
      toast.error("Please enter a valid donation amount");
      return;
    }

    // Here we would integrate with a payment processor
    toast.success(`Thank you for your ${isMonthly ? 'monthly' : ''} donation of ₽${donationAmount}!`);
    // Reset and navigate home after success
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  // Generate random donor count for the UI
  const donorCount = Math.floor(Math.random() * 200) + 50;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden animate-fade-in">
      {/* Hero Image with Overlay */}
      <div className="relative">
        <img
          src={campaign.imageUrl}
          alt={campaign.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Back button */}
        <Button 
          variant="ghost" 
          size="sm"
          className="absolute top-4 left-4 text-white bg-black/30 hover:bg-black/40"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="p-6">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{campaign.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {campaign.verification && (
              <span className="verification-badge">
                <Check className="h-3 w-3" /> Verified
              </span>
            )}
            
            <Badge className={`
              ${campaign.urgency === 'high' ? 'bg-red-100 text-red-800' : 
                campaign.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-green-100 text-green-800'}
            `}>
              {campaign.urgency === 'high' ? 'Urgent' : 
               campaign.urgency === 'medium' ? 'Needed' : 'Ongoing'}
            </Badge>
            
            <Badge variant="outline" className="bg-gray-50">
              {campaign.category.join(', ')}
            </Badge>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          
          <Progress value={progressPercentage} className="h-3 mb-2" />
          
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <span className="font-medium">{formatCurrency(campaign.raisedAmount)}</span>
              <span className="text-gray-500"> of {formatCurrency(campaign.goalAmount)}</span>
            </div>
            
            {campaign.urgency === 'high' && (
              <div className="flex items-center text-xs text-red-600 font-medium">
                <Clock className="h-3 w-3 mr-1" />
                Only {daysLeft} days left
              </div>
            )}
          </div>
        </div>
        
        {/* Recommendation Reason */}
        {recommendationReason && (
          <div className="bg-donation-soft-blue/30 p-3 rounded-md mb-6">
            <h3 className="text-sm font-medium mb-1">Why we recommend this</h3>
            <p className="text-sm text-gray-600">{recommendationReason}</p>
          </div>
        )}

        {/* Impact Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Your Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(campaign.impactMetrics).slice(0, 2).map(([amount, impact]) => (
              <div 
                key={amount} 
                className="border rounded-md p-4 text-sm hover:border-donation-purple/50 hover:bg-donation-soft-blue/10 transition-colors cursor-pointer"
                onClick={() => setDonationAmount(amount)}
              >
                <span className="block text-donation-dark-purple font-medium mb-1">₽{amount}</span>
                <span className="text-gray-600">{impact}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust & Transparency */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Trust & Transparency</h2>
          </div>
          
          {/* Reviews summary */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 font-medium">{campaign.reviews.averageRating}</span>
            </div>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-600">{campaign.reviews.count} reviews</span>
          </div>
          
          {/* How funds will be used */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">How funds will be used</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {campaign.category.map((category, index) => (
                <li key={index} className="flex items-center">
                  <span className="bg-donation-soft-blue/30 p-1.5 rounded-full mr-2">
                    <Info className="h-3 w-3 text-blue-600" />
                  </span>
                  <span className="capitalize">{category}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Testimonial */}
          {campaign.reviews.comments.length > 0 && (
            <div className="border-l-4 border-donation-purple/30 pl-3 mb-4 italic text-sm text-gray-600">
              "{campaign.reviews.comments[0].comment.substring(0, 120)}..."
              <div className="mt-1 font-medium not-italic">— {campaign.reviews.comments[0].author}</div>
            </div>
          )}
          
          {/* Show more details toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="w-full text-sm flex items-center justify-center"
          >
            {showDetails ? "Show less" : "Show more details"}
            {showDetails ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
          </Button>
          
          {/* Extended details */}
          {showDetails && (
            <div className="mt-4 space-y-4 text-sm animate-fade-in">
              <div>
                <h3 className="font-medium mb-2">Organization Description</h3>
                <p className="text-gray-600">{campaign.fullDescription}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Documentation & Reports</h3>
                <ul className="space-y-2">
                  {campaign.documentationLinks.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-donation-purple hover:underline flex items-center"
                      >
                        Document {index + 1}: {link.split('/').pop()}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Donation Action Block */}
        <div className="bg-gray-50 p-5 rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-4">Make Your Donation</h2>
          
          <div className="relative mb-4">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₽</span>
            <Input 
              type="text"
              placeholder="Enter amount"
              className="pl-8 text-lg"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
            />
          </div>
          
          <div className="flex items-center mb-4">
            <Checkbox 
              id="monthly"
              checked={isMonthly}
              onCheckedChange={() => setIsMonthly(!isMonthly)}
            />
            <label 
              htmlFor="monthly"
              className="ml-2 text-sm font-medium cursor-pointer"
            >
              Make this a monthly donation
            </label>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="w-full bg-donation-purple hover:bg-donation-dark-purple text-white py-6"
                disabled={!donationAmount}
                size="lg"
              >
                Donate ₽{donationAmount} {isMonthly ? 'monthly' : ''}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Complete your donation</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Payment Information</h3>
                  <Input placeholder="Card number" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="MM/YY" />
                    <Input placeholder="CVC" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Contact Information (Optional)</h3>
                  <Input placeholder="Email" />
                </div>
                
                <p className="text-xs text-gray-500">
                  Your donation is secure and encrypted. You don't need to create an account.
                </p>
                
                <Button 
                  className="w-full bg-donation-purple hover:bg-donation-dark-purple"
                  onClick={handleDonate}
                >
                  Donate ₽{donationAmount} {isMonthly ? 'monthly' : ''}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <p className="text-center text-sm text-gray-500 mt-3">
            You'll join {donorCount} other donors supporting this cause
          </p>
        </div>
        
        {/* Navigation & Extras */}
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <Button 
            variant="outline" 
            size="sm"
            asChild
          >
            <Link to="/">Back to recommendations</Link>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/?support=rare')}
            className="text-donation-purple"
          >
            See other under-supported causes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
