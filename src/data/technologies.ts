import { Boxes, Cloud, Layers, Snowflake } from 'lucide-react';
import type { MapEdge, MapNode, Technology } from '../types';

/*
 * Descriptions summarize what each platform is. They intentionally say
 * nothing about proficiency or certification.
 * Product names are trademarks of their respective owners.
 */
export const technologies: Technology[] = [
  {
    id: 'azure',
    name: 'Microsoft Azure',
    category: 'Cloud Platform',
    summary: 'Cloud computing, infrastructure, and AI services.',
    details:
      "Microsoft's cloud platform provides on-demand compute, storage, networking, databases, and managed AI services. It is the infrastructure layer that many data and AI workloads run on.",
    topics: [
      'Subscriptions & resource groups',
      'Azure Storage & Data Lake Storage Gen2',
      'Compute: virtual machines & App Service',
      'Azure AI services',
      'Identity with Microsoft Entra ID',
    ],
    connections: ['AI', 'Data Engineering'],
    mapNodes: ['cloud', 'storage', 'ai'],
    icon: Cloud,
  },
  {
    id: 'fabric',
    name: 'Microsoft Fabric',
    category: 'Unified Analytics',
    summary: 'Data engineering, analytics, and unified data workflows.',
    details:
      'A software-as-a-service analytics platform that brings data engineering, data integration, warehousing, real-time analytics, data science, and Power BI together around a single data lake called OneLake.',
    topics: [
      'OneLake',
      'Lakehouse & Warehouse items',
      'Data Factory pipelines & Dataflows Gen2',
      'Spark notebooks',
      'Power BI semantic models',
    ],
    connections: ['Data Engineering'],
    mapNodes: ['processing', 'storage', 'analytics'],
    icon: Layers,
  },
  {
    id: 'databricks',
    name: 'Databricks',
    category: 'Lakehouse Platform',
    summary: 'Data engineering, distributed processing, lakehouse architecture, and AI.',
    details:
      'A data and AI platform built around Apache Spark. It popularized the lakehouse pattern, combining low-cost data lake storage (with Delta Lake tables) and warehouse-style reliability, plus tooling for machine learning.',
    topics: [
      'Apache Spark DataFrames',
      'Delta Lake tables',
      'Medallion architecture (bronze / silver / gold)',
      'Unity Catalog',
      'MLflow experiment tracking',
    ],
    connections: ['AI', 'Data Engineering'],
    mapNodes: ['processing', 'storage', 'ai'],
    icon: Boxes,
  },
  {
    id: 'snowflake',
    name: 'Snowflake',
    category: 'Cloud Data Warehouse',
    summary: 'Cloud data warehousing, SQL analytics, and scalable data platforms.',
    details:
      'A cloud data platform that separates storage from compute. Independent "virtual warehouses" run SQL workloads, so teams can scale analytics without competing for the same resources.',
    topics: [
      'Virtual warehouses',
      'Databases, schemas & stages',
      'Loading data with COPY INTO',
      'Time Travel',
      'Snowpark for Python',
    ],
    connections: ['Data Engineering'],
    mapNodes: ['storage', 'processing', 'analytics'],
    icon: Snowflake,
  },
];

export const mapNodes: MapNode[] = [
  {
    id: 'cloud',
    label: 'Cloud Infrastructure',
    description: 'Compute, networking, identity, and storage services everything else runs on.',
    x: 200,
    y: 52,
  },
  {
    id: 'processing',
    label: 'Data Processing',
    description: 'Ingesting, cleaning, and transforming data — often with SQL or distributed Spark jobs.',
    x: 78,
    y: 168,
  },
  {
    id: 'storage',
    label: 'Storage & Lakehouse',
    description: 'Where curated data lives: data lakes, lakehouse tables, and warehouses.',
    x: 322,
    y: 168,
  },
  {
    id: 'analytics',
    label: 'Analytics & BI',
    description: 'Querying and visualizing data to answer questions and track trends.',
    x: 112,
    y: 300,
  },
  {
    id: 'ai',
    label: 'AI & ML',
    description: 'Models that learn from prepared data to predict, classify, or generate.',
    x: 288,
    y: 300,
  },
];

export const mapEdges: MapEdge[] = [
  { from: 'cloud', to: 'processing' },
  { from: 'cloud', to: 'storage' },
  { from: 'processing', to: 'storage' },
  { from: 'storage', to: 'analytics' },
  { from: 'storage', to: 'ai' },
  { from: 'processing', to: 'ai' },
  { from: 'analytics', to: 'ai' },
];
