import { ArrowDownToLine, BarChart3, Database, Sparkles, Warehouse, Workflow } from 'lucide-react';
import type { PipelineStage } from '../types';

/*
 * Educational simulation only. The running example — an online store's
 * orders — is illustrative; nothing here processes real data.
 */
export const pipelineStages: PipelineStage[] = [
  {
    id: 'source',
    label: 'Data Source',
    what: 'The systems where data is first created: application databases, files, APIs, sensors, and event streams.',
    why: 'Every insight is limited by its inputs. Knowing where data comes from — and how reliable it is — shapes every later decision.',
    technologies: ['SQL databases', 'REST APIs', 'CSV / JSON files', 'Event streams'],
    example: "An online store's order database records each purchase, while a CSV export holds the product catalog.",
    sample: `{ "order_id": "A-1042", "sku": "kb-01",
  "amount": "49,90", "ts": "03/02/2025 14:07" }`,
    icon: Database,
  },
  {
    id: 'ingestion',
    label: 'Ingestion',
    what: 'Moving data from sources into a central landing zone, either in scheduled batches or as a continuous stream.',
    why: 'Ingestion decouples analytics from production systems and preserves an untouched raw copy you can always reprocess.',
    technologies: [
      'Azure Data Factory',
      'Fabric Data Factory',
      'Databricks Auto Loader',
      'Snowflake COPY INTO / Snowpipe',
    ],
    example: 'A scheduled pipeline copies new orders every hour into a raw "landing" folder, exactly as they arrived.',
    sample: `raw/orders/2025-02-03/14.json
  ← 1,000 new records appended (unchanged)`,
    icon: ArrowDownToLine,
  },
  {
    id: 'transformation',
    label: 'Transformation',
    what: 'Cleaning, validating, joining, and reshaping raw data into consistent, well-typed tables.',
    why: 'Raw data has duplicates, mixed formats, and gaps. Transformation turns it into something people and models can trust.',
    technologies: ['SQL', 'Python', 'Apache Spark', 'Dataflows Gen2'],
    example: 'Remove duplicate orders, convert "49,90" to 49.90, standardize timestamps to UTC, and join each order to its product category.',
    sample: `{ "order_id": "A-1042", "category": "keyboards",
  "amount": 49.90, "ts_utc": "2025-02-03T14:07:00Z" }`,
    icon: Workflow,
  },
  {
    id: 'storage',
    label: 'Storage',
    what: 'Persisting curated data in a data lake, lakehouse, or warehouse, organized into layers by quality.',
    why: 'Well-organized storage makes data discoverable, governable, and fast to query — at a reasonable cost.',
    technologies: ['Azure Data Lake Storage Gen2', 'OneLake', 'Delta Lake', 'Snowflake tables'],
    example: 'Cleaned orders are saved as a "silver" table; a daily revenue summary is saved as a "gold" table.',
    sample: `bronze.orders_raw    → silver.orders
silver.orders        → gold.daily_revenue`,
    icon: Warehouse,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    what: 'Querying and visualizing curated data to measure what happened and explore why.',
    why: 'Analytics turns tables into answers that people can act on — and often reveals which questions AI could help with.',
    technologies: ['SQL', 'Power BI', 'Databricks SQL', 'Snowflake virtual warehouses'],
    example: 'A dashboard shows daily revenue by category and a SQL query surfaces the top ten products this week.',
    sample: `SELECT category, SUM(amount) AS revenue
FROM gold.daily_revenue GROUP BY category;`,
    icon: BarChart3,
  },
  {
    id: 'ai',
    label: 'AI Insights',
    what: 'Training or applying models on prepared data to forecast, classify, detect anomalies, or generate content.',
    why: 'Models are only as good as their data. A solid pipeline is what makes AI results reliable and repeatable.',
    technologies: ['Azure AI services', 'Azure Machine Learning', 'MLflow', 'scikit-learn'],
    example: "A model forecasts next week's demand per category and flags unusual order spikes for review.",
    sample: `forecast("keyboards", horizon="7d")
  → illustrative output, not a real prediction`,
    icon: Sparkles,
  },
];
