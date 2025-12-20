const OpenAI = require('openai');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Generate campaign content using AI
exports.generateCampaign = async (product, niche, targetAudience, budget, platforms) => {
  try {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === '') {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = `You are a world-class marketing expert. Create a comprehensive advertising campaign for the following:

Product/Service: ${product}
Target Niche: ${niche}
Target Audience: ${targetAudience}
Budget: $${budget}
Platforms: ${platforms.join(', ')}

Generate a complete campaign including:
1. A compelling headline (max 60 characters)
2. Ad description (max 150 characters)
3. Detailed ad copy (2-3 paragraphs)
4. Call-to-action
5. Target keywords (5-7 keywords)
6. Targeting strategy
7. Budget allocation recommendations

Format the response as JSON with these exact keys: headline, description, adCopy, callToAction, keywords (array), targetingStrategy, budgetAllocation`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert marketing strategist who creates high-converting ad campaigns. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    const content = completion.choices[0].message.content;
    
    // Try to parse JSON response
    try {
      const result = JSON.parse(content);
      return result;
    } catch (parseError) {
      // If not JSON, extract key information manually
      return {
        headline: extractSection(content, 'headline') || 'Launch Your Success Today',
        description: extractSection(content, 'description') || 'Transform your business with our proven solution',
        adCopy: extractSection(content, 'ad copy') || content,
        callToAction: extractSection(content, 'call-to-action') || 'Get Started Now',
        keywords: extractKeywords(content),
        targetingStrategy: extractSection(content, 'targeting') || 'Target engaged users interested in ' + niche,
        budgetAllocation: extractSection(content, 'budget') || 'Distribute evenly across platforms'
      };
    }
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    
    // Return fallback campaign if API fails
    return {
      headline: `Transform Your ${niche} Business Today`,
      description: `Discover how ${product} helps you achieve remarkable results in ${niche}`,
      adCopy: `Introducing ${product} - the solution ${targetAudience} have been waiting for. Our proven system helps you succeed in ${niche} with minimal effort and maximum results. Join thousands of satisfied customers who have transformed their business.`,
      callToAction: 'Get Started Now',
      keywords: [niche, product, targetAudience, 'solution', 'results'],
      targetingStrategy: `Target ${targetAudience} aged 25-55 interested in ${niche}. Focus on engaged users who have shown intent to purchase similar products.`,
      budgetAllocation: `Allocate $${Math.floor(budget * 0.4)} to Facebook Ads, $${Math.floor(budget * 0.35)} to Google Ads, and $${Math.floor(budget * 0.25)} to other platforms.`
    };
  }
};

// Helper functions
function extractSection(text, sectionName) {
  const regex = new RegExp(`${sectionName}:?\\s*([^\\n]+)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}

function extractKeywords(text) {
  const keywordMatch = text.match(/keywords?:?\s*\[?(.*?)\]?(\n|$)/i);
  if (keywordMatch) {
    return keywordMatch[1].split(',').map(k => k.trim().replace(/['"]/g, '')).slice(0, 7);
  }
  return ['marketing', 'growth', 'leads', 'conversions', 'sales'];
}

// Generate optimization suggestions
exports.generateOptimizationSuggestions = async (campaign, performance) => {
  try {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === '') {
      return ['Add OpenAI API key to get AI-powered optimization suggestions'];
    }

    const prompt = `Analyze this campaign performance and provide 3-5 actionable optimization suggestions:

Campaign: ${campaign.name}
Impressions: ${performance.impressions}
Clicks: ${performance.clicks}
Conversions: ${performance.conversions}
CTR: ${((performance.clicks / performance.impressions) * 100).toFixed(2)}%
Conversion Rate: ${((performance.conversions / performance.clicks) * 100).toFixed(2)}%
Budget Spent: $${performance.spent}
Revenue: $${performance.revenue}

Provide specific, actionable suggestions to improve performance.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a marketing optimization expert. Provide clear, actionable suggestions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const suggestions = completion.choices[0].message.content
      .split('\n')
      .filter(line => line.trim().length > 0)
      .slice(0, 5);

    return suggestions;
  } catch (error) {
    console.error('Optimization suggestions error:', error);
    return [
      'Increase budget on high-performing ad sets',
      'Test new ad creative variations',
      'Refine targeting parameters',
      'Optimize landing page conversion rate'
    ];
  }
};

module.exports = exports;
