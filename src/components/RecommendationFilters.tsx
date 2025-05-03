
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
  { value: 'children', label: 'Дети' },
  { value: 'health', label: 'Здоровье' },
  { value: 'animals', label: 'Животные' },
  { value: 'education', label: 'Образование' },
  { value: 'water', label: 'Вода' },
  { value: 'local aid', label: 'Местная помощь' },
  { value: 'sustainability', label: 'Экологичность' },
  { value: 'emergency', label: 'Экстренная помощь' },
  { value: 'youth', label: 'Молодежь' },
  { value: 'mental health', label: 'Психическое здоровье' },
  { value: 'technology', label: 'Технологии' },
  { value: 'community', label: 'Сообщество' },
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
      // При выборе "быстрого выбора" устанавливаем определенные фильтры
      const quickFilters: FilterOptions = {
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
          <h2 className="text-lg font-medium">Как бы вы хотели выбрать?</h2>
          <TabsList>
            <TabsTrigger value="quick">Быстрый выбор</TabsTrigger>
            <TabsTrigger value="thoughtful">Продуманная рекомендация</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="quick" className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Мы покажем вам срочные нужды с высоким рейтингом прозрачности.
          </div>
        </TabsContent>
        
        <TabsContent value="thoughtful" className="space-y-4">
          <Accordion type="single" collapsible defaultValue="filters" className="w-full">
            <AccordionItem value="filters">
              <AccordionTrigger className="text-md font-medium">
                Настроить фильтры
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Тип</label>
                    <Select 
                      onValueChange={(value) => handleFilterChange('type', value)}
                      defaultValue="all"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все типы</SelectItem>
                        <SelectItem value="fund">Фонд</SelectItem>
                        <SelectItem value="campaign">Кампания</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Срочность</label>
                    <Select 
                      onValueChange={(value) => handleFilterChange('urgency', value as 'low' | 'medium' | 'high' | 'any')}
                      defaultValue="any"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите срочность" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Любая срочность</SelectItem>
                        <SelectItem value="high">Высокая срочность</SelectItem>
                        <SelectItem value="medium">Средняя срочность</SelectItem>
                        <SelectItem value="low">Низкая срочность</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Прозрачность</label>
                    <Select 
                      onValueChange={(value) => handleFilterChange('transparency', value as 'basic' | 'detailed' | 'complete' | 'any')}
                      defaultValue="any"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите прозрачность" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Любая прозрачность</SelectItem>
                        <SelectItem value="complete">Полная (детальные отчеты)</SelectItem>
                        <SelectItem value="detailed">Детальная</SelectItem>
                        <SelectItem value="basic">Базовая</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Уровень поддержки</label>
                    <Select 
                      onValueChange={(value) => handleFilterChange('supportLevel', value as 'rare' | 'moderate' | 'popular' | 'any')}
                      defaultValue="any"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите уровень поддержки" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Любой уровень поддержки</SelectItem>
                        <SelectItem value="rare">Редко поддерживаемые</SelectItem>
                        <SelectItem value="moderate">Умеренно поддерживаемые</SelectItem>
                        <SelectItem value="popular">Часто поддерживаемые</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Сумма пожертвования (необязательно)</label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2">₽</span>
                      <Input 
                        type="text"
                        placeholder="Сумма"
                        className="pl-7"
                        value={filters.donationAmount}
                        onChange={(e) => handleFilterChange('donationAmount', e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Введите сумму, чтобы увидеть, где она будет наиболее эффективна
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">Категории</label>
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
