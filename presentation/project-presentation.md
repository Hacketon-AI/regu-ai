---
marp: true
theme: default
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.svg')
---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _backgroundColor: #2563eb -->
<!-- _color: white -->

# **ReguAI**

## Incident Response & Compliance Workflow Platform

### Turning Incident Chaos into Structured Compliance

---

# The Problem

🔥 **Production incidents are chaotic and unstructured**

- 📊 Logs scattered across multiple systems
- ❓ Unclear response ownership and accountability
- ⏰ Stakeholders need constant updates
- 📝 Post-mortems happen too late or not at all
- ⚖️ Compliance requirements demand audit trails
- 💼 Teams waste time on manual documentation

---

# Our Solution

✅ **Structured incident workflow from detection to resolution**

- 🤖 Automated report generation with rule-based intelligence
- 📋 Task tracking with ownership and priorities
- 🔍 Complete audit trail for compliance
- 📄 Export-ready post-mortem documentation
- 📊 Real-time dashboard with metrics and insights
- 🔐 Secure authentication and session management

---

# Core Features

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">

<div>

### Incident Management

- Create and track incidents
- Severity classification
- Status workflow tracking
- Impact assessment

### Report Generation

- Risk classification
- Timeline reconstruction
- Response checklist
- Technical action plans

</div>

<div>

### Task Management

- Assign response tasks
- Priority management
- Status tracking
- Due date monitoring

### Compliance & Export

- Complete audit trails
- Markdown export
- Stakeholder summaries
- Post-mortem reports

</div>

</div>

---

# System Architecture

**Modern Full-Stack TypeScript Application**

- **Frontend:** Next.js 16 with App Router + React 19 + TypeScript
- **Backend:** Next.js API Routes with modular service architecture
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Auth.js v5 (NextAuth) with JWT sessions
- **State Management:** TanStack React Query for server state
- **UI Framework:** Tailwind CSS + shadcn/ui components
- **Validation:** Zod schemas for type-safe validation
- **Deployment:** Docker Compose for local development

---

# Technical Stack

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">

<div>

### Core Technologies

- Next.js 16.2.6
- React 19.2.6
- TypeScript 6.0.3
- Tailwind CSS 4.3.0

### Backend

- Prisma 6.19.0
- PostgreSQL
- Zod 4.4.3
- Auth.js 5.0.0-beta.31

</div>

<div>

### Frontend Libraries

- TanStack React Query 5.100.10
- Lucide React (icons)
- shadcn/ui components

### Development

- ESLint 9.39.4
- Docker Compose
- tsx for TypeScript execution

</div>

</div>

---

# Authentication & Security

🔐 **Enterprise-grade security implementation**

- Auth.js v5 integration with credentials provider
- JWT-based session management (stateless)
- Protected routes with middleware (proxy.ts)
- HTTP-only cookies for token storage
- Zod validation for all API inputs
- Raw log sanitization (passwords, tokens, API keys)
- Input length limits to prevent abuse
- Comprehensive audit trail for all actions

---

# Database Schema

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">

<div>

### User

- Identity and authentication
- Role-based information

### Incident

- Core incident data
- Severity & status tracking
- Impact metrics
- Timestamps & resolution

### IncidentAiReport

- Generated report sections
- Risk classification
- Action plans & checklists

</div>

<div>

### IncidentTask

- Response work items
- Owner assignment
- Priority & status
- Due date tracking

### IncidentAuditTrail

- Action logging
- Actor tracking
- Old/new value comparison
- Timestamp records

**All with proper indexes and cascading deletes**

</div>

</div>

---

# API Architecture

**RESTful API with consistent JSON responses**

```json
Success: { "success": true, "message": "...", "data": {...} }
Error: { "success": false, "message": "...", "errors": [...] }
```

### Key Endpoints

- `POST /api/auth/login` - Authentication
- `GET /api/dashboard/summary` - Metrics
- `GET/POST/PATCH/DELETE /api/incidents` - CRUD operations
- `POST /api/incidents/[id]/generate-report` - Report generation
- `GET /api/incidents/[id]/export/markdown` - Export

---

# Automated Report Generation

**Rule-based generation for MVP stability (no external LLM)**

### Generated Sections:

1. **Risk Classification** - Business, technical, compliance risk
2. **Timeline** - Event reconstruction from incident data
3. **Response Checklist** - Category-based action items
4. **Technical Action Plan** - Team-specific tasks
5. **Stakeholder Summary** - Executive-friendly overview
6. **Post-Mortem Report** - Complete audit-ready documentation

✨ **Auto-generation on first access** - no manual trigger needed

---

# Challenges & Solutions

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">

<div>

### Challenge: Self-fetch issues

**Solution:** Direct service calls in Auth.js, no HTTP self-requests

### Challenge: Route protection

**Solution:** proxy.ts middleware with Auth.js wrapper

### Challenge: Report not generated

**Solution:** Auto-generate on first access

### Challenge: Session management

**Solution:** JWT strategy with HTTP-only cookies

</div>

<div>

### Challenge: Type safety

