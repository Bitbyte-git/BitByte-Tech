import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  Calculator,
  Check,
  ChevronDown,
  Download,
  FileSpreadsheet,
  FileText,
  Globe,
  Mail,
  MessageCircle,
  Phone,
  Printer,
  Search,
  Send,
  Share2,
  Sparkles,
  User,
  WalletCards,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import { navigate } from '../utils/navigate';

const GST_RATE = 18;
const GST_MULTIPLIER = 1 + GST_RATE / 100;
const MINIMUM_PROFIT_MARGIN = 20;
const stepRoutes = [
  '/quotation-generator/client-details',
  '/quotation-generator/select-services',
  '/quotation-generator/quotation-summary',
  '/quotation-generator/download',
];

const clientRequiredFields = [
  ['companyName', 'Company Name'],
  ['clientName', 'Client Name'],
  ['contactPerson', 'Contact Person'],
  ['phone', 'Phone Number'],
  ['email', 'Email'],
  ['projectName', 'Project Name'],
  ['quotationNumber', 'Quotation Number'],
  ['quotationDate', 'Quotation Date'],
  ['validTill', 'Valid Till'],
];

function createQuotationNumber() {
  const year = new Date().getFullYear();
  const storageKey = `bitbyteQuotationSequence:${year}`;
  let nextSequence = 1;

  if (typeof window !== 'undefined' && window.localStorage) {
    const storedSequence = Number(window.localStorage.getItem(storageKey)) || 0;
    const savedMax = getStoredQuotations().reduce((max, quotation) => {
      const match = String(quotation?.client?.quotationNumber || '').match(/BBT[/-]QT[/-](\d{4})[/-](\d+)$/i);
      if (!match || Number(match[1]) !== year) return max;
      return Math.max(max, Number(match[2]) || 0);
    }, 0);
    nextSequence = Math.max(storedSequence, savedMax) + 1;
    window.localStorage.setItem(storageKey, String(nextSequence));
  }

  return `BBT/QT/${year}/${String(nextSequence).padStart(4, '0')}`;
}

function createInitialClient() {
  return {
    companyName: '',
    clientName: '',
    contactPerson: '',
    phone: '',
    whatsapp: '',
    email: '',
    projectName: '',
    quotationNumber: createQuotationNumber(),
    quotationDate: new Date().toISOString().slice(0, 10),
    validTill: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    address: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    notes: '',
  };
}

const serviceCategories = [
  {
    id: 'branding',
    name: 'Personal Branding',
    icon: User,
    color: 'blue',
    services: [
      ['brand-logo', 'Brand Logo Design', 3750],
      ['brand-kit', 'Brand Identity Kit', 6250],
      ['visual-branding', 'Visual Branding', 6250],
      ['photo-design', 'Photo Design', 375],
      ['video-design', 'Video Design', 750],
      ['ad-creative', 'Ad Creative Design', 1875],
      ['profile-optimization', 'Profile Optimization', 2500],
      ['content-strategy', 'Content Strategy', 5000],
      ['growth-engagement', 'Growth & Engagement', 7500],
    ],
  },
  {
    id: 'marketing',
    name: 'Digital Marketing',
    icon: Send,
    color: 'cyan',
    services: [
      ['social-handling', 'Social Media Account Handling', 3750],
      ['ad-copywriting', 'Ad Copywriting', 1250],
      ['performance-marketing', 'Performance Marketing', 30000],
      ['social-marketing', 'Social Media Marketing', 15000],
      ['content-marketing', 'Content Marketing', 10000],
      ['creative-experiences', 'Creative Digital Experiences', 18750],
      ['whatsapp-campaign', 'WhatsApp Campaign', 6250],
      ['meta-ads', 'Meta Ads Campaign', 43750],
      ['whatsapp-automation', 'WhatsApp Automation', 12500],
    ],
  },
  {
    id: 'seo',
    name: 'SEO Services',
    icon: Search,
    color: 'emerald',
    services: [
      ['basic-seo', 'Basic SEO', 12500],
      ['advanced-seo', 'Advanced SEO', 25000],
      ['enterprise-seo', 'Enterprise SEO', 50000],
      ['aeo', 'AEO', 18750],
      ['geo', 'GEO', 18750],
      ['local-seo', 'Local SEO', 6250],
      ['seo-content', 'SEO Content Writing', 7500],
      ['competitor-analysis', 'Competitor Analysis', 6250],
    ],
  },
  {
    id: 'analytics',
    name: 'Business Analytics & Intelligence',
    icon: BarChart3,
    color: 'teal',
    services: [
      ['analytics-automation', 'Analytics Automation', 15000],
      ['conversion-tracking', 'Conversion Tracking', 8750],
      ['reporting', 'Reporting', 6250],
      ['sales-analytics', 'Sales Analytics', 12500],
      ['customer-analytics', 'Customer Analytics', 12500],
      ['workflow-analytics', 'Workflow Analytics', 15000],
      ['forecasting', 'Forecasting', 18750],
      ['kpi-tracking', 'KPI Tracking', 10000],
      ['data-integration', 'Data Integration', 25000],
      ['inventory', 'Inventory', 18750],
      ['google-ads', 'Google Ads', 10000],
      ['bi-dashboard', 'Business Intelligence Dashboard', 43750],
      ['customer-insights', 'Customer Insights', 12500],
    ],
  },
  {
    id: 'web',
    name: 'Web App Development',
    icon: Globe,
    color: 'cyan',
    services: [
      ['landing-page', 'Landing Page', 10000],
      ['custom-website', 'Custom Website', 25000],
      ['basic-website', 'Basic Website', 15000],
      ['advanced-website', 'Advanced Website', 45000],
      ['web-dashboard', 'Web Dashboard', 35000],
      ['dynamic-website', 'Dynamic Website', 30000],
      ['web-application', 'Web Application', 75000],
      ['erp-crm', 'ERP CRM', 125000],
      ['ecommerce', 'Ecommerce', 65000],
      ['maintenance', 'Maintenance', 7500],
      ['speed-optimization', 'Speed Optimization', 6250],
      ['hosting', 'Hosting', 5000],
      ['innovation-package', 'Innovation Package', 150000],
    ],
  },
];


const colorMap = {
  blue: 'from-blue-400 to-cyan-400 text-cyan-100 border-blue-300/30 bg-blue-400/10',
  cyan: 'from-sky-400 to-cyan-400 text-cyan-100 border-cyan-300/30 bg-cyan-400/10',
  emerald: 'from-emerald-400 to-green-400 text-emerald-100 border-emerald-300/30 bg-emerald-400/10',
  teal: 'from-cyan-400 to-teal-400 text-teal-100 border-teal-300/30 bg-teal-400/10',
  green: 'from-blue-400 to-green-400 text-green-100 border-green-300/30 bg-green-400/10',
};

const fieldClass =
  'w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/20';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
const formatQuotationMoney = (value) =>
  `Rs ${new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0)}`;

