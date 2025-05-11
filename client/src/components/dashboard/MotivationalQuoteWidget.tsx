import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Sample quotes (in a real app, these would come from the API)
const sampleQuotes = [
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
];

const MotivationalQuoteWidget = () => {
  const [quote, setQuote] = useState(sampleQuotes[0]);
  const [loading, setLoading] = useState(false);

  const getRandomQuote = async () => {
    setLoading(true);
    
    try {
      // In a real implementation, this would be an API call
      // const response = await fetch('/api/quotes/random');
      // const data = await response.json();
      // setQuote(data);
      
      // For now, just pick a random quote from our sample
      const randomIndex = Math.floor(Math.random() * sampleQuotes.length);
      setQuote(sampleQuotes[randomIndex]);
    } catch (error) {
      console.error('Failed to fetch quote:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div className="glass rounded-xl shadow-glass dark:shadow-glass-dark overflow-hidden">
      <div className="p-6 flex flex-col justify-between h-full">
        <div className="mb-4">
          <span className="material-icons text-royal">format_quote</span>
        </div>
        
        {loading ? (
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
          </div>
        ) : (
          <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic mb-4">
            "{quote.text}"
          </blockquote>
        )}
        
        <div className="text-right">
          <p className="font-medium">{quote.author}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center justify-end mt-2 text-royal p-0"
            onClick={getRandomQuote}
            disabled={loading}
          >
            <span className="material-icons text-sm mr-1">refresh</span>
            <span className="text-sm">New Quote</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MotivationalQuoteWidget;