**Solution:** TypeScript + Zod validation

### Challenge: State management

**Solution:** React Query for server state

### Challenge: Export failures

**Solution:** Fallback export without report

### Challenge: Audit compliance

**Solution:** Comprehensive audit trail

</div>

</div>

---

# Key Improvements Implemented

✅ **Auth.js v5 integration** - Modern authentication
✅ **Proxy route protection** - Secure middleware
✅ **Auto-report generation** - Seamless UX
✅ **React Query migration** - Optimized data fetching
✅ **Component refactoring** - Better performance
✅ **Incident list optimization** - Memoization & callbacks
✅ **Export functionality** - Download reports
✅ **Comprehensive documentation** - 15+ detailed docs

---

# Product Demo Flow

### Dashboard View

- Real-time metrics: Total, Active, Critical, Resolved incidents
- Severity breakdown chart
- Category distribution
- Recent incidents list with quick actions

### Incident Management

- Create new incident with form validation
- View incident details with tabs
- Auto-generated reports on first access
- Task assignment and tracking

---

# Product Demo Flow (continued)

### Report Generation

- Risk classification with severity recommendations
- Timeline reconstruction from incident data
- Response checklist with completion tracking
- Technical action plan by team
- Stakeholder summary for executives
- Complete post-mortem report

### Export & Compliance

- Download markdown post-mortem
- Complete audit trail
- All actions tracked with timestamps

---

# Scalability & Future Roadmap

### Current Architecture

- ✅ Stateless JWT sessions - Horizontal scaling ready
- ✅ Modular service architecture - Easy to extend
- ✅ Docker Compose - Consistent environments

### Future Enhancements

- 🚀 Background job queue for report generation
- 🔄 WebSocket for real-time updates
- 🤖 AI-powered report suggestions (LLM integration)
- 🏢 Multi-tenant organization support
- 🔐 Advanced RBAC and permissions
- 📄 PDF export and custom templates
- 📊 Advanced analytics and insights

---

# Demo Script

1. **Login** - Secure authentication with demo credentials
2. **Dashboard** - View metrics and recent incidents
3. **Create Incident** - Report a new production issue
4. **View Details** - Automatic report generation
5. **Task Management** - Assign and track response tasks
6. **Audit Trail** - Complete action history
7. **Export** - Download markdown post-mortem

**All features work seamlessly without manual intervention**

---

# Built with IBM Bob

**IBM Bob assisted with:**

- Architecture planning and design decisions
- Database schema design and optimization
- Backend module structure and organization
- Validation strategy and implementation
- Report generator architecture
- Security review and best practices
- Comprehensive documentation
- Iterative refinement and debugging

**Result:** Production-ready platform in accelerated timeline

---

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _backgroundColor: #2563eb -->
<!-- _color: white -->

# **Thank You**

## ReguAI

### Turning Incident Chaos into Structured Compliance

**Demo Credentials:**
Email: demo@reguai.local
Password: demo-password

---

# Appendix: Technical Details

### File Structure

```
src/
├── app/
│   ├── (auth)/login/          # Authentication pages
│   ├── (dashboard)/           # Protected pages
│   └── api/                   # API routes
├── components/                # React components
├── hooks/                     # Custom React hooks
├── lib/                       # Shared utilities
├── modules/                   # Business logic
│   ├── auth/
│   ├── incidents/
│   ├── reports/
│   └── tasks/
└── types/                     # TypeScript types
```

---

# Appendix: Database Enums

### Severity

`Low` | `Medium` | `High` | `Critical`

### IncidentStatus

`Open` | `Investigating` | `Mitigating` | `Monitoring` | `Resolved` | `Closed`

### TaskStatus

`ToDo` | `InProgress` | `Done` | `Blocked`

### Priority

`Low` | `Medium` | `High` | `Critical`

---

# Appendix: Security Features

### Input Validation

- Zod schemas for all API inputs
- Type-safe validation with TypeScript
- Consistent error responses

### Data Sanitization

- Raw log sanitization (passwords, tokens, API keys)
- Length limits (10,000 characters for logs)
- SQL injection prevention via Prisma

### Authentication

- JWT-based sessions
- HTTP-only cookies
- CSRF protection
- Secure password handling

---

# Appendix: Documentation

**15+ comprehensive documentation files:**

- `architecture.md` - System architecture
- `api-contract.md` - API specifications
- `auth-integration-summary.md` - Auth implementation
- `proxy-route-protection-summary.md` - Route protection
- `report-generation-refactor.md` - Report system
- `security-review.md` - Security analysis
- `demo-script.md` - Demo walkthrough
- And more...

---

# Contact & Resources

### Project Information

- **Name:** ReguAI
- **Type:** Incident Response & Compliance Platform
- **Tech Stack:** Next.js, React, TypeScript, PostgreSQL
- **Authentication:** Auth.js v5
- **Deployment:** Docker Compose

### Demo Access

- **URL:** http://localhost:3000
- **Email:** demo@reguai.local
- **Password:** demo-password

**Built with IBM Bob** 🤖
