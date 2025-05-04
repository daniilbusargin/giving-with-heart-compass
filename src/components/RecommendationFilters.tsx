
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface FilterOptions {
  type: 'fund' | 'campaign' | 'all';
  categories: string[];
  urgency: 'low' | 'medium' | 'high' | 'any';
  transparency: 'basic' | 'detailed' | 'complete' | 'any';
  donationAmount: string;
}

interface RecommendationFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  onRandomSelect?: () => void;
}

// Категории, сгруппированные по типу
const categoryGroups = {
  recipients: [
    { value: 'children', label: 'Дети' },
    { value: 'youth', label: 'Молодёжь' },
    { value: 'elderly', label: 'Пожилые' },
    { value: 'animals', label: 'Животные' },
  ],
  assistance: [
    { value: 'health', label: 'Здоровье' },
    { value: 'mental health', label: 'Психическое здоровье' },
    { value: 'education', label: 'Образование' },
    { value: 'emergency', label: 'Экстренная помощь' },
    { value: 'local aid', label: 'Местная помощь' },
  ],
  development: [
    { value: 'technology', label: 'Технологии' },
    { value: 'sustainability', label: 'Экологичность' },
    { value: 'community', label: 'Сообщество' },
    { value: 'water', label: 'Вода' },
  ]
};

// Все категории в одном массиве для совместимости
const categoryOptions = [
  ...categoryGroups.recipients,
  ...categoryGroups.assistance,
  ...categoryGroups.development
];

const RecommendationFilters = ({ onFilterChange, onRandomSelect }: RecommendationFiltersProps) => {
  const [recommendationMode, setRecommendationMode] = useState<'quick' | 'thoughtful'>('thoughtful');
  const [filters, setFilters] = useState<FilterOptions>({
    type: 'all',
    categories: [],
    urgency: 'any',
    transparency: 'any',
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
        transparency: 'detailed',
      };
      setFilters(quickFilters);
      onFilterChange(quickFilters);
    }
  };

  // Функция сброса всех фильтров
  const resetAllFilters = () => {
    const resetFilters: FilterOptions = {
      type: 'all',
      categories: [],
      urgency: 'any',
      transparency: 'any',
      donationAmount: '',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
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
              <PopoverContent className="w-80 p-4 bg-white">
                <div className="space-y-2">
                  <h3 className="font-medium">Как работают наши рекомендации</h3>
                  <p className="text-sm text-muted-foreground">
                    Мы учитываем срочность сбора, уровень прозрачности организации
                    и ваши предпочтения по категориям, чтобы предложить вам наиболее 
                    подходящие варианты для пожертвования.
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
            {/* Группа 1: Тип и категории - первая строка */}
            <div className="space-y-4 border p-3 rounded-md bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Тип сбора</label>
                  <ToggleGroup type="single" variant="outline" className="justify-start">
                    <ToggleGroupItem 
                      value="all" 
                      onClick={() => handleFilterChange('type', 'all')}
                      className={filters.type === 'all' ? "bg-donation-purple text-white hover:bg-donation-dark-purple" : ""}
                    >
                      Все
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="fund" 
                      onClick={() => handleFilterChange('type', 'fund')}
                      className={filters.type === 'fund' ? "bg-donation-purple text-white hover:bg-donation-dark-purple" : ""}
                    >
                      Фонды
                    </ToggleGroupItem>
                    <ToggleGroupItem 
                      value="campaign" 
                      onClick={() => handleFilterChange('type', 'campaign')}
                      className={filters.type === 'campaign' ? "bg-donation-purple text-white hover:bg-donation-dark-purple" : ""}
                    >
                      Кампании
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Категории</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-between cursor-pointer"
                      >
                        <span>
                          {filters.categories.length > 0 
                            ? `Выбрано категорий: ${filters.categories.length}` 
                            : "Выберите категории"}
                        </span>
                        <Filter className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent className="w-64 bg-white">
                      <DropdownMenuLabel>Выберите категории</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-xs text-gray-500">По типу благополучателей</DropdownMenuLabel>
                        {categoryGroups.recipients.map((category) => (
                          <DropdownMenuItem 
                            key={category.value} 
                            className="flex items-center cursor-pointer"
                            onClick={() => handleCategoryToggle(category.value)}
                          >
                            <div className={`w-4 h-4 mr-2 border rounded ${filters.categories.includes(category.value) ? 'bg-donation-purple border-donation-purple' : 'border-gray-300'}`}></div>
                            {category.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-xs text-gray-500">По тематике помощи</DropdownMenuLabel>
                        {categoryGroups.assistance.map((category) => (
                          <DropdownMenuItem 
                            key={category.value} 
                            className="flex items-center cursor-pointer"
                            onClick={() => handleCategoryToggle(category.value)}
                          >
                            <div className={`w-4 h-4 mr-2 border rounded ${filters.categories.includes(category.value) ? 'bg-donation-purple border-donation-purple' : 'border-gray-300'}`}></div>
                            {category.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-xs text-gray-500">По направлениям развития</DropdownMenuLabel>
                        {categoryGroups.development.map((category) => (
                          <DropdownMenuItem 
                            key={category.value} 
                            className="flex items-center cursor-pointer"
                            onClick={() => handleCategoryToggle(category.value)}
                          >
                            <div className={`w-4 h-4 mr-2 border rounded ${filters.categories.includes(category.value) ? 'bg-donation-purple border-donation-purple' : 'border-gray-300'}`}></div>
                            {category.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <div className="flex flex-wrap gap-2 min-h-[32px]">
                    {filters.categories.slice(0, 3).map((categoryValue) => {
                      const category = categoryOptions.find(c => c.value === categoryValue);
                      return category ? (
                        <Badge
                          key={category.value}
                          variant="default"
                          className="bg-donation-purple hover:bg-donation-dark-purple cursor-pointer"
                          onClick={() => handleCategoryToggle(category.value)}
                        >
                          {category.label} ×
                        </Badge>
                      ) : null;
                    })}
                    
                    {filters.categories.length > 3 && (
                      <Badge variant="outline" className="cursor-pointer" onClick={() => {}}>
                        +{filters.categories.length - 3} ещё
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Группа 2: Срочность, Прозрачность и Сумма - вторая строка */}
            <div className="space-y-4 border p-3 rounded-md bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Срочность</label>
                  <Select 
                    value={filters.urgency}
                    onValueChange={(value) => handleFilterChange('urgency', value as 'low' | 'medium' | 'high' | 'any')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите срочность" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="any">Любая срочность</SelectItem>
                      <SelectItem value="high">Высокая срочность</SelectItem>
                      <SelectItem value="medium">Средняя срочность</SelectItem>
                      <SelectItem value="low">Низкая срочность</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Высокая — до 3 дней, средняя — 3–7 дней, низкая — больше недели
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Прозрачность</label>
                  <Select 
                    value={filters.transparency}
                    onValueChange={(value) => handleFilterChange('transparency', value as 'basic' | 'detailed' | 'complete' | 'any')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите прозрачность" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="any">Любая прозрачность</SelectItem>
                      <SelectItem value="complete">Полная (детальные отчеты)</SelectItem>
                      <SelectItem value="detailed">Детальная</SelectItem>
                      <SelectItem value="basic">Базовая</SelectItem>
                    </SelectContent>
                  </Select>
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
                    Мы покажем, где ваша сумма будет наиболее полезной
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2">
            <Button 
              variant="outline"
              onClick={resetAllFilters}
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
