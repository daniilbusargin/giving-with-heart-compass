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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Filter, Shuffle } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";

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
  onRandomSelect?: () => void;
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

const RecommendationFilters = ({ onFilterChange, onRandomSelect }: RecommendationFiltersProps) => {
  const [recommendationMode, setRecommendationMode] = useState<'quick' | 'thoughtful'>('thoughtful');
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
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
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium">Как бы вы хотели выбрать?</h2>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Как работают наши рекомендации</h3>
                  <p className="text-sm text-muted-foreground">
                    Мы учитываем срочность сбора, уровень прозрачности организации, 
                    текущий уровень поддержки и ваши предпочтения по категориям, 
                    чтобы предложить вам наиболее подходящие варианты для пожертвования.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <TabsList>
            <TabsTrigger value="quick">Быстрый выбор</TabsTrigger>
            <TabsTrigger value="thoughtful">Продуманная рекомендация</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="quick" className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Мы покажем вам срочные нужды с высоким рейтингом прозрачности.
          </div>
          {recommendationMode === "quick" && (
            <div className="flex justify-end">
              <Button 
                className="flex items-center gap-2 bg-donation-purple hover:bg-donation-dark-purple"
                onClick={onRandomSelect}
              >
                <Shuffle size={16} />
                <span>Случайный добрый выбор</span>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="thoughtful" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Группа 1: Тип и категории */}
            <div className="space-y-4 border p-3 rounded-md bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h3 className="text-md font-medium">Тип и категории</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>Выберите тип сбора и категории, которые вам интересны</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Тип сбора</label>
                  <ToggleGroup type="single" variant="outline" className="justify-start">
                    <ToggleGroupItem 
                      value="all" 
                      onClick={() => handleFilterChange('type', 'all')}
                      className={filters.type === 'all' ? "bg-donation-purple text-white" : ""}
                    >
                      Все
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="fund" 
                      onClick={() => handleFilterChange('type', 'fund')}
                      className={filters.type === 'fund' ? "bg-donation-purple text-white" : ""}
                    >
                      Фонды
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="campaign" 
                      onClick={() => handleFilterChange('type', 'campaign')}
                      className={filters.type === 'campaign' ? "bg-donation-purple text-white" : ""}
                    >
                      Кампании
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <Collapsible
                  open={showCategories}
                  onOpenChange={setShowCategories}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Категории</label>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {showCategories ? "Скрыть" : "Показать все"}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categoryOptions.slice(0, showCategories ? undefined : 6).map((category) => (
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
                  <CollapsibleContent className="space-y-2">
                    <div className="flex flex-wrap gap-2 pt-2">
                      {categoryOptions.slice(6).map((category) => (
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
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
            
            {/* Группа 2: Срочность и Сумма */}
            <div className="space-y-4 border p-3 rounded-md bg-gray-50">
              <div className="flex items-center gap-2">
                <h3 className="text-md font-medium">Срочность и сумма</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Выберите срочность сбора и укажите сумму пожертвования</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Срочность</label>
                  <Select 
                    onValueChange={(value) => handleFilterChange('urgency', value as 'low' | 'medium' | 'high' | 'any')}
                    defaultValue={filters.urgency}
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
                  <p className="text-xs text-muted-foreground">
                    Высокая срочность означает срочную потребность в помощи
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Сумма пожертвования</label>
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
            </div>
            
            {/* Группа 3: Прозрачность и уровень поддержки */}
            <div className="space-y-4 border p-3 rounded-md bg-gray-50">
              <div className="flex items-center gap-2">
                <h3 className="text-md font-medium">Прозрачность и уровень поддержки</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Выберите требуемый уровень прозрачности и степень поддержки кампании</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Прозрачность</label>
                  <Select 
                    onValueChange={(value) => handleFilterChange('transparency', value as 'basic' | 'detailed' | 'complete' | 'any')}
                    defaultValue={filters.transparency}
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
                  <p className="text-xs text-muted-foreground">
                    Определяет уровень детализации информации о расходовании средств
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Уровень поддержки</label>
                  <Select 
                    onValueChange={(value) => handleFilterChange('supportLevel', value as 'rare' | 'moderate' | 'popular' | 'any')}
                    defaultValue={filters.supportLevel}
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
                  <p className="text-xs text-muted-foreground">
                    Показывает, насколько часто другие пользователи поддерживают эту кампанию
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <Button 
              variant="outline"
              onClick={() => {
                const resetFilters: FilterOptions = {
                  type: 'all',
                  categories: [],
                  urgency: 'any',
                  transparency: 'any',
                  supportLevel: 'any',
                  donationAmount: '',
                };
                setFilters(resetFilters);
                onFilterChange(resetFilters);
              }}
              className="text-sm"
            >
              Сбросить фильтры
            </Button>
            
            <Button 
              className="flex items-center gap-2 bg-donation-purple hover:bg-donation-dark-purple"
              onClick={onRandomSelect}
            >
              <Shuffle size={16} />
              <span>Случайный добрый выбор</span>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecommendationFilters;
