/**
 * Blog data source
 *
 * RECOMMENDED CHEAPEST PERSISTENCE OPTIONS:
 *
 * 1. **Cheapest ($0)**: Keep as TypeScript/JSON in this file or move to public/blogs.json
 *    - Update by editing + git commit + deploy.
 *    - No external dependencies.
 *
 * 2. **Lightweight + editable without redeploy (Recommended for growth)**: Supabase (Free tier)
 *    - Free Postgres + 500MB storage, generous API limits.
 *    - Install: npm install @supabase/supabase-js
 *    - Fetch blogs from a `blogs` table with JS client (very lightweight).
 *    - You can add/edit blogs from Supabase dashboard or a simple admin form.
 *
 * 3. Other free/light options: Firebase (Firestore), Cloudflare D1, or Markdown files + frontmatter.
 *
 * For now we use in-code data for simplicity and zero cost.
 */
export interface Blog {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  views: string;
}

export const blogs: Blog[] = [
  {
    title: "GST Updates 2024: What Businesses Need to Know",
    excerpt: "A comprehensive overview of the latest changes and updates in the Goods and Services Tax regulations for the year 2024, including new compliance requirements.",
    content: "The Goods and Services Tax (GST) landscape in India continues to evolve, with 2024 bringing several significant updates that businesses must be aware of. This comprehensive guide covers all the major changes, new compliance requirements, and their impact on different business sectors. From updated return filing procedures to new exemption categories, we'll explore how these changes affect your business operations and what steps you need to take to ensure continued compliance. Additionally, we'll discuss the technological improvements in the GST portal and how they can streamline your tax processes.",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Tax Law",
    views: "2.5k"
  },
  {
    title: "Tax Planning Strategies for Small Businesses",
    excerpt: "Effective strategies for small businesses to optimize their tax planning and ensure compliance while maximizing savings through legal deductions.",
    content: "Small businesses face unique challenges when it comes to tax planning. This detailed guide provides practical strategies that can help small business owners reduce their tax burden legally while maintaining full compliance. We'll cover various deduction opportunities, timing strategies for income and expenses, retirement planning benefits, and how to structure your business for optimal tax efficiency. Learn about Section 44AD benefits, depreciation strategies, and how to leverage various government schemes designed specifically for small businesses.",
    date: "February 28, 2024",
    readTime: "12 min read",
    category: "Business Finance",
    views: "3.1k"
  },
  {
    title: "Understanding Income Tax Returns: A Complete Guide",
    excerpt: "A beginner's guide to understanding and filing income tax returns in India, covering all forms, deadlines, and common mistakes to avoid.",
    content: "Filing income tax returns can seem daunting, especially for first-time filers. This comprehensive guide breaks down the entire process into manageable steps. We'll cover different ITR forms and when to use them, how to gather necessary documents, step-by-step filing procedures, and common mistakes that can lead to notices from the tax department. Additionally, we'll discuss e-verification methods, how to track your refund status, and what to do if you need to file a revised return. Special attention is given to new taxpayers and those switching between old and new tax regimes.",
    date: "January 20, 2024",
    readTime: "10 min read",
    category: "Personal Finance",
    views: "4.2k"
  }
];

export const categoryColors: Record<string, string> = {
  'Tax Law': 'bg-blue-50 text-blue-700',
  'Business Finance': 'bg-emerald-50 text-emerald-700',
  'Personal Finance': 'bg-amber-50 text-amber-700',
};