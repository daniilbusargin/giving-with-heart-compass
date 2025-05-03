
export interface Campaign {
  id: string;
  type: 'fund' | 'campaign';
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  goalAmount: number;
  raisedAmount: number;
  category: string[];
  urgency: 'low' | 'medium' | 'high';
  transparency: 'basic' | 'detailed' | 'complete';
  supportLevel: 'rare' | 'moderate' | 'popular';
  verification: boolean;
  reviews: {
    count: number;
    averageRating: number;
    comments: {
      author: string;
      comment: string;
      rating: number;
      date: string;
    }[];
  };
  impactMetrics: {
    [key: string]: string;
  };
  documentationLinks: string[];
}

export const mockCampaigns: Campaign[] = [
  {
    id: "1",
    type: "campaign",
    title: "Emergency Medical Supplies for Children in Crisis",
    shortDescription: "Providing essential medical kits to children affected by the recent natural disaster",
    fullDescription: "The recent flooding has left thousands of children without access to basic healthcare. Your donation will help us provide emergency medical kits containing antibiotics, wound care supplies, fever reducers, and rehydration salts. These kits are desperately needed as local clinics have been destroyed and medical professionals are struggling to meet the overwhelming demand with limited resources. Each kit can help treat up to 10 children for common post-disaster illnesses and injuries, potentially saving lives in this critical period.",
    imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    goalAmount: 500000,
    raisedAmount: 185000,
    category: ["children", "health", "emergency"],
    urgency: "high",
    transparency: "detailed",
    supportLevel: "moderate",
    verification: true,
    reviews: {
      count: 24,
      averageRating: 4.8,
      comments: [
        {
          author: "Dr. Sarah M.",
          comment: "As a pediatrician who has worked with this organization, I can vouch for their effective distribution systems. The medical kits they provide contain exactly what's needed in crisis situations.",
          rating: 5,
          date: "2023-12-15"
        },
        {
          author: "James T.",
          comment: "I donated last month and received a detailed report showing exactly how my money was used. Very transparent operation.",
          rating: 5,
          date: "2023-11-28"
        }
      ]
    },
    impactMetrics: {
      "500": "3 medical kits (helps ~30 children)",
      "1000": "6 medical kits (helps ~60 children)",
      "5000": "30 medical kits (helps ~300 children)"
    },
    documentationLinks: [
      "https://example.com/financial-report-2023",
      "https://example.com/impact-assessment"
    ]
  },
  {
    id: "2",
    type: "fund",
    title: "Sustainable Water Solutions Fund",
    shortDescription: "Supporting long-term clean water projects in under-resourced communities",
    fullDescription: "Access to clean water remains one of the most pressing issues in many communities worldwide. This fund supports sustainable, community-led water projects that provide lasting solutions rather than quick fixes. We partner with local experts to implement appropriate technologies such as rainwater harvesting systems, well drilling with hand pumps, and water filtration systems. All projects include education and maintenance training to ensure long-term sustainability. Your donation will be pooled with others to fund complete projects from start to finish, with communities having ownership over the solutions.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    goalAmount: 1000000,
    raisedAmount: 230000,
    category: ["water", "sustainability", "infrastructure"],
    urgency: "medium",
    transparency: "complete",
    supportLevel: "rare",
    verification: true,
    reviews: {
      count: 18,
      averageRating: 4.7,
      comments: [
        {
          author: "Emma W.",
          comment: "I've been donating monthly to this fund for over a year. The quarterly reports are incredibly detailed and show real progress in the communities they serve.",
          rating: 5,
          date: "2024-01-12"
        },
        {
          author: "Michael P.",
          comment: "This organization focuses on sustainability and community ownership, which I believe is the only way to create lasting change. Very impressed with their approach.",
          rating: 4,
          date: "2023-11-05"
        }
      ]
    },
    impactMetrics: {
      "1000": "Clean water for 2 families for a year",
      "5000": "Community water filter system (serves ~50 people)",
      "10000": "Partial well funding (serves ~200 people)"
    },
    documentationLinks: [
      "https://example.com/water-project-outcomes",
      "https://example.com/community-impact-report",
      "https://example.com/financial-transparency"
    ]
  },
  {
    id: "3",
    type: "campaign",
    title: "Winter Shelter for Homeless Animals",
    shortDescription: "Providing heated shelters and food for street animals during the harsh winter months",
    fullDescription: "As temperatures drop below freezing, street animals face life-threatening conditions without adequate shelter or food. This campaign will fund the construction and placement of 50 insulated shelters throughout the city, along with a regular feeding program during the winter months. Each shelter can house 3-5 animals and is designed to maintain a life-sustaining temperature even in extreme cold. Additionally, we'll provide high-calorie food that helps animals maintain the body heat they need to survive. Our volunteer team monitors the shelters and provides veterinary care when needed.",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    goalAmount: 175000,
    raisedAmount: 32000,
    category: ["animals", "local aid"],
    urgency: "high",
    transparency: "basic",
    supportLevel: "rare",
    verification: true,
    reviews: {
      count: 7,
      averageRating: 4.4,
      comments: [
        {
          author: "Anna K.",
          comment: "I volunteer with this group and can confirm they're doing incredible work. They're on the streets every day helping animals that have no one else.",
          rating: 5,
          date: "2024-01-03"
        },
        {
          author: "David L.",
          comment: "The shelters they built last year saved dozens of cats in my neighborhood. Glad to see them expanding the program.",
          rating: 4,
          date: "2023-12-20"
        }
      ]
    },
    impactMetrics: {
      "500": "1 winter shelter + food for 1 month",
      "2000": "4 winter shelters + food for 1 month",
      "5000": "10 winter shelters + food for 1 month"
    },
    documentationLinks: [
      "https://example.com/animal-shelter-designs",
      "https://example.com/previous-winter-report"
    ]
  },
  {
    id: "4",
    type: "fund",
    title: "Community Education Initiative",
    shortDescription: "Supporting educational programs for underserved communities focusing on digital literacy",
    fullDescription: "In today's digital world, access to technology education is essential for future opportunities. This fund supports after-school programs, community centers, and libraries in underserved areas to provide digital literacy education, coding classes, and access to hardware and software tools. Programs are designed for various age groups, from elementary students to seniors, ensuring that entire communities can benefit. The curriculum is developed by education experts and adapted to local needs and contexts. Your donation helps cover instructor costs, equipment, learning materials, and facility expenses.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    goalAmount: 750000,
    raisedAmount: 495000,
    category: ["education", "technology", "community"],
    urgency: "medium",
    transparency: "detailed",
    supportLevel: "popular",
    verification: true,
    reviews: {
      count: 36,
      averageRating: 4.9,
      comments: [
        {
          author: "Teacher Linda",
          comment: "I've seen firsthand how these programs transform students' confidence and skills. They're opening doors that were previously closed to many in our community.",
          rating: 5,
          date: "2024-01-15"
        },
        {
          author: "Robert J.",
          comment: "The multi-generational approach is brilliant. I've watched my grandfather learn to video chat with family while my niece is learning coding basics - all through the same program.",
          rating: 5,
          date: "2023-12-12"
        }
      ]
    },
    impactMetrics: {
      "1000": "Digital literacy training for 5 students",
      "5000": "Complete coding course for 15 students",
      "10000": "Computer equipment for a classroom of 20"
    },
    documentationLinks: [
      "https://example.com/education-outcomes-report",
      "https://example.com/program-curriculum",
      "https://example.com/community-impact-stories"
    ]
  },
  {
    id: "5",
    type: "campaign",
    title: "Mental Health Support for Youth",
    shortDescription: "Expanding access to mental health counseling services for teenagers and young adults",
    fullDescription: "Mental health challenges among young people have reached crisis levels, yet many cannot access the support they need due to cost barriers or long waiting lists. This campaign funds immediate access to licensed therapists for youth in crisis, with no waiting periods or financial requirements. We partner with a network of mental health professionals who provide both emergency and ongoing care. The program includes individual therapy, group sessions, family counseling, and digital resources. Our approach prioritizes culturally sensitive care and meets young people through both in-person and telehealth options.",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    goalAmount: 350000,
    raisedAmount: 118000,
    category: ["youth", "health", "mental health"],
    urgency: "high",
    transparency: "detailed",
    supportLevel: "moderate",
    verification: true,
    reviews: {
      count: 15,
      averageRating: 4.8,
      comments: [
        {
          author: "Anonymous Parent",
          comment: "This program saved my daughter's life. When we couldn't afford therapy and the hospital had a 3-month waiting list, they connected us with a therapist within 48 hours.",
          rating: 5,
          date: "2023-12-03"
        },
        {
          author: "Sam T.",
          comment: "As someone who benefited from this program last year, I can say the quality of care is exceptional. The therapists truly understand youth-specific challenges.",
          rating: 5,
          date: "2023-11-22"
        }
      ]
    },
    impactMetrics: {
      "500": "3 therapy sessions for a teen in crisis",
      "2000": "Full month of weekly therapy for 3 teens",
      "5000": "Crisis intervention and 3-month therapy program for 5 teens"
    },
    documentationLinks: [
      "https://example.com/mental-health-outcomes",
      "https://example.com/therapist-credentials",
      "https://example.com/program-methodology"
    ]
  }
];

