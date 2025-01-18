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
      "brand": { "value": "", "unit": "%", "insights": "Low CTR indicates a need for better ad creatives or targeting." },
      "competitors": [{ "name": "", "value": "", "unit": "%", "insights": "Higher CTR suggests better targeting or creatives." }]
    },
    "conversion_rate": {
      "brand": { "value": "", "unit": "%", "insights": "Low conversion rate points to landing page issues." },
      "competitors": [{ "name": "", "value": "", "unit": "%", "insights": "Higher rate suggests optimized landing pages." }]
    },
    "cost_per_click": {
      "brand": { "value": "", "unit": "$", "insights": "High CPC reflects inefficient targeting or bidding." },
      "competitors": [{ "name": "", "value": "", "unit": "$", "insights": "Lower CPC implies better efficiency." }]
    },
    "return_on_ad_spend": {
      "brand": { "value": "", "unit": "X", "insights": "Low ROAS signals inefficient ad spend." },
      "competitors": [{ "name": "", "value": "", "unit": "X", "insights": "Higher ROAS shows better strategies." }]
    },
    "lead_generation": {
      "brand": { "value": "", "unit": "leads", "insights": "Low leads require better offers or forms." },
      "competitors": [{ "name": "", "value": "", "unit": "leads", "insights": "Higher leads suggest smoother processes." }]
    },
    "bounce_rate": {
      "brand": { "value": "", "unit": "%", "insights": "High bounce rate reflects poor user experience." },
      "competitors": [{ "name": "", "value": "", "unit": "%", "insights": "Lower rate indicates better alignment." }]
    }
  }
  "Pain Point":"**5 pain points with Statistics**",
  "Suggestion to improve":"**altest five**",
}
`