"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface IncidentFormData {
  title: string;
  description: string;
  severity: string;
  category: string;
  affectedSystems: string;
}

interface IncidentFormProps {
  onSubmit?: (data: IncidentFormData) => void;
  onCancel?: () => void;
}

export function IncidentForm({ onSubmit, onCancel }: IncidentFormProps) {
  const [formData, setFormData] = useState<IncidentFormData>({
    title: "",
    description: "",
    severity: "MEDIUM",
    category: "SECURITY",
    affectedSystems: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create New Incident
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Incident Title *</Label>
            <Input
              id="title"
              name="title"
              placeholder="Brief description of the incident"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Detailed description of what happened..."
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="severity">Severity *</Label>
              <Select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                required
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="SECURITY">Security</option>
                <option value="PERFORMANCE">Performance</option>
                <option value="DATA_BREACH">Data Breach</option>
                <option value="SERVICE_OUTAGE">Service Outage</option>
                <option value="COMPLIANCE">Compliance</option>
                <option value="OTHER">Other</option>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="affectedSystems">Affected Systems</Label>
            <Input
              id="affectedSystems"
              name="affectedSystems"
              placeholder="e.g., API Gateway, Database, Payment Service (comma-separated)"
              value={formData.affectedSystems}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500">
              Enter system names separated by commas
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit">Create Incident</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// Made with Bob