export const getCampaignById = (id: string): Campaign | undefined => {
  return mockCampaigns.find(campaign => campaign.id === id);
};

export const getRecommendation = (
  filters: {
    type?: 'fund' | 'campaign' | 'all';
    categories?: string[];
    urgency?: 'low' | 'medium' | 'high' | 'any';
    transparency?: 'basic' | 'detailed' | 'complete' | 'any';
    supportLevel?: 'rare' | 'moderate' | 'popular' | 'any';
  }
): Campaign[] => {
  let filtered = [...mockCampaigns];
  
  // Filter by type
  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter(campaign => campaign.type === filters.type);
  }
  
  // Filter by categories
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(campaign => 
      filters.categories?.some(category => campaign.category.includes(category))
    );
  }
  
  // Filter by urgency
  if (filters.urgency && filters.urgency !== 'any') {
    filtered = filtered.filter(campaign => campaign.urgency === filters.urgency);
  }
  
  // Filter by transparency
  if (filters.transparency && filters.transparency !== 'any') {
    filtered = filtered.filter(campaign => campaign.transparency === filters.transparency);
  }
  
  // Filter by support level
  if (filters.supportLevel && filters.supportLevel !== 'any') {
    filtered = filtered.filter(campaign => campaign.supportLevel === filters.supportLevel);
  }
  
  // Get a mix of rare and popular campaigns if no specific support level is chosen
  if (!filters.supportLevel || filters.supportLevel === 'any') {
    // Ensure at least one rare campaign is included if available
    const rareOnes = filtered.filter(c => c.supportLevel === 'rare');
    if (rareOnes.length > 0 && filtered.length > rareOnes.length) {
      // Move one random rare campaign to the top
      const randomRare = rareOnes[Math.floor(Math.random() * rareOnes.length)];
      filtered = [randomRare, ...filtered.filter(c => c.id !== randomRare.id)];
    }
  }
  
  return filtered;
};
