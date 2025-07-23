"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { parseFinancialText } from "@/utils/parser";
import { Upload, FileText } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

export interface ParsedExpense {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  merchant?: string;
}

export interface ParsedStatement {
  accountName: string;
  statementPeriod: string;
  totalIncome: number;
  totalExpenses: number;
  netCashFlow: number;
  expenses: ParsedExpense[];
  categories: {
    [key: string]: {
      total: number;
      count: number;
      percentage: number;
    };
  };
}

interface PDFImportDialogProps {
  onDataParsed: (data: ParsedStatement) => void;
}

export function PDFImportDialog({ onDataParsed }: PDFImportDialogProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsImporting(true);
    setImportProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      const numPages = pdf.numPages;
      let fullText = "";

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" ");
        fullText += pageText + "\n";
        setImportProgress(Math.round((i / numPages) * 100));
      }

      console.log("Extracted Text:", fullText);

      // Here you would call a function to parse the fullText
      // and generate the ParsedStatement object.
      // For now, we'll just log it and close the dialog.

      const parsedData = parseFinancialText(fullText);
      onDataParsed(parsedData);
    } catch (error) {
      console.error("Error parsing PDF:", error);
      // Handle error state in UI
    } finally {
      setIsImporting(false);
      setIsDialogOpen(false);
      setImportProgress(100); // Reset for next time
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find((file) => file.type === "application/pdf");
    if (pdfFile) {
      handleFileUpload(pdfFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      handleFileUpload(file);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700/50 bg-transparent transition-colors"
        >
          <Upload className="w-4 h-4 mr-2" />
          Import Statement
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-gray-700/50 rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            Import Financial Statement
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Upload a PDF of your monthly bank or credit card statement to
            automatically categorize your expenses.
          </DialogDescription>
        </DialogHeader>

        {isImporting ? (
          <div className="space-y-4 py-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Processing your statement...
              </h3>
              <p className="text-gray-400 mb-4">This may take a few moments</p>
            </div>
            <Progress value={importProgress} className="h-2" />
            <p className="text-center text-sm text-gray-400">
              {importProgress}% complete
            </p>
          </div>
        ) : (
          <div
            className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Drop your PDF here
            </h3>
            <p className="text-gray-400 mb-4">or click to browse files</p>
            <p className="text-sm text-gray-500">
              Supports PDF files up to 10MB
            </p>
            <Input
              id="file-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
