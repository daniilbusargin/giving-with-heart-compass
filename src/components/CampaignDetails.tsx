
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Campaign } from "@/lib/donationData";
import { toast } from "sonner";

interface CampaignDetailsProps {
  campaign: Campaign;
  recommendationReason?: string;
}

const CampaignDetails = ({ campaign, recommendationReason }: CampaignDetailsProps) => {
  const [donationAmount, setDonationAmount] = useState("");
  const [showDocuments, setShowDocuments] = useState(false);
  const navigate = useNavigate();

  const progressPercentage = Math.min(
    Math.round((campaign.raisedAmount / campaign.goalAmount) * 100),
    100
  );

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
    toast.success(`Thank you for your donation of ₽${donationAmount}!`);
    // Reset and navigate home after success
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden animate-fade-in">
      <div className="relative">
        <img
          src={campaign.imageUrl}
          alt={campaign.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{campaign.title}</h1>
        </div>
      </div>

      <div className="p-6">
        {/* Progress section */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Progress</span>
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
            <span>of {formatCurrency(campaign.goalAmount)}</span>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap gap-2 mb-6">
          {campaign.verification && (
            <span className="verification-badge">
              ✓ Verified
            </span>
          )}
          
          {campaign.transparency === 'complete' && (
            <span className="trust-badge">
              Complete transparency
            </span>
          )}
          
          {campaign.reviews.count > 0 && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              ★ {campaign.reviews.averageRating} ({campaign.reviews.count} reviews)
            </span>
          )}
          
          <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize">
            {campaign.urgency} urgency
          </span>
        </div>

        {/* Why you're seeing this */}
        {recommendationReason && (
          <div className="bg-donation-soft-blue/30 p-3 rounded-md mb-6">
            <h3 className="text-sm font-medium mb-1">Why you're seeing this</h3>
            <p className="text-sm text-gray-600">{recommendationReason}</p>
          </div>
        )}

        {/* Impact section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Your Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(campaign.impactMetrics).map(([amount, impact]) => (
              <div 
                key={amount} 
                className="border rounded-md p-3 text-sm hover:border-donation-purple/50 hover:bg-donation-soft-blue/10 transition-colors cursor-pointer"
                onClick={() => setDonationAmount(amount)}
              >
                <span className="font-medium text-donation-dark-purple">₽{amount}:</span> {impact}
              </div>
            ))}
          </div>
        </div>

        {/* Main description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">About This {campaign.type === 'fund' ? 'Fund' : 'Campaign'}</h2>
          <p className="text-gray-600">{campaign.fullDescription}</p>
        </div>

        {/* Documentation & transparency */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Documentation & Transparency</h2>
            
            <Button 
              variant="ghost" 
              onClick={() => setShowDocuments(!showDocuments)}
              size="sm"
              className="text-donation-purple"
            >
              {showDocuments ? "Hide documents" : "View documents"}
            </Button>
          </div>

          {showDocuments && (
            <div className="border rounded-md p-4 space-y-3">
              <p className="text-sm text-gray-600">
                We believe in full transparency. Below are documents verifying this {campaign.type} 
                and showing how funds are used:
              </p>
              
              <ul className="space-y-2">
                {campaign.documentationLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-donation-purple hover:underline flex items-center"
                    >
                      Document {index + 1}: {link.split('/').pop()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Reviews section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Reviews ({campaign.reviews.count})</h2>
          
          {campaign.reviews.comments.length > 0 ? (
            <div className="space-y-4">
              {campaign.reviews.comments.map((review, index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{review.author}</span>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
                    <span className="text-gray-300">{review.rating < 5 ? "★".repeat(5 - review.rating) : ""}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                </div>
              ))}
              
              {campaign.reviews.count > campaign.reviews.comments.length && (
                <Button 
                  variant="outline" 
                  className="w-full text-sm"
                >
                  View all {campaign.reviews.count} reviews
                </Button>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No reviews yet.</p>
          )}
        </div>

        {/* Donation form */}
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-4">Make a Donation</h2>

          <Tabs defaultValue="oneTime" className="w-full mb-4">
            <TabsList className="w-full">
              <TabsTrigger value="oneTime" className="flex-1">One-time donation</TabsTrigger>
              <TabsTrigger value="monthly" className="flex-1">Monthly support</TabsTrigger>
            </TabsList>
            
            <TabsContent value="oneTime" className="space-y-4 pt-4">
              <div className="grid grid-cols-4 gap-3">
                {Object.keys(campaign.impactMetrics).map((amount) => (
                  <Button 
                    key={amount}
                    variant={donationAmount === amount ? "default" : "outline"}
                    className={donationAmount === amount ? "bg-donation-purple hover:bg-donation-dark-purple" : ""}
                    onClick={() => setDonationAmount(amount)}
                  >
                    ₽{amount}
                  </Button>
                ))}
              </div>
              
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₽</span>
                <Input 
                  type="text"
                  placeholder="Custom amount"
                  className="pl-8"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="monthly" className="pt-4">
              <p className="text-sm text-gray-600 mb-4">
                Monthly donations provide consistent support and help with long-term planning.
              </p>
              
              <div className="grid grid-cols-4 gap-3">
                {['100', '300', '500', '1000'].map((amount) => (
                  <Button 
                    key={amount}
                    variant={donationAmount === amount ? "default" : "outline"}
                    className={donationAmount === amount ? "bg-donation-purple hover:bg-donation-dark-purple" : ""}
                    onClick={() => setDonationAmount(amount)}
                  >
                    ₽{amount}/mo
                  </Button>
                ))}
              </div>
              
              <div className="relative mt-3">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₽</span>
                <Input 
                  type="text"
                  placeholder="Custom amount"
                  className="pl-8"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
              </div>
            </TabsContent>
          </Tabs>

          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="w-full bg-donation-purple hover:bg-donation-dark-purple text-lg py-6"
                disabled={!donationAmount}
              >
                Donate ₽{donationAmount}
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
                  Donate ₽{donationAmount}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <div className="mt-4 flex justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              asChild
            >
              <Link to="/">Find similar causes</Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
            >
              Save to favorites
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
