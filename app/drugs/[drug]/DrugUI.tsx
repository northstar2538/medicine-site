"use client";

import { useState } from "react";
import {
  InformationCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";

type CardColor = "blue" | "green" | "yellow" | "red";

type CardProps = {
  title: string;
  children: React.ReactNode;
  color: CardColor;
  icon: React.ReactNode;
};

type DrugUIProps = {
  drugData: {
    name: string;
    uses: string;
    dosage: string;
    sideEffects: string;
    warnings: string;
    aiSummary?: string;
  };
};

export default function DrugUI({ drugData }: DrugUIProps) {
  const [showWarnings, setShowWarnings] = useState(false);
  const [showMoreUses, setShowMoreUses] = useState(false);
  const [showMoreDosage, setShowMoreDosage] = useState(false);
  const [showMoreSideEffects, setShowMoreSideEffects] = useState(false);

  const truncate = (text: string, limit = 200) =>
    text.length > limit ? text.slice(0, limit) + "..." : text;

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 py-8">
      {/* Drug Name */}
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
        {drugData.name}
      </h1>

      {/* AI Summary */}
      {drugData.aiSummary && (
        <div className="p-4 border-l-4 border-blue-200 bg-blue-50 rounded shadow-sm">
          <p className="text-gray-800">{drugData.aiSummary}</p>
        </div>
      )}

      {/* Uses */}
      <Card
        color="green"
        icon={<InformationCircleIcon className="h-6 w-6 text-green-600 mr-2" />}
        title="Uses"
      >
        <p>
          {showMoreUses ? drugData.uses : truncate(drugData.uses)}
          {drugData.uses.length > 200 && (
            <button
              onClick={() => setShowMoreUses(!showMoreUses)}
              className="ml-2 text-blue-600 underline"
            >
              {showMoreUses ? "Show Less" : "Show More"}
            </button>
          )}
        </p>
      </Card>

      {/* Dosage */}
      <Card
        color="yellow"
        icon={<ClockIcon className="h-6 w-6 text-yellow-600 mr-2" />}
        title="Dosage"
      >
        <p>
          {showMoreDosage ? drugData.dosage : truncate(drugData.dosage)}
          {drugData.dosage.length > 200 && (
            <button
              onClick={() => setShowMoreDosage(!showMoreDosage)}
              className="ml-2 text-blue-600 underline"
            >
              {showMoreDosage ? "Show Less" : "Show More"}
            </button>
          )}
        </p>
      </Card>

      {/* Side Effects */}
      <Card
        color="red"
        icon={<ExclamationTriangleIcon className="h-6 w-6 text-red-600 mr-2" />}
        title="Side Effects"
      >
        <p>
          {showMoreSideEffects ? drugData.sideEffects : truncate(drugData.sideEffects)}
          {drugData.sideEffects.length > 200 && (
            <button
              onClick={() => setShowMoreSideEffects(!showMoreSideEffects)}
              className="ml-2 text-blue-600 underline"
            >
              {showMoreSideEffects ? "Show Less" : "Show More"}
            </button>
          )}
        </p>
      </Card>

      {/* Warnings (collapsible) */}
      <div
        className="p-4 border rounded shadow-sm bg-white hover:shadow-lg transition cursor-pointer"
        onClick={() => setShowWarnings(!showWarnings)}
        aria-expanded={showWarnings}
      >
        <div className="flex justify-between items-center font-semibold text-gray-800">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600 mr-2" />
            Warnings
          </div>
          <span>{showWarnings ? "▲" : "▼"}</span>
        </div>
        {showWarnings && <p className="mt-2 text-gray-700">{drugData.warnings}</p>}
      </div>
    </div>
  );
}

// === Card Component ===
function Card({ title, children, color, icon }: CardProps) {
  const colors: Record<CardColor, string> = {
    blue: "border-blue-200 bg-blue-50",
    green: "border-green-200 bg-green-50",
    yellow: "border-yellow-200 bg-yellow-50",
    red: "border-red-200 bg-red-50",
  };

  return (
    <section className={`p-4 border-l-4 rounded shadow-sm ${colors[color]}`}>
      <div className="flex items-center mb-2">
        {icon}
        <h2 className="font-semibold text-lg">{title}</h2>
      </div>
      <div className="text-gray-800">{children}</div>
    </section>
  );
} 