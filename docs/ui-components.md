# ReguAI UI Components Documentation

## Overview

This document describes the enterprise dashboard UI components built for ReguAI using Next.js, Tailwind CSS, and shadcn/ui.

## Technology Stack

- **Framework**: Next.js 16.2.6 with App Router
- **Styling**: Tailwind CSS 4.3.0
- **UI Library**: shadcn/ui (custom implementation)
- **Icons**: Lucide React
- **Language**: TypeScript

## Component Structure

### Core UI Components (`src/components/ui/`)

Base components following shadcn/ui patterns:

- **Button**: Versatile button with multiple variants (default, destructive, outline, secondary, ghost, link)
- **Card**: Container component with header, content, and footer sections
- **Badge**: Status indicators with color variants
- **Input**: Styled text input field
- **Textarea**: Multi-line text input
- **Label**: Form label component
- **Select**: Dropdown select component
- **Tabs**: Tab navigation with content panels

### Dashboard Components (`src/components/dashboard/`)

#### DashboardLayout

Main layout wrapper with header navigation and content area.

**Features**:

- Sticky header with logo and navigation
- Responsive design
- Navigation links for Dashboard, Incidents, Reports, and Settings

**Usage**:

```tsx
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

<DashboardLayout>{/* Your content */}</DashboardLayout>;
```

#### DashboardCards

Statistics cards displaying key metrics.

**Props**:

- `stats`: Object containing totalIncidents, activeIncidents, resolvedIncidents, avgResolutionTime

**Features**:

- 4 metric cards with icons
- Color-coded indicators
- Responsive grid layout

### Incident Components (`src/components/incidents/`)

#### IncidentList

Displays a list of incidents with filtering and actions.

**Props**:

- `incidents`: Array of incident objects
- `onViewIncident`: Callback function when viewing an incident

**Features**:

- Severity badges (Critical, High, Medium, Low)
- Status indicators with icons
- Affected systems display
- View button for each incident
- Empty state handling

#### IncidentForm

Form for creating new incidents.

**Props**:

- `onSubmit`: Callback function with form data
- `onCancel`: Optional cancel callback

**Features**:

- Title and description fields
- Severity selection (Low, Medium, High, Critical)
- Category selection (Security, Performance, Data Breach, Service Outage, Compliance, Other)
- Affected systems input (comma-separated)
- Form validation

#### IncidentDetailTabs

Tabbed interface for viewing incident details.

**Props**:

- `incident`: Incident detail object
- `checklist`: React node for checklist tab
- `actionPlan`: React node for action plan tab
- `stakeholderSummary`: React node for stakeholders tab
- `postMortem`: React node for post-mortem tab

**Features**:

- Overview tab with incident metadata
- Tabbed navigation for different sections
- Severity and status badges
- Affected systems display
- Timestamps for creation and updates

### Report Components (`src/components/reports/`)

#### Checklist

Response checklist with task tracking.

**Props**:

- `items`: Array of checklist items
- `title`: Optional custom title

**Features**:

- Progress bar showing completion percentage
- Status indicators (Pending, In Progress, Completed)
- Assignee and due date display
- Visual completion states

#### ActionPlan

Prioritized action items for incident response.

**Props**:

- `actions`: Array of action items
- `title`: Optional custom title

**Features**:

- Grouped by priority (High, Medium, Low)
- Owner and timeline information
- Status badges
- Priority icons and colors

#### StakeholderSummary

List of stakeholders with contact information.

**Props**:

- `stakeholders`: Array of stakeholder objects
- `title`: Optional custom title

**Features**:

- Contact information (email, phone)
- Department display
- Notification status tracking
- Clickable email and phone links

#### PostMortemPreview

Preview of post-mortem report with sections.

**Props**:

- `data`: Post-mortem data object
- `onDownload`: Optional download callback
- `title`: Optional custom title

**Features**:

- Structured sections with numbering
- Metadata display (severity, duration, impacted users)
- Download button
- Generated timestamp
- Empty state for unavailable reports

## Color Scheme

The UI uses a professional color palette:

- **Primary**: Blue (#3B82F6) - Main actions and highlights
- **Success**: Green - Completed/resolved states
- **Warning**: Orange - In-progress/medium priority
- **Danger**: Red - Critical/high priority issues
- **Neutral**: Gray scale - Text and backgrounds

## Responsive Design

All components are built with mobile-first responsive design:

- **Mobile**: Single column layout
- **Tablet**: 2-column grid for cards
- **Desktop**: 4-column grid for cards, optimized spacing

## Usage Example

```tsx
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardCards } from "@/components/dashboard/dashboard-cards";
import { IncidentList } from "@/components/incidents/incident-list";

export default function DashboardPage() {
  const stats = {
    totalIncidents: 24,
    activeIncidents: 3,
    resolvedIncidents: 21,
    avgResolutionTime: "4.2h",
  };

  const incidents = [
    {
      id: "1",
      title: "API Gateway Timeout",
      severity: "HIGH",
      status: "IN_PROGRESS",
      createdAt: new Date().toISOString(),
      affectedSystems: ["API Gateway"],
    },
  ];

  return (
    <DashboardLayout>
      <DashboardCards stats={stats} />
      <IncidentList incidents={incidents} />
    </DashboardLayout>
  );
}
```

## Customization

### Tailwind Configuration

The theme can be customized in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: "hsl(var(--primary))",
      // Add custom colors
    },
  },
}
```

### CSS Variables

Global styles are defined in `src/app/globals.css` using CSS variables for easy theming.

## Development

To run the development server:

```bash
npm run dev
```

The dashboard will be available at `http://localhost:3000`.

## Future Enhancements

- Dark mode support
- Real-time updates via WebSocket
- Advanced filtering and search
- Export functionality for reports
- Notification system
- User authentication and authorization
- Role-based access control
