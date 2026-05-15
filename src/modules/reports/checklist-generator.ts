import type {
  ChecklistItem,
  ReportTemplate,
} from "@/modules/reports/report.types";

export function generateChecklist(template: ReportTemplate): ChecklistItem[] {
  return template.checklistItems.map((item) => ({
    title: item.title,
    done: false,
    category: item.category,
  }));
}