const formatQuotationDate = (value) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const getQuotationNumber = (quotationNumber) => {
  const source = quotationNumber || `BBT-QT-${new Date().getFullYear()}-0001`;
  if (source.includes('/PRO/')) return source.replace('/PRO/', '/QT/').replace(/\//g, '-');
  if (source.includes('PRO')) return source.replace('PRO', 'QT').replace(/\//g, '-');
  if (source.includes('/QT/')) return source.replace(/\//g, '-');
  if (source.includes('QT')) return source.replace(/\//g, '-');
  return source.replace(/\//g, '-');
};

const getSacCode = (categoryId) => {
  const sacMap = {
    branding: '998391',
    marketing: '998361',
    seo: '998361',
    analytics: '998313',
    web: '998314',
  };
  return sacMap[categoryId] || '998314';
};
const COMPANY = {
  name: 'Bit Byte Technologies',
  office: 'Corporate Office',
  address: ['2nd Floor, Raja Complex', 'Salem, Tamil Nadu - 636302', 'India'],
  gstin: '33BLNPN539J1ZL',
  udyamId: 'UDYAM-TN-20-0234773',
  phone: '9943743136',
  email: 'reachus@bitbytetech.org',
  website: 'www.bitbytetech.org',
};

function formatDateTime(value = new Date()) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function getClientName(client) {
  return client.companyName || client.clientName || 'Client';
}

function normalizeClientInput(key, value) {
  const source = String(value ?? '');
  if (key === 'phone' || key === 'whatsapp') return source.replace(/\D/g, '').slice(0, 10);
  if (key === 'pincode') return source.replace(/\D/g, '').slice(0, 6);
  if (key === 'email') return source.trim();
  return source;
}

function getClientFieldIssue(client) {
  const missing = clientRequiredFields.find(([key]) => !String(client[key] ?? '').trim());
  if (missing) return { key: missing[0], label: missing[1], message: `${missing[1]} is required` };

  const phone = String(client.phone || '');
  if (!/^\d{10}$/.test(phone)) {
    return { key: 'phone', label: 'Phone Number', message: 'Phone Number must be exactly 10 digits' };
  }

  const whatsapp = String(client.whatsapp || '');
  if (whatsapp && !/^\d{10}$/.test(whatsapp)) {
    return { key: 'whatsapp', label: 'Whatsapp Number', message: 'Whatsapp Number must be exactly 10 digits' };
  }

  const email = String(client.email || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { key: 'email', label: 'Email', message: 'Enter a valid email address' };
  }

  const pincode = String(client.pincode || '');
  if (pincode && !/^\d{6}$/.test(pincode)) {
    return { key: 'pincode', label: 'Pincode', message: 'Pincode must be exactly 6 digits' };
  }

  const quotationDate = client.quotationDate ? new Date(client.quotationDate) : null;
  if (!quotationDate || Number.isNaN(quotationDate.getTime())) {
    return { key: 'quotationDate', label: 'Quotation Date', message: 'Enter a valid quotation date' };
  }

  const validTill = client.validTill ? new Date(client.validTill) : null;
  if (!validTill || Number.isNaN(validTill.getTime())) {
    return { key: 'validTill', label: 'Valid Till', message: 'Enter a valid valid-till date' };
  }

  if (validTill < quotationDate) {
    return { key: 'validTill', label: 'Valid Till', message: 'Valid Till cannot be before Quotation Date' };
  }

  return null;
}

function getMissingClientField(client) {
  const issue = getClientFieldIssue(client);
  return issue ? [issue.key, issue.label, issue.message] : null;
}

function getLineTaxValues(item, billingType) {
  const taxableValue = Number(item.baseAmount || 0);
  const gstTotal = taxableValue * (GST_RATE / 100);
  const cgstAmount = gstTotal / 2;
  const sgstAmount = gstTotal / 2;
  const lineTotal = billingType === 'with-gst' ? taxableValue + gstTotal : Number(item.amount || 0);
  return { taxableValue, cgstAmount, sgstAmount, igstAmount: 0, lineTotal };
}

function loadImageDataUrl(src) {
  return fetch(src)
    .then((response) => (response.ok ? response.blob() : Promise.reject(new Error('Logo not found'))))
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    )
    .catch(() => null);
}

function buildQuotationPdfDefinition({ client, billingType, groupedItems, totals, discount, quotationNumber, logoDataUrl }) {
  const COLORS = {
    blue: '#0F7CEB',
    green: '#6BCB2D',
    navy: '#0F172A',
    text: '#111827',
    muted: '#4B5563',
    border: '#D9DEE7',
    panel: '#F8FAFC',
  };
  const detailTableLayout = {
    hLineWidth: () => 0.6,
    vLineWidth: () => 0.6,
    hLineColor: () => COLORS.border,
    vLineColor: () => COLORS.border,
    paddingLeft: () => 7,
    paddingRight: () => 7,
    paddingTop: () => 5,
    paddingBottom: () => 5,
  };
  const cardLayout = {
    hLineWidth: () => 0.6,
    vLineWidth: () => 0.6,
    hLineColor: () => COLORS.border,
    vLineColor: () => COLORS.border,
    paddingLeft: () => 0,
    paddingRight: () => 0,
    paddingTop: () => 0,
    paddingBottom: () => 0,
  };
  const items = groupedItems.flatMap((group) => group.items.map((item) => ({ ...item, categoryId: group.id })));
  const itemRows = items.length
    ? items.map((item, index) => {
        const tax = getLineTaxValues(item, billingType);
        return [
          { text: String(index + 1), alignment: 'center', margin: [0, 7, 0, 7] },
          { text: item.name || 'Service', bold: true, margin: [0, 7, 0, 7] },
          { text: getSacCode(item.categoryId), alignment: 'center', margin: [0, 7, 0, 7] },
          { text: String(item.qty || 1), alignment: 'center', margin: [0, 7, 0, 7] },
          { text: formatQuotationMoney(tax.taxableValue).replace('Rs ', ''), alignment: 'right', margin: [0, 7, 0, 7] },
          { text: formatQuotationMoney(tax.cgstAmount).replace('Rs ', ''), alignment: 'right', margin: [0, 7, 0, 7] },
          { text: formatQuotationMoney(tax.sgstAmount).replace('Rs ', ''), alignment: 'right', margin: [0, 7, 0, 7] },
          { text: formatQuotationMoney(tax.igstAmount).replace('Rs ', ''), alignment: 'right', margin: [0, 7, 0, 7] },
          { text: formatQuotationMoney(tax.lineTotal).replace('Rs ', ''), alignment: 'right', bold: true, margin: [0, 7, 0, 7] },
        ];
      })
    : [[{ text: 'No quotation line items available.', colSpan: 9, alignment: 'center', color: COLORS.muted, margin: [0, 12, 0, 12] }, {}, {}, {}, {}, {}, {}, {}, {}]];
  const taxableTotal = items.reduce((sum, item) => sum + Number(item.baseAmount || 0), 0);
  const cgstTotal = taxableTotal * 0.09;
  const sgstTotal = taxableTotal * 0.09;
  const detailCell = (label, value) => ({ stack: [{ text: label, style: 'label' }, { text: value || '-', style: 'value' }] });
  const sectionHeaderCell = (label) => ({ text: label, style: 'sectionTitle', alignment: 'center', colSpan: 2, fillColor: '#FFFFFF' });
  const sectionTable = (title, rows) => ({
    table: { widths: ['*', '*'], body: [[sectionHeaderCell(title), {}], ...rows] },
    layout: detailTableLayout,
  });
  const moneyRow = (label, value, options = {}) => [
    { text: label, bold: options.bold || false, color: COLORS.navy, margin: [0, 3, 0, 3] },
    { text: formatQuotationMoney(value), alignment: 'right', bold: options.bold || false, color: COLORS.navy, margin: [0, 3, 0, 3] },
  ];

  return {
    pageSize: 'A4',
    pageMargins: [18, 14, 18, 22],
    content: [
      {
        canvas: [
          { type: 'line', x1: 0, y1: 0, x2: 124, y2: 0, lineWidth: 2.2, lineColor: COLORS.blue },
          { type: 'line', x1: 124, y1: 0, x2: 559, y2: 0, lineWidth: 2.2, lineColor: COLORS.green },
        ],
        margin: [0, 0, 0, 0],
      },
      {
        table: {
          widths: [124, '*'],
          body: [[
            {
              fillColor: COLORS.navy,
              stack: logoDataUrl
                ? [{ image: logoDataUrl, width: 92, alignment: 'center', margin: [0, 48, 0, 0] }]
                : [{ text: 'BB', alignment: 'center', color: COLORS.green, bold: true, fontSize: 42, margin: [0, 58, 0, 0] }],
              margin: [0, 0, 0, 0],
            },
            {
              fillColor: COLORS.navy,
              stack: [
                {
                  text: [
                    { text: 'Bit Byte ', color: COLORS.blue },
                    { text: 'Technologies', color: COLORS.green },
                  ],
                  bold: true,
                  fontSize: 30,
                  margin: [0, 0, 0, 16],
                },
                {
                  columns: [
                    { width: 26, text: 'LOC', color: COLORS.blue, bold: true, fontSize: 8, margin: [0, 5, 0, 0] },
                    {
                      width: '*',
                      stack: [
                        { text: `${COMPANY.office}, ${COMPANY.address[0]}`, color: '#FFFFFF', fontSize: 11.6, bold: true, margin: [0, 0, 0, 3] },
                        { text: `${COMPANY.address[1]}, ${COMPANY.address[2]}`, color: '#FFFFFF', fontSize: 11.6, bold: true },
                      ],
                    },
                  ],
                  margin: [0, 0, 0, 12],
                },
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 380, y2: 0, lineWidth: 0.6, lineColor: '#47627F' }], margin: [0, 0, 0, 10] },
                {
                  columns: [
                    { width: 30, text: 'GST', color: COLORS.blue, bold: true, fontSize: 8, margin: [0, 2, 0, 0] },
                    { width: 'auto', text: `GST NO : ${COMPANY.gstin}`, color: '#FFFFFF', fontSize: 10.4, bold: true },
                    { width: 28, text: '|', alignment: 'center', color: '#C8D1E0', fontSize: 10.5 },
                    { width: 38, text: 'MSME', color: COLORS.green, bold: true, fontSize: 8, margin: [0, 2, 0, 0] },
                    { width: '*', text: `UDYAM : ${COMPANY.udyamId}`, color: '#FFFFFF', fontSize: 10.4, bold: true },
                  ],
                  margin: [0, 0, 0, 11],
                },
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 380, y2: 0, lineWidth: 0.6, lineColor: '#47627F' }], margin: [0, 0, 0, 10] },
                {
                  columns: [
                    { width: 'auto', text: `MAIL  ${COMPANY.email}`, color: '#FFFFFF', fontSize: 9.1, bold: true },
                    { width: 18, text: '|', alignment: 'center', color: '#C8D1E0', fontSize: 9.2 },
                    { width: 'auto', text: `WEB  ${COMPANY.website}`, color: '#FFFFFF', fontSize: 9.1, bold: true },
                    { width: 18, text: '|', alignment: 'center', color: '#C8D1E0', fontSize: 9.2 },
                    { width: '*', text: `WA  +91 ${COMPANY.phone} ( WhatsApp Only )`, color: '#FFFFFF', fontSize: 9.1, bold: true },
                  ],
                },
              ],
              margin: [22, 16, 20, 17],
            },
          ]],
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: (index) => (index === 1 ? 0.6 : 0),
          hLineColor: () => '#FFFFFF',
          vLineColor: () => '#D7DEE8',
          paddingLeft: () => 0,
          paddingRight: () => 0,
          paddingTop: () => 0,
          paddingBottom: () => 0,
        },
        margin: [0, 0, 0, 10],
      },
      {
        columns: [
          { width: '*', ...sectionTable('CLIENT DETAILS', [
            [detailCell('CLIENT NAME', client.clientName || getClientName(client)), detailCell('E-MAIL', client.email || '-')],
            [detailCell('PHONE', client.phone || '-'), detailCell('PROJECT', client.projectName || '-')],
            [detailCell('COMPANY', getClientName(client)), detailCell('CONTACT', client.contactPerson || '-')],
          ]) },
          { width: '*', ...sectionTable('QUOTATION DETAILS', [
            [detailCell('QUOTATION DT', formatQuotationDate(client.quotationDate)), detailCell('QUOTATION ID', quotationNumber)],
            [detailCell('VALID TILL', formatQuotationDate(client.validTill)), detailCell('BILLING TYPE', billingType === 'with-gst' ? 'With GST' : 'Without GST')],
            [detailCell('GENERATED BY', 'BBTech Admin Team'), detailCell('TYPE', 'Instant Quotation')],
          ]) },
        ],
        columnGap: 12,
        margin: [0, 0, 0, 8],
      },
      {
        margin: [0, 0, 0, 9],
        table: {
          headerRows: 2,
          widths: [24, '*', 38, 24, 56, 48, 48, 48, 58],
          body: [
            [{ text: 'QUOTATION DETAILS', style: 'sectionTitle', alignment: 'center', colSpan: 9, fillColor: '#FFFFFF' }, {}, {}, {}, {}, {}, {}, {}, {}],
            [
              { text: 'S.No', style: 'tableHeader', alignment: 'center' },
              { text: 'Description', style: 'tableHeader' },
              { text: 'SAC', style: 'tableHeader', alignment: 'center' },
              { text: 'Qty', style: 'tableHeader', alignment: 'center' },
              { text: 'Taxable', style: 'tableHeader', alignment: 'right' },
              { text: 'CGST', style: 'tableHeader', alignment: 'right' },
              { text: 'SGST', style: 'tableHeader', alignment: 'right' },
              { text: 'IGST', style: 'tableHeader', alignment: 'right' },
              { text: 'Total', style: 'tableHeader', alignment: 'right' },
            ],
            ...itemRows,
          ],
        },
        layout: {
          fillColor: (rowIndex) => (rowIndex === 1 ? COLORS.navy : '#FFFFFF'),
          hLineWidth: () => 0.6,
          vLineWidth: () => 0.6,
          hLineColor: () => COLORS.border,
          vLineColor: () => COLORS.border,
          paddingLeft: () => 5,
          paddingRight: () => 5,
          paddingTop: () => 5,
          paddingBottom: () => 5,
        },
      },
      {
        table: {
          widths: ['*', '*'],
          body: [[
            { stack: [
              { text: 'TERMS & CONDITIONS', style: 'sectionTitle' },
              { ul: [
                'This quotation is valid until the mentioned valid till date.',
                'Prices are subject to selected services, quantities, GST preference, and approved discount.',
                'This is a computer-generated quotation.',
              ], margin: [0, 9, 0, 0], lineHeight: 1.2 },
            ], margin: [10, 14, 10, 14] },
            { stack: [
              { text: 'QUOTATION SUMMARY', style: 'sectionTitle' },
              { table: { widths: ['*', 94], body: [
                moneyRow('Taxable Amount', taxableTotal),
                moneyRow('CGST Total', cgstTotal),
                moneyRow('SGST Total', sgstTotal),
                moneyRow('IGST Total', 0),
                moneyRow(`Discount (${Number(discount) || 0}%)`, totals.discountAmount || 0),
                moneyRow('Grand Total', totals.grandTotal || 0, { bold: true }),
              ] }, layout: 'noBorders', margin: [0, 8, 0, 0] },
            ], margin: [10, 14, 10, 14] },
          ]],
        },
        layout: cardLayout,
        fontSize: 8,
        margin: [0, 0, 0, 10],
      },
      {
        table: { widths: ['*'], body: [[{ columns: [
          {
            width: 190,
            stack: [
              { text: 'For Bit Byte Technologies', alignment: 'center', fontSize: 9.5, bold: true, color: COLORS.navy, margin: [0, 0, 0, 44] },
              { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 190, y2: 0, lineWidth: 0.7, lineColor: COLORS.navy }] },
              { text: 'Authorized Signatory', alignment: 'center', fontSize: 9.5, bold: true, color: COLORS.navy, margin: [0, 4, 0, 0] },
            ],
          },
          { width: '*', text: '' },
        ], margin: [12, 14, 12, 24] }]] },
        layout: cardLayout,
        margin: [0, 0, 0, 8],
      },
      { text: 'Thank you for choosing Bit Byte Technologies.', fontSize: 9, color: COLORS.muted, alignment: 'center' },
    ],
    footer: () => ({
      margin: [18, 0, 18, 5],
      columns: [
        { width: 132, text: 'Instant quotation generated by Bit Byte Technologies.', fontSize: 6.3, color: COLORS.muted },
        { width: '*', text: `Email Id : ${COMPANY.email} | Contact No : ${COMPANY.phone}`, fontSize: 6.3, color: COLORS.navy, alignment: 'center', noWrap: true },
        { width: 132, text: `Generated on ${formatDateTime(new Date())}`, fontSize: 6.3, color: COLORS.muted, alignment: 'right' },
      ],
    }),
    styles: {
      label: { fontSize: 6.6, color: COLORS.muted, bold: true, characterSpacing: 0.4 },
      value: { fontSize: 8, color: COLORS.text, bold: true, margin: [0, 2, 0, 0] },
      tableHeader: { bold: true, fontSize: 6.1, color: '#ffffff' },
      sectionTitle: { fontSize: 8.6, bold: true, color: COLORS.navy, margin: [0, 0, 0, 6] },
    },
    defaultStyle: { font: 'Roboto', fontSize: 8, color: '#0f172a' },
  };
}

