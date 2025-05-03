
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export interface FilterOptions {
  type: 'fund' | 'campaign' | 'all';
  categories: string[];
  urgency: 'low' | 'medium' | 'high' | 'any';
  transparency: 'basic' | 'detailed' | 'complete' | 'any';
  supportLevel: 'rare' | 'moderate' | 'popular' | 'any';
  donationAmount: string;
}

interface RecommendationFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const categoryOptions = [
  { value: 'children', label: 'Children' },
  { value: 'health', label: 'Health' },
  { value: 'animals', label: 'Animals' },
  { value: 'education', label: 'Education' },
  { value: 'water', label: 'Water' },
  { value: 'local aid', label: 'Local Aid' },
  { value: 'sustainability', label: 'Sustainability' },
  { value: 'emergency', label: 'Emergency' },
  { value: 'youth', label: 'Youth' },
  { value: 'mental health', label: 'Mental Health' },
  { value: 'technology', label: 'Technology' },
  { value: 'community', label: 'Community' },
];

const RecommendationFilters = ({ onFilterChange }: RecommendationFiltersProps) => {
  const [recommendationMode, setRecommendationMode] = useState<'quick' | 'thoughtful'>('thoughtful');
  const [filters, setFilters] = useState<FilterOptions>({
    type: 'all',
    categories: [],
    urgency: 'any',
    transparency: 'any',
    supportLevel: 'any',
    donationAmount: '',
  });

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryToggle = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    handleFilterChange('categories', updatedCategories);
  };

  const handleModeChange = (mode: 'quick' | 'thoughtful') => {
    setRecommendationMode(mode);
    if (mode === 'quick') {
      const quickFilters = {
        ...filters,
        urgency: 'high',
        transparency: 'detailed'
      };
      setFilters(quickFilters);
      onFilterChange(quickFilters);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6 animate-fade-in">
      <Tabs 
        defaultValue="thoughtful" 
        className="w-full"
        onValueChange={(value) => handleModeChange(value as 'quick' | 'thoughtful')}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">How would you like to choose?</h2>
          <TabsList>
            <TabsTrigger value="quick">Quick choice</TabsTrigger>
            <TabsTrigger value="thoughtful">Thoughtful recommendation</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="quick" className="space-y-4">
          <div className="text-sm text-muted-foreground">
            We'll show you urgent needs with high transparency ratings.
          </div>
        </TabsContent>
        
        <TabsContent value="thoughtful" className="space-y-4">
          <Accordion type="single" collapsible defaultValue="filters" className="w-full">
            <AccordionItem value="filters">
              <AccordionTrigger className="text-md font-medium">
                Adjust filters
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <Select 
                      onValueChange={(value) => handleFilterChange('type', value)}
                      defaultValue="all"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All types</SelectItem>
                        <SelectItem value="fund">Fund</SelectItem>
                        <SelectItem value="campaign">Campaign</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Urgency</label>
                    <Select 
                      onValueChange={(value) => handleFilterChange('urgency', value)}
                      defaultValue="any"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any urgency</SelectItem>
                        <SelectItem value="high">High urgency</SelectItem>
                        <SelectItem value="medium">Medium urgency</SelectItem>
                        <SelectItem value="low">Low urgency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Transparency</label>
                    <Select 
                      onValueChange={(value) => handleFilterChange('transparency', value)}
                      defaultValue="any"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select transparency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any transparency</SelectItem>
                        <SelectItem value="complete">Complete (detailed reports)</SelectItem>
                        <SelectItem value="detailed">Detailed</SelectItem>
                        <SelectItem value="basic">Basic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Support Level</label>
                    <Select 
                      onValueChange={(value) => handleFilterChange('supportLevel', value)}
                      defaultValue="any"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select support level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any support level</SelectItem>
                        <SelectItem value="rare">Rarely supported</SelectItem>
                        <SelectItem value="moderate">Moderately supported</SelectItem>
                        <SelectItem value="popular">Frequently supported</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Donation Amount (optional)</label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2">₽</span>
                      <Input 
                        type="text"
                        placeholder="Amount"
                        className="pl-7"
                        value={filters.donationAmount}
                        onChange={(e) => handleFilterChange('donationAmount', e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enter an amount to see where it would be most impactful
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">Cause Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {categoryOptions.map((category) => (
                      <Badge
                        key={category.value}
                        variant={filters.categories.includes(category.value) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          filters.categories.includes(category.value) 
                            ? "bg-donation-purple hover:bg-donation-dark-purple" 
                            : ""
                        }`}
                        onClick={() => handleCategoryToggle(category.value)}
                      >
                        {category.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecommendationFilters;
