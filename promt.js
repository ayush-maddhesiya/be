import { MODIFICATIONS_TAG_NAME, WORK_DIR, allowedHTMLElements } from './constants.js';
// import { stripIndents } from "./stripindents.js";
const cwd = process.cwd(); 

export const BASE_PROMPT = "For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\nUse icons from lucide-react for logos.\n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n\n";

export const getSystemPrompt = `
{
  "brand_name": "",
  "category": "",
  "market_share": "",
  "campaign_performance": {
    "click_through_rate": {
      "brand": {
        "value": "",
        "unit": "%",
        "insights": "Low CTR may indicate a need for more compelling ad creatives or targeting adjustments."
      },
      "competitors": [
        {
          "competitor_name": "",
          "value": "",
          "unit": "%",
          "insights": "Competitor has a higher CTR, suggesting more effective creatives or targeting."
        }
      ]
    },
    "conversion_rate": {
      "brand": {
        "value": "",
        "unit": "%",
        "insights": "A lower conversion rate suggests potential issues in landing page experience or offer mismatch."
      },
      "competitors": [
        {
          "competitor_name": "",
          "value": "",
          "unit": "%",
          "insights": "Competitor has a higher conversion rate, possibly due to optimized landing pages or stronger offers."
        }
      ]
    },
    "cost_per_click": {
      "brand": {
        "value": "",
        "unit": "$",
        "insights": "A high CPC might indicate inefficient targeting, bidding strategy, or competition for keywords."
      },
      "competitors": [
        {
          "competitor_name": "",
          "value": "",
          "unit": "$",
          "insights": "Competitor has lower CPC, suggesting better ad efficiency or more refined targeting."
        }
      ]
    },
    "cost_per_acquisition": {
      "brand": {
        "value": "",
        "unit": "$",
        "insights": "High CPA can be a result of low conversion rates or ineffective ad targeting. Review customer journey."
      },
      "competitors": [
        {
          "competitor_name": "",
          "value": "",
          "unit": "$",
          "insights": "Competitor has lower CPA, indicating better optimization of ad spend or more efficient targeting."
        }
      ]
    },
    "return_on_ad_spend": {
      "brand": {
        "value": "",
        "unit": "X",
        "insights": "Low ROAS suggests inefficiency in ad spend, possibly due to poor targeting, creatives, or offers."
      },
      "competitors": [
        {
          "competitor_name": "",
          "value": "",
          "unit": "X",
          "insights": "Competitor achieves higher ROAS, suggesting more effective ad spend allocation or better campaign strategies."
        }
      ]
    },
    "impressions": {
      "brand": {
        "value": "",
        "unit": "impressions",
        "insights": "Impressions are high but may not be translating into conversions. Focus on improving relevance and engagement."
      },
      "competitors": [
        {
          "competitor_name": "",
          "value": "",
          "unit": "impressions",
          "insights": "Competitor's high impressions could indicate wider reach or more engaging ads."
        }
      ]
    },
    "ad_engagement_rate": {
      "brand": {
        "value": "",
        "unit": "%",
        "insights": "Low engagement could point to irrelevant ad creatives or improper targeting. Consider A/B testing."
      },
      "competitors": [
        {
          "competitor_name": "",
          "value": "",
          "unit": "%",
          "insights": "Competitor's higher engagement rate indicates more appealing or relevant ad content."
        }
      ]
    },
    "lead_generation": {
      "brand": {
        "value": "",
        "unit": "leads",
        "insights": "Low lead generation may require optimizing your lead magnets, forms, or landing pages."
      },
      "competitors": [
        {
          "competitor_name": "",
          "value": "",
          "unit": "leads",
          "insights": "Competitor is generating more leads, suggesting a more attractive offer or smoother conversion process."
        }
      ]
    },
    "bounce_rate": {
      "brand": {
        "value": "",
        "unit": "%",
        "insights": "High bounce rate suggests poor landing page relevance or performance. Optimize the user experience."
      },
      "competitors": [
        {
          "competitor_name": "",
          "value": "",
          "unit": "%",
          "insights": "Competitor's lower bounce rate points to a better user experience or a more aligned offer."
        }
      ]
    },
    "customer_lifetime_value": {
      "brand": {
        "value": "",
        "unit": "$",
        "insights": "Low CLV may indicate a lack of customer retention strategies. Focus on repeat business and retention offers."
      },
      "competitors": [
        {
          "competitor_name": "",
          "value": "",
          "unit": "$",
          "insights": "Competitor's higher CLV suggests better customer retention strategies and loyalty programs."
        }
      ]
    },
    "frequency": {
      "brand": {
        "value": "",
        "unit": "times",
        "insights": "Frequency is too high or too low? Adjust to avoid ad fatigue or underexposure."
      },
      "competitors": [
        {
          "competitor_name": "",
          "value": "",
          "unit": "times",
          "insights": "Competitor's optimal frequency suggests they have struck the right balance to maintain brand visibility."
        }
      ]
    },
    "view_through_rate": {
      "brand": {
        "value": "",
        "unit": "%",
        "insights": "Low VTR could suggest that your ads are being skipped or not relevant enough to the audience."
      },
      "competitors": [
        {
          "competitor_name": "",
          "value": "",
          "unit": "%",
          "insights": "Competitor's higher VTR could indicate their ads resonate better with the target audience or have more engaging content."
        }
      ]
    }
  }
}
`