async function getPdfMake() {
  const [{ default: pdfMake }, pdfFonts] = await Promise.all([
    import('pdfmake/build/pdfmake.js'),
    import('pdfmake/build/vfs_fonts.js'),
  ]);
  const vfs = pdfFonts.default?.vfs || pdfFonts.vfs || pdfFonts.default?.pdfMake?.vfs || pdfFonts.pdfMake?.vfs || pdfFonts.default || pdfFonts['module.exports'];
  if (pdfMake.addVirtualFileSystem) {
    pdfMake.addVirtualFileSystem(vfs);
  } else {
    pdfMake.vfs = vfs;
  }
  return pdfMake;
}

async function createQuotationPdfBlob(payload) {
  const pdfMake = await getPdfMake();
  const logoDataUrl = await loadImageDataUrl('/showcase-assets/BB-Logo.png');
  const definition = buildQuotationPdfDefinition({ ...payload, logoDataUrl });
  return pdfMake.createPdf(definition).getBlob();
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function downloadQuotationPdf(payload) {
  const blob = await createQuotationPdfBlob(payload);
  downloadBlob(blob, `${payload.quotationNumber || 'quotation'}.pdf`);
}

function escapeExcelHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildQuotationExcelHtml({ client, billingType, groupedItems, totals, discount, quotationNumber }) {
  const items = groupedItems.flatMap((group) => group.items.map((item) => ({ ...item, categoryId: group.id })));
  const taxableTotal = items.reduce((sum, item) => sum + Number(item.baseAmount || 0), 0);
  const cgstTotal = taxableTotal * 0.09;
  const sgstTotal = taxableTotal * 0.09;
  const money = (value) => escapeExcelHtml(formatQuotationMoney(value));
  const cell = (value) => escapeExcelHtml(value || '-');
  const itemRows = items.length
    ? items.map((item, index) => {
        const tax = getLineTaxValues(item, billingType);
        return `
          <tr>
            <td class="center">${index + 1}</td>
            <td class="bold">${cell(item.name || 'Service')}</td>
            <td class="center">${cell(getSacCode(item.categoryId))}</td>
            <td class="center">${cell(item.qty || 1)}</td>
            <td class="money">${money(tax.taxableValue)}</td>
            <td class="money">${money(tax.cgstAmount)}</td>
            <td class="money">${money(tax.sgstAmount)}</td>
            <td class="money">${money(tax.igstAmount)}</td>
            <td class="money bold">${money(tax.lineTotal)}</td>
          </tr>`;
      }).join('')
    : '<tr><td colspan="9" class="center muted padded">No quotation line items available.</td></tr>';

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; color: #0f172a; }
    table { border-collapse: collapse; width: 100%; }
    td, th { border: 1px solid #d9dee7; padding: 7px; font-size: 11px; vertical-align: top; }
    .top-blue { background: #0f7ceb; height: 4px; border: 0; padding: 0; }
    .top-green { background: #6bcb2d; height: 4px; border: 0; padding: 0; }
    .brand { background: #0f172a; color: #fff; }
    .brand-name { font-size: 26px; font-weight: 700; }
    .blue { color: #0f7ceb; }
    .green { color: #6bcb2d; }
    .section-title { font-weight: 700; text-align: center; color: #0f172a; background: #ffffff; }
    .label { color: #4b5563; font-size: 10px; font-weight: 700; text-transform: uppercase; }
    .value { font-size: 12px; font-weight: 700; }
    .table-head th { background: #0f172a; color: #fff; font-weight: 700; }
    .center { text-align: center; }
    .money { text-align: right; white-space: nowrap; }
    .bold { font-weight: 700; }
    .muted { color: #4b5563; }
    .padded { padding: 16px; }
    .summary td { border: 0; padding: 5px 7px; }
    .footer { text-align: center; color: #4b5563; font-size: 11px; border: 0; }
  </style>
</head>
<body>
  <table>
    <colgroup><col span="9" /></colgroup>
    <tr><td colspan="4" class="top-blue"></td><td colspan="5" class="top-green"></td></tr>
    <tr class="brand">
      <td colspan="2" class="center"><span class="brand-name"><span class="blue">Bit Byte</span> <span class="green">Technologies</span></span></td>
      <td colspan="7">
        <div class="brand-name"><span class="blue">Bit Byte</span> <span class="green">Technologies</span></div>
        <div>${cell(COMPANY.office)}, ${cell(COMPANY.address[0])}</div>
        <div>${cell(COMPANY.address[1])}, ${cell(COMPANY.address[2])}</div>
        <div class="bold">GST NO : ${cell(COMPANY.gstin)}</div>
        <div class="bold">MSME : ${cell(COMPANY.udyamId)}</div>
      </td>
    </tr>
    <tr><td colspan="9"></td></tr>
    <tr>
      <td colspan="5" class="section-title">CLIENT DETAILS</td>
      <td colspan="4" class="section-title">QUOTATION DETAILS</td>
    </tr>
    <tr>
      <td colspan="2"><div class="label">CLIENT NAME</div><div class="value">${cell(client.clientName || getClientName(client))}</div></td>
      <td colspan="3"><div class="label">E-MAIL</div><div class="value">${cell(client.email)}</div></td>
      <td colspan="2"><div class="label">QUOTATION DT</div><div class="value">${cell(formatQuotationDate(client.quotationDate))}</div></td>
      <td colspan="2"><div class="label">QUOTATION ID</div><div class="value">${cell(quotationNumber)}</div></td>
    </tr>
    <tr>
      <td colspan="2"><div class="label">PHONE</div><div class="value">${cell(client.phone)}</div></td>
      <td colspan="3"><div class="label">PROJECT</div><div class="value">${cell(client.projectName)}</div></td>
      <td colspan="2"><div class="label">VALID TILL</div><div class="value">${cell(formatQuotationDate(client.validTill))}</div></td>
      <td colspan="2"><div class="label">BILLING TYPE</div><div class="value">${billingType === 'with-gst' ? 'With GST' : 'Without GST'}</div></td>
    </tr>
    <tr>
      <td colspan="2"><div class="label">COMPANY</div><div class="value">${cell(getClientName(client))}</div></td>
      <td colspan="3"><div class="label">CONTACT</div><div class="value">${cell(client.contactPerson)}</div></td>
      <td colspan="2"><div class="label">GENERATED BY</div><div class="value">BBTech Admin Team</div></td>
      <td colspan="2"><div class="label">TYPE</div><div class="value">Instant Quotation</div></td>
    </tr>
    <tr><td colspan="9"></td></tr>
    <tr><td colspan="9" class="section-title">QUOTATION DETAILS</td></tr>
    <tr class="table-head">
      <th>S.No</th><th>Description</th><th>SAC</th><th>Qty</th><th>Taxable</th><th>CGST</th><th>SGST</th><th>IGST</th><th>Total</th>
    </tr>
    ${itemRows}
    <tr><td colspan="9"></td></tr>
    <tr>
      <td colspan="5">
        <div class="section-title">TERMS &amp; CONDITIONS</div>
        <ul>
          <li>This quotation is valid until the mentioned valid till date.</li>
          <li>Prices are subject to selected services, quantities, GST preference, and approved discount.</li>
          <li>This is a computer-generated quotation.</li>
        </ul>
      </td>
      <td colspan="4">
        <div class="section-title">QUOTATION SUMMARY</div>
        <table class="summary">
          <tr><td>Taxable Amount</td><td class="money">${money(taxableTotal)}</td></tr>
          <tr><td>CGST Total</td><td class="money">${money(cgstTotal)}</td></tr>
          <tr><td>SGST Total</td><td class="money">${money(sgstTotal)}</td></tr>
          <tr><td>IGST Total</td><td class="money">${money(0)}</td></tr>
          <tr><td>Discount (${escapeExcelHtml(Number(discount) || 0)}%)</td><td class="money">${money(totals.discountAmount || 0)}</td></tr>
          <tr><td class="bold">Grand Total</td><td class="money bold">${money(totals.grandTotal || 0)}</td></tr>
        </table>
      </td>
    </tr>
    <tr><td colspan="9"></td></tr>
    <tr><td colspan="9" class="center bold padded">For Bit Byte Technologies</td></tr>
    <tr><td colspan="9" class="center bold padded">Authorized Signatory</td></tr>
    <tr><td colspan="9" class="footer">Thank you for choosing Bit Byte Technologies. Generated on ${cell(formatDateTime(new Date()))}</td></tr>
  </table>
</body>
</html>`;
}


function getStoredQuotations() {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem('bitbyteQuotations') || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveStoredQuotations(next) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem('bitbyteQuotations', JSON.stringify(next));
  } catch {
    // Storage can be unavailable in privacy modes; saving is optional.
  }
}

export default function QuotationGeneratorPage({ path = '/quotation-generator/client-details' }) {
  const routeIndex = stepRoutes.indexOf(path);
  const step = routeIndex >= 0 ? routeIndex + 1 : 1;
  const [billingType, setBillingType] = useState('with-gst');
  const [client, setClient] = useState(() => createInitialClient());
  const [openCategory, setOpenCategory] = useState('branding');
  const [selected, setSelected] = useState({});
  const [discount, setDiscount] = useState(0);
  const [status, setStatus] = useState('Draft');
  const [toast, setToast] = useState('');
  const [clientFieldError, setClientFieldError] = useState(null);
  const [highestUnlockedStep, setHighestUnlockedStep] = useState(1);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [savedQuotations, setSavedQuotations] = useState(() => getStoredQuotations());

  const selectedItems = useMemo(() => {
    return serviceCategories.flatMap((category) =>
      category.services
        .filter(([id]) => selected[id]?.checked)
        .map(([id, name, basePrice]) => {
          const qty = selected[id]?.qty || 1;
          const baseAmount = basePrice * qty;
          const hiddenGstAmount = billingType === 'without-gst' ? baseAmount * (GST_RATE / 100) : 0;
          const unitPrice = billingType === 'without-gst' ? basePrice * GST_MULTIPLIER : basePrice;

          return {
            id,
            categoryId: category.id,
            category: category.name,
            name,
            qty,
            baseUnitPrice: basePrice,
            baseAmount,
            hiddenGstAmount,
            unitPrice,
            amount: qty * unitPrice,
          };
        })
    );
  }, [billingType, selected]);

  const totals = useMemo(() => {
    const subtotal = selectedItems.reduce((sum, item) => sum + item.amount, 0);
    const baseSubtotal = selectedItems.reduce((sum, item) => sum + item.baseAmount, 0);
    const hiddenGst = selectedItems.reduce((sum, item) => sum + item.hiddenGstAmount, 0);
    const visibleGst = billingType === 'with-gst' ? baseSubtotal * (GST_RATE / 100) : 0;
    const maxDiscount = MINIMUM_PROFIT_MARGIN;
    const safeDiscount = Math.min(Number(discount) || 0, maxDiscount);
    const discountAmount = subtotal * (safeDiscount / 100);
    const grandTotal = Math.max(subtotal + visibleGst - discountAmount, 0);

    return { subtotal, baseSubtotal, gst: visibleGst, hiddenGst, discountPercent: safeDiscount, discountAmount, grandTotal };
  }, [billingType, discount, selectedItems]);


  const updateClient = (key, value) => {
    const normalizedValue = normalizeClientInput(key, value);
    setClient((current) => ({ ...current, [key]: normalizedValue }));
    if (key === clientFieldError?.key && String(normalizedValue ?? '').trim()) {
      setClientFieldError(null);
    }
  };

  const toggleService = (id) => {
    setSelected((current) => ({
      ...current,
      [id]: {
        checked: !current[id]?.checked,
        qty: current[id]?.qty || 1,
      },
    }));
  };

  const setQty = (id, qty) => {
    setSelected((current) => ({
      ...current,
      [id]: {
        checked: current[id]?.checked || qty > 0,
        qty: Math.max(1, Number(qty) || 1),
      },
    }));
  };

  const handleDiscount = (value) => {
    if (value === '') {
      setDiscount('');
      return;
    }

    const next = Math.max(0, Number(value) || 0);
    if (next > MINIMUM_PROFIT_MARGIN) {
      setDiscount(MINIMUM_PROFIT_MARGIN);
      showToast('Maximum Discount Allowed');
      return;
    }
    setDiscount(next);
  };

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2200);
  };

  const validateClientDetails = () => {
    const issue = getClientFieldIssue(client);
    if (!issue) {
      setClientFieldError(null);
      return true;
    }

    setClientFieldError(issue);
    showToast(issue.message);
    return false;
  };

  const validateSelectedServices = () => {
    if (selectedItems.length > 0) return true;
    showToast('Select at least one service first');
    return false;
  };

  const canCompleteStep = (currentStep) => {
    if (currentStep === 1) return validateClientDetails();
    if (currentStep === 2) return validateClientDetails() && validateSelectedServices();
    if (currentStep === 3) return validateClientDetails() && validateSelectedServices();
    return true;
  };

  const completeStep = (currentStep) => {
    if (!canCompleteStep(currentStep)) return;
    const nextStep = Math.min(currentStep + 1, stepRoutes.length);
    setHighestUnlockedStep((current) => Math.max(current, nextStep));
    navigate(stepRoutes[nextStep - 1]);
  };

  const saveQuotation = (nextStatus = status) => {
    const record = {
      id: `${client.quotationNumber}-${Date.now()}`,
      client,
      billingType,
      selectedItems,
      totals,
      status: nextStatus,
      createdAt: new Date().toISOString(),
    };
    const next = [record, ...savedQuotations].slice(0, 20);
    saveStoredQuotations(next);
    setSavedQuotations(next);
    setStatus(nextStatus);
    showToast(`Quotation saved as ${nextStatus}`);
  };

  const downloadExcel = () => {
    const quotationNumber = getQuotationNumber(client.quotationNumber);
    const html = buildQuotationExcelHtml({
      client,
      billingType,
      groupedItems,
      totals,
      discount,
      quotationNumber,
    });
    const blob = new Blob(['\ufeff', html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${quotationNumber || 'quotation'}.xls`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Excel file generated');
  };
  const getThankYouMessage = () => 'Thank you for confirming your services in Bit Byte Technologies. Please find the quotation PDF attached.';

  const prepareQuotationPdfFile = async () => {
    const quotationNumber = getQuotationNumber(client.quotationNumber);
    const blob = await createQuotationPdfBlob({
      client,
      billingType,
      groupedItems,
      totals,
      discount,
      quotationNumber,
    });
    const filename = `${quotationNumber}.pdf`;
    return { blob, file: new File([blob], filename, { type: 'application/pdf' }), filename, quotationNumber };
  };

  const sharePdfToWhatsApp = async () => {
    try {
      const { blob, file, filename } = await prepareQuotationPdfFile();
      const message = getThankYouMessage();
      const canNativeSharePdf = Boolean(navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] })));

      if (canNativeSharePdf) {
        await navigator.share({ text: message, files: [file] });
        setShareMenuOpen(false);
        showToast('Quotation PDF shared');
        return;
      }

      downloadBlob(blob, filename);
      const phone = String(client.whatsapp || client.phone || '').replace(/\D/g, '');
      const whatsappUrl = phone ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : `https://web.whatsapp.com/send?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setShareMenuOpen(false);
      showToast('PDF downloaded. Attach it in WhatsApp.');
    } catch (error) {
      if (error?.name !== 'AbortError') {
        console.error(error);
        showToast('Unable to prepare quotation PDF');
      }
    }
  };

  const sharePdfToEmail = async () => {
    try {
      const { blob, file, filename, quotationNumber } = await prepareQuotationPdfFile();
      const message = getThankYouMessage();
      const canNativeSharePdf = Boolean(navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] })));

      if (canNativeSharePdf) {
        await navigator.share({ text: message, files: [file] });
        setShareMenuOpen(false);
        showToast('Quotation PDF shared');
        return;
      }

      downloadBlob(blob, filename);
      window.location.href = `mailto:${client.email || ''}?subject=${encodeURIComponent(`Quotation ${quotationNumber}`)}&body=${encodeURIComponent(message)}`;
      setShareMenuOpen(false);
      showToast('PDF downloaded. Attach it in email.');
    } catch (error) {
      if (error?.name !== 'AbortError') {
        console.error(error);
        showToast('Unable to prepare quotation PDF');
      }
    }
  };
  const groupedItems = serviceCategories
    .map((category) => ({
      ...category,
      items: selectedItems.filter((item) => item.categoryId === category.id),
    }))
    .filter((category) => category.items.length);

  useEffect(() => {
    if (path === '/quotation-generator' || path === '/proposal-generator') {
      navigate(stepRoutes[0]);
    }
  }, [path]);

  useEffect(() => {
    const issue = getClientFieldIssue(client);
    if (step > 1 && issue) {
      setClientFieldError(issue);
      setHighestUnlockedStep(1);
      navigate(stepRoutes[0]);
      showToast(issue.message);
      return;
    }

    if (step > 2 && selectedItems.length === 0) {
      setHighestUnlockedStep(2);
      navigate(stepRoutes[1]);
      showToast('Select at least one service first');
      return;
    }

    if (step > highestUnlockedStep) {
      navigate(stepRoutes[highestUnlockedStep - 1]);
      showToast(`Complete Step ${highestUnlockedStep} first`);
    }
  }, [client, highestUnlockedStep, selectedItems.length, step]);

  const goToStep = (nextStep) => {
    const safeStep = Math.max(1, Math.min(nextStep, stepRoutes.length));
    if (safeStep > highestUnlockedStep) {
      showToast(`Complete Step ${highestUnlockedStep} first`);
      return;
    }
    navigate(stepRoutes[safeStep - 1]);
  };

  return (
    <div className="min-h-screen bg-[#050814] text-white">
      <Navbar />
      <main className="relative overflow-hidden px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(14,165,233,0.18),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(45,212,191,0.14),transparent_24%),linear-gradient(180deg,#050814_0%,#08111f_58%,#050814_100%)]" />
        <div className="relative mx-auto max-w-[1880px]">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-black tracking-wide sm:text-4xl">
              BIT BYTE TECHNOLOGY - <span className="text-blue-400">INSTANT</span>{' '}
              <span className="text-teal-300">QUOTATION</span>
            </h1>
          </header>

          <Stepper step={step} goToStep={goToStep} />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="mx-auto max-w-5xl"
            >
              {step === 1 && (
                <GlassPanel>
                  <PanelTitle step="STEP 1" title="Client Details" />
                  <ClientStep
                    client={client}
                    updateClient={updateClient}
                    fieldError={clientFieldError}
                    onContinue={() => completeStep(1)}
                  />
                </GlassPanel>
              )}

              {step === 2 && (
                <GlassPanel>
                  <PanelTitle
                    step="STEP 2"
                    title="Select Services"
                    action={
                      <span className="flex items-center gap-2 text-xs">
                        Include GST
                        <span
                          className={`rounded-full px-3 py-1 font-bold ${
                            billingType === 'with-gst' ? 'bg-emerald-400 text-emerald-950' : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {billingType === 'with-gst' ? 'ON' : 'OFF'}
                        </span>
                      </span>
                    }
                  />
                  <ServicesStep
                    openCategory={openCategory}
                    setOpenCategory={setOpenCategory}
                    selected={selected}
                    toggleService={toggleService}
                    setQty={setQty}
                    totals={totals}
                    billingType={billingType}
                    selectedCount={selectedItems.length}
                    onBack={() => goToStep(1)}
                    onContinue={() => completeStep(2)}
                  />
                </GlassPanel>
              )}

              {step === 3 && (
                <GlassPanel>
                  <PanelTitle step="STEP 3" title="Quotation Summary" />
                  <ReviewStep
                    client={client}
                    billingType={billingType}
                    setBillingType={setBillingType}
                    groupedItems={groupedItems}
                    totals={totals}
                    discount={discount}
                    handleDiscount={handleDiscount}
                    showToast={showToast}
                    mode="review"
                    onBack={() => goToStep(2)}
                    onContinue={() => completeStep(3)}
                  />
                </GlassPanel>
              )}

              {step === 4 && (
                <GlassPanel>
                  <PanelTitle step="STEP 4" title="Download Quotation" />
                  <ReviewStep
                    client={client}
                    billingType={billingType}
                    groupedItems={groupedItems}
                    totals={totals}
                    discount={discount}
                    handleDiscount={handleDiscount}
                    showToast={showToast}
                    status={status}
                    downloadExcel={downloadExcel}
                    shareMenuOpen={shareMenuOpen}
                    setShareMenuOpen={setShareMenuOpen}
                    sharePdfToWhatsApp={sharePdfToWhatsApp}
                    sharePdfToEmail={sharePdfToEmail}
                    mode="download"
                    onBack={() => goToStep(3)}
                  />
                </GlassPanel>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="mt-4">
            <HowItWorks />
          </div>
        </div>
      </main>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-cyan-300/30 bg-slate-950/90 px-5 py-3 text-sm font-bold text-cyan-100 shadow-2xl shadow-cyan-950/50 backdrop-blur"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Stepper({ step, goToStep }) {
  const steps = ['Client Details', 'Select Services', 'Quotation Summary', 'Download'];

  return (
    <div className="mb-6 grid gap-3 lg:grid-cols-4">
      {steps.map((label, index) => {
        const number = index + 1;
        const active = step >= number;
        return (
          <button
            key={label}
            type="button"
            onClick={() => goToStep(number)}
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left backdrop-blur transition hover:bg-white/[0.06]"
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-black shadow-lg transition ${
                active ? 'bg-gradient-to-br from-blue-400 to-green-400 text-slate-950 shadow-blue-500/25' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {number}
            </span>
            <span>
              <span className="block text-sm font-bold text-white">{label}</span>
              <span className="block text-xs text-slate-400">Step {number}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function GlassPanel({ children }) {
  return (
    <section className="rounded-2xl border border-white/15 bg-slate-950/45 p-4 shadow-2xl shadow-black/25 backdrop-blur-xl">
      {children}
    </section>
  );
}

function PanelTitle({ step, title, action }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="rounded-lg bg-gradient-to-r from-blue-400 to-green-400 px-3 py-2 text-sm font-black text-slate-950 shadow-lg shadow-blue-500/20">
          {step}
        </span>
        <h2 className="text-lg font-black">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function BillingPreference({ billingType, setBillingType }) {
  return (
    <div className="mb-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <h3 className="mb-3 text-sm font-black">Billing Preference</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ['with-gst', 'With GST', 'Add 18% GST on the final amount'],
          ['without-gst', 'Without GST', '18% GST is included inside each service line and hidden on bill'],
        ].map(([id, title, description]) => (
          <button
            key={id}
            type="button"
            onClick={() => setBillingType(id)}
            className={`rounded-xl border p-3 text-left transition ${
              billingType === id
                ? 'border-cyan-300 bg-cyan-400/15 shadow-lg shadow-cyan-950/30'
                : 'border-white/10 bg-slate-950/40 hover:border-white/25'
            }`}
          >
            <span className="flex items-center gap-2 text-sm font-black">
              <span className={`flex h-5 w-5 items-center justify-center rounded-full ${billingType === id ? 'bg-green-400 text-slate-950' : 'border border-slate-500'}`}>
                {billingType === id && <Check className="h-3 w-3" />}
              </span>
              {title}
            </span>
            <span className="mt-2 block pl-7 text-xs text-slate-400">{description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
function ClientStep({ client, updateClient, fieldError, onContinue }) {
  const fields = [
    ['companyName', 'Company Name', 'Enter company name', true],
    ['clientName', 'Client Name', 'Enter client / company name', true],
    ['contactPerson', 'Contact Person', 'Enter contact person name', true],
    ['phone', 'Phone Number', 'Enter mobile number', true],
    ['whatsapp', 'Whatsapp Number', 'Enter WhatsApp number', false],
    ['email', 'Email', 'Enter email address', true],
    ['projectName', 'Project Name', 'Enter project or campaign name', true],
    ['quotationNumber', 'Quotation Number', 'e.g. BBT/QT/2026/0001', true],
    ['quotationDate', 'Quotation Date', '', true, 'date'],
    ['validTill', 'Valid Till', '', true, 'date'],
    ['city', 'City', 'Enter city', false],
    ['state', 'State', 'Enter state', false],
    ['country', 'Country', 'Enter country', false],
    ['pincode', 'Pincode', 'Enter pincode', false],
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-4">
        <img src="/showcase-assets/BB-Logo.png" alt="Bit Byte Technologies" className="h-12 w-auto object-contain" />
        <div>
          <p className="text-sm font-black text-green-300">Bit Byte</p>
          <p className="text-xs font-bold uppercase tracking-widest">Technologies</p>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2 text-sm font-black">
        <Building2 className="h-4 w-4 text-cyan-300" />
        Company Details
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map(([key, label, placeholder, required, type]) => (
          <label key={key} className={key === 'companyName' || key === 'projectName' || key === 'quotationNumber' ? 'sm:col-span-2' : ''}>
            <span className="mb-1.5 block text-xs text-slate-300">
              {label} {required && <span className="text-red-400">*</span>}
            </span>
            <input
              type={type || 'text'}
              value={client[key]}
              onChange={(event) => updateClient(key, event.target.value)}
              placeholder={placeholder}
              required={required}
              inputMode={key === 'phone' || key === 'whatsapp' || key === 'pincode' ? 'numeric' : undefined}
              maxLength={key === 'phone' || key === 'whatsapp' ? 10 : key === 'pincode' ? 6 : undefined}
              aria-invalid={fieldError?.key === key}
              className={`${fieldClass} ${fieldError?.key === key ? 'border-red-400 focus:border-red-300 focus:ring-red-400/20' : ''}`}
            />
            {fieldError?.key === key && <span className="mt-1 block text-xs font-bold text-red-300">{fieldError.message}</span>}
          </label>
        ))}
        <label className="sm:col-span-2">
          <span className="mb-1.5 block text-xs text-slate-300">Address</span>
          <input value={client.address} onChange={(event) => updateClient('address', event.target.value)} placeholder="Enter address" className={fieldClass} />
        </label>
        <label className="sm:col-span-2">
          <span className="mb-1.5 block text-xs text-slate-300">Notes</span>
          <textarea value={client.notes} onChange={(event) => updateClient('notes', event.target.value)} placeholder="Enter any additional notes..." className={`${fieldClass} min-h-[74px] resize-none`} />
        </label>
      </div>
      <button
        type="button"
        onClick={onContinue}
        className="mx-auto mt-4 flex w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-400 to-green-400 px-5 py-3 text-sm font-black text-slate-950 shadow-lg shadow-blue-500/20 transition hover:scale-[1.02]"
      >
        Save & Continue
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function ServicesStep({ openCategory, setOpenCategory, selected, toggleService, setQty, totals, billingType, selectedCount, onBack, onContinue }) {
  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-[0.62fr_1fr]">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="mb-3 text-xs font-black text-slate-300">Service Categories</p>
          <div className="space-y-2">
            {serviceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setOpenCategory(category.id)}
                  className={`flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left text-sm font-bold transition ${
                    openCategory === category.id ? colorMap[category.color] : 'border-transparent bg-slate-900/50 text-slate-200 hover:bg-slate-800/70'
                  }`}
                >
                  <span className={`rounded-lg bg-gradient-to-br ${colorMap[category.color].split(' ').slice(0, 2).join(' ')} p-1.5 text-white`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            const isOpen = openCategory === category.id;
            return (
              <div key={category.id} className={`overflow-hidden rounded-xl border ${isOpen ? 'border-cyan-300/50 bg-cyan-400/5' : 'border-white/10 bg-white/[0.04]'}`}>
                <button type="button" onClick={() => setOpenCategory(isOpen ? '' : category.id)} className="flex w-full items-center justify-between px-4 py-3 text-left">
                  <span className="flex items-center gap-3 text-sm font-black">
                    <span className={`rounded-lg bg-gradient-to-br ${colorMap[category.color].split(' ').slice(0, 2).join(' ')} p-1.5 text-white`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    {category.name}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <div className="space-y-1 border-t border-white/10 p-3">
                        {category.services.map(([id, name, price]) => (
                          <div key={id} className="grid grid-cols-[22px_1fr_72px_92px] items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-white/[0.04]">
                            <input type="checkbox" checked={Boolean(selected[id]?.checked)} onChange={() => toggleService(id)} className="h-4 w-4 rounded border-slate-500 bg-slate-950 text-green-400 focus:ring-cyan-300" />
                            <span className="text-slate-200">{name}</span>
                            <input type="number" min="1" value={selected[id]?.qty || 1} onChange={(event) => setQty(id, event.target.value)} className="rounded-lg border border-white/10 bg-slate-950/60 px-2 py-1.5 text-center text-xs outline-none focus:border-cyan-300" />
                            <span className="text-right text-xs text-slate-300">{formatCurrency(billingType === 'without-gst' ? price * GST_MULTIPLIER : price)}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-cyan-300/20 bg-gradient-to-r from-blue-500/25 to-green-400/15 p-4">
        <div className="flex items-center justify-between text-sm font-black">
          <span>{selectedCount} Service Selected</span>
          <span>Total: {formatCurrency(totals.grandTotal)}</span>
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={onBack} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold hover:bg-white/10">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button type="button" onClick={onContinue} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-400 to-green-400 px-4 py-3 text-sm font-black text-slate-950 shadow-lg shadow-blue-500/20 hover:scale-[1.02]">
          Review Quotation
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function ReviewStep({ client, billingType, setBillingType, groupedItems, totals, discount, handleDiscount, showToast, status, downloadExcel, shareMenuOpen, setShareMenuOpen, sharePdfToWhatsApp, sharePdfToEmail, mode = 'download', onBack, onContinue }) {
  const quotationNumber = getQuotationNumber(client.quotationNumber);
  const handleDownloadQuotationPdf = async () => {
    try {
      await downloadQuotationPdf({
        client,
        billingType,
        groupedItems,
        totals,
        discount,
        quotationNumber,
      });
      showToast('Quotation PDF generated');
    } catch (error) {
      console.error(error);
      showToast('Unable to generate quotation PDF');
    }
  };

  return (
    <div>
      {mode === 'review' && <BillingPreference billingType={billingType} setBillingType={setBillingType} />}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <img src="/showcase-assets/BB-Logo.png" alt="Bit Byte Technologies" className="h-12 w-auto" />
            <div>
              <h3 className="text-sm font-black">BIT BYTE TECHNOLOGY</h3>
              <p className="flex items-center gap-2 text-xs text-slate-300"><Phone className="h-3 w-3 text-emerald-300" /> 99651 94331</p>
              <p className="flex items-center gap-2 text-xs text-slate-300"><Mail className="h-3 w-3 text-emerald-300" /> reachus@bitbytetech.org</p>
              <p className="flex items-center gap-2 text-xs text-slate-300"><Globe className="h-3 w-3 text-emerald-300" /> www.bitbytetech.org</p>
            </div>
          </div>
          {mode === 'download' && (
            <div className="flex flex-wrap gap-2">
              <ActionButton icon={FileText} label="Download PDF" onClick={handleDownloadQuotationPdf} />
              <ActionButton icon={FileSpreadsheet} label="Download Excel" onClick={downloadExcel} />
            </div>
          )}
        </div>

        <div className="mb-3 grid gap-2 rounded-xl border border-white/10 bg-slate-950/40 p-3 text-xs sm:grid-cols-2">
          <InfoLine label="Client Name" value={client.clientName || '-'} />
          <InfoLine label="Project / Campaign" value={client.projectName || '-'} />
          <InfoLine label="Contact Person" value={client.contactPerson || '-'} />
          <InfoLine label="Quotation Date" value={client.quotationDate || '-'} />
          <InfoLine label="Contact Number" value={client.phone || '-'} />
          <InfoLine label="Quotation No" value={client.quotationNumber || '-'} />
          <InfoLine label="Email Address" value={client.email || '-'} />
          <InfoLine label="Billing Type" value={billingType === 'with-gst' ? `With GST (${GST_RATE}%)` : 'Without GST'} />
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10">
          <div className="grid grid-cols-[1fr_70px_120px] bg-gradient-to-r from-blue-400 to-green-400 px-3 py-2 text-xs font-black uppercase text-slate-950">
            <span>Selected Services</span>
            <span className="text-center">Qty</span>
            <span className="text-right">Amount</span>
          </div>
          <div className="max-h-[290px] overflow-y-auto">
            {groupedItems.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-slate-400">Select services to preview the quotation.</p>
            ) : (
              groupedItems.map((group) => {
                const Icon = group.icon;
                return (
                  <div key={group.id} className="border-t border-white/10">
                    <div className="flex items-center gap-2 bg-white/[0.03] px-3 py-2 text-sm font-black">
                      <Icon className="h-4 w-4 text-cyan-300" />
                      {group.name}
                    </div>
                    {group.items.map((item) => (
                      <div key={item.id} className="grid grid-cols-[1fr_70px_120px] px-3 py-1.5 text-xs text-slate-300">
                        <span className="pl-5">- {item.name}</span>
                        <span className="text-center">{item.qty}</span>
                        <span className="text-right">{formatCurrency(item.amount)}</span>
                      </div>
                    ))}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
            <h4 className="mb-3 text-sm font-black">Terms & Conditions</h4>
            <ul className="list-disc space-y-1 pl-4 text-xs leading-relaxed text-slate-300">
              <li>Quotation valid until the valid till date.</li>
              <li>50% advance payment required before project initiation.</li>
              <li>Remaining payment before delivery.</li>
              <li>Additional revisions will be charged separately.</li>
              <li>No refund after work starts.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
            <label className="mb-3 block">
              <span className="mb-1 block text-xs text-slate-400">Discount (%) - max {MINIMUM_PROFIT_MARGIN}%</span>
              <input type="number" min="0" max={MINIMUM_PROFIT_MARGIN} value={discount} onChange={(event) => handleDiscount(event.target.value)} className={fieldClass} />
            </label>
            <TotalLine label="Sub Total" value={totals.subtotal} />
            {billingType === 'with-gst' && (
              <TotalLine label={`GST (${GST_RATE}%)`} value={totals.gst} />
            )}
            <TotalLine label={`Discount (${totals.discountPercent}%)`} value={-totals.discountAmount} danger />
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="font-black uppercase text-cyan-300">Grand Total</span>
              <span className="text-2xl font-black text-emerald-300">{formatCurrency(totals.grandTotal)}</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-sm font-black text-cyan-300">
          Thank you for choosing Bit Byte Technology. This instant quotation is prepared for your selected services.
        </p>
      </div>

      {mode === 'review' && (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={onBack} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold hover:bg-white/10">
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </button>
          <button type="button" onClick={onContinue} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-400 to-green-400 px-4 py-3 text-sm font-black text-slate-950 shadow-lg shadow-blue-500/20 hover:scale-[1.02]">
            Continue to Download
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {mode === 'download' && (
        <>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="relative">
              <ActionButton icon={Share2} label={shareMenuOpen ? 'Close Share' : 'Share PDF'} onClick={() => setShareMenuOpen((current) => !current)} dark />
              {shareMenuOpen && (
                <div className="absolute left-0 top-full z-30 mt-2 w-full min-w-56 rounded-xl border border-white/15 bg-slate-950 p-2 shadow-2xl shadow-black/40">
                  <button type="button" onClick={sharePdfToWhatsApp} className="block w-full rounded-lg px-3 py-2 text-left text-xs font-bold text-white hover:bg-white/10">WhatsApp PDF</button>
                  <button type="button" onClick={sharePdfToEmail} className="block w-full rounded-lg px-3 py-2 text-left text-xs font-bold text-white hover:bg-white/10">Email PDF</button>
                </div>
              )}
            </div>

            <button type="button" onClick={onBack} className="flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold hover:bg-white/10 sm:col-span-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Summary
            </button>
          </div>

        </>
      )}
      <PrintableQuotation
        client={client}
        billingType={billingType}
        groupedItems={groupedItems}
        totals={totals}
        discount={discount}
        quotationNumber={quotationNumber}
      />
    </div>
  );
}

function PrintableQuotation({ client, billingType, groupedItems, totals, discount, quotationNumber }) {
  const items = groupedItems.flatMap((group) => group.items.map((item) => ({ ...item, categoryId: group.id })));
  const taxableTotal = items.reduce((sum, item) => sum + item.baseAmount, 0);
  const cgstTotal = billingType === 'with-gst' ? taxableTotal * 0.09 : totals.hiddenGst / 2;
  const sgstTotal = billingType === 'with-gst' ? taxableTotal * 0.09 : totals.hiddenGst / 2;
  const igstTotal = 0;
  const quotationTotal = totals.grandTotal;
  const quotationDate = formatQuotationDate(client.quotationDate);
  const dueDate = formatQuotationDate(client.validTill);
  const generatedOn = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <section className="print-quotation" aria-hidden="true">
      <div className="quotation-page">
        <header className="quotation-header">
          <div className="quotation-brand">
            <img src="/showcase-assets/BB-Logo.png" alt="Bit Byte Technologies" />
            <div>
              <h1>Bit Byte Technologies</h1>
              <p>Corporate Office</p>
              <p>2nd Floor, Raja Complex</p>
              <p>Salem, Tamil Nadu - 636302</p>
              <p>India</p>
              <p><strong>GST NO :</strong> 33BLNPN539J1ZL</p>
              <p><strong>MSME ID :</strong> UDYAM-TN-20-0234773</p>
            </div>
          </div>
          <div className="quotation-title-block">
            <h2>INSTANT QUOTATION</h2>
            <p>Contact No : 9943743136</p>
            <p>Email Id : reachus@bitbytetech.org</p>
            <p>Generated on {generatedOn}</p>
          </div>
        </header>

        <div className="quotation-section-title">CLIENT DETAILS <span>QUOTATION DETAILS</span></div>
        <section className="quotation-info-grid">
          <div>
            <QuotationPrintRow label="Client Billing" value={client.companyName || client.clientName || 'Client'} />
            <QuotationPrintRow label="Email" value={client.email || '-'} />
            <QuotationPrintRow label="Phone" value={client.phone || '-'} />
            <QuotationPrintRow label="Project" value={client.projectName || '-'} />
          </div>
          <div>
            <QuotationPrintRow label="Quotation No" value={quotationNumber} />
            <QuotationPrintRow label="Quotation Date" value={quotationDate} />
            <QuotationPrintRow label="Valid Till" value={dueDate} />
            <QuotationPrintRow label="Type" value="Instant Quotation" />
          </div>
        </section>

        <table className="quotation-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Description</th>
              <th>SAC</th>
              <th>Qty</th>
              <th>Taxable</th>
              <th>CGST</th>
              <th>SGST</th>
              <th>IGST</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan="9" className="quotation-empty">No services selected</td></tr>
            ) : (
              items.map((item, index) => {
                const cgst = item.baseAmount * 0.09;
                const sgst = item.baseAmount * 0.09;
                const lineTotal = billingType === 'with-gst' ? item.baseAmount + cgst + sgst : item.amount;
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{getSacCode(item.categoryId)}</td>
                    <td>{item.qty}</td>
                    <td>{formatQuotationMoney(item.baseAmount).replace('Rs ', '')}</td>
                    <td>{formatQuotationMoney(cgst).replace('Rs ', '')}</td>
                    <td>{formatQuotationMoney(sgst).replace('Rs ', '')}</td>
                    <td>0.00</td>
                    <td>{formatQuotationMoney(lineTotal).replace('Rs ', '')}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <section className="quotation-bottom-grid">
          <div className="quotation-terms">
            <h3>TERMS & CONDITIONS</h3>
            <p>This quotation is valid until the mentioned valid till date.</p>
            <p>Prices are subject to selected services, quantities, GST preference, and approved discount.</p>
            <p>This is a computer-generated quotation.</p>
          </div>
          <div className="quotation-summary">
            <h3>QUOTATION SUMMARY</h3>
            <QuotationPrintRow label="Taxable Amount" value={formatQuotationMoney(taxableTotal)} />
            <QuotationPrintRow label="CGST Total" value={formatQuotationMoney(cgstTotal)} />
            <QuotationPrintRow label="SGST Total" value={formatQuotationMoney(sgstTotal)} />
            <QuotationPrintRow label="IGST Total" value={formatQuotationMoney(igstTotal)} />
            <QuotationPrintRow label={`Discount (${Number(discount) || 0}%)`} value={formatQuotationMoney(totals.discountAmount)} />
            <QuotationPrintRow label="Grand Total" value={formatQuotationMoney(quotationTotal)} strong />
          </div>
        </section>

        <footer className="quotation-footer">
          <div className="quotation-signature">
            <p>For Bit Byte Technologies</p>
            <div>Authorized Signatory</div>
            <h4>AUTHORIZED SIGNATORY</h4>
          </div>
        </footer>

        <p className="quotation-note">Instant quotation generated by Bit Byte Technologies.</p>
      </div>
    </section>
  );
}

function QuotationPrintRow({ label, value, strong }) {
  return (
    <div className={strong ? 'quotation-print-row quotation-print-row-strong' : 'quotation-print-row'}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ActionButton({ icon: Icon, label, onClick, dark }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-black transition ${
        dark ? 'border border-white/15 text-white hover:bg-white/10' : 'bg-gradient-to-r from-blue-400 to-green-400 text-slate-950 shadow-lg shadow-blue-500/20 hover:opacity-90'
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function InfoLine({ label, value }) {
  return (
    <div className="grid grid-cols-[110px_12px_1fr] gap-2">
      <span className="text-slate-300">{label}</span>
      <span>:</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

function TotalLine({ label, value, danger }) {
  return (
    <div className={`flex justify-between border-b border-white/10 py-2 text-sm ${danger ? 'text-red-300' : 'text-slate-200'}`}>
      <span>{label}</span>
      <strong>{formatCurrency(value)}</strong>
    </div>
  );
}

function HowItWorks() {
  const items = [
    [FileText, 'STEP 1', 'Enter Client Details & Choose With / Without GST'],
    [BadgeCheck, 'STEP 2', 'Select Required Services from Categories'],
    [Calculator, 'STEP 3', 'System Calculates Totals, GST / Discount Automatically'],
    [Download, 'STEP 4', 'Download Quotation as PDF or Excel'],
  ];

  return (
    <div className="rounded-2xl border border-white/15 bg-slate-950/45 p-4 backdrop-blur-xl">
      <h3 className="mb-4 text-center text-lg font-black text-cyan-300">HOW IT WORKS</h3>
      <div className="grid gap-4 sm:grid-cols-4">
        {items.map(([Icon, step, text]) => (
          <div key={step} className="text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04]">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-black text-cyan-200">{step}</h4>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
























































