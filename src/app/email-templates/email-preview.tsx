"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Eye, Code, Download } from "lucide-react";

export default function EmailPreview() {
  const handlePreview = () => {
    // Open email template in new window for preview
    const emailContent =
      document.getElementById("email-template")?.innerHTML || "";
    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Email Preview</title>
          <style>
            body { margin: 0; padding: 20px; background: #f3f4f6; }
          </style>
        </head>
        <body>
          ${emailContent}
        </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  const handleDownload = () => {
    const emailContent =
      document.getElementById("email-template")?.innerHTML || "";
    const blob = new Blob([emailContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "signup-confirmation-email.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Email Template Preview
          </h1>
          <p className="text-gray-600">
            FinTrakr signup confirmation email template
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handlePreview}
                  className="w-full bg-transparent"
                  variant="outline"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Email
                </Button>
                <Button
                  onClick={handleDownload}
                  className="w-full bg-transparent"
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download HTML
                </Button>
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-2">Template Variables:</p>
                  <ul className="space-y-1 text-xs">
                    <li>
                      <code>{"{{ .ConfirmationURL }}"}</code>
                    </li>
                    <li>
                      <code>{"{{ .Email }}"}</code>
                    </li>
                    <li>
                      <code>{"{{ .SiteURL }}"}</code>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Email Preview */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Email Template
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-white max-h-96 overflow-y-auto">
                  <div id="email-template" className="text-sm">
                    <div
                      style={{
                        backgroundColor: "#0f172a",
                        padding: "40px 20px",
                        fontFamily: "Arial, sans-serif",
                      }}
                    >
                      <div
                        style={{
                          maxWidth: "600px",
                          margin: "0 auto",
                          background:
                            "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)",
                          borderRadius: "24px",
                          border: "1px solid #1f2937",
                        }}
                      >
                        {/* Simplified preview version */}
                        <div
                          style={{ padding: "48px 40px", textAlign: "center" }}
                        >
                          <div
                            style={{
                              width: "64px",
                              height: "64px",
                              background:
                                "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
                              borderRadius: "16px",
                              margin: "0 auto 24px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span style={{ color: "white", fontSize: "24px" }}>
                              📈
                            </span>
                          </div>
                          <h1
                            style={{
                              color: "white",
                              fontSize: "28px",
                              margin: "0 0 32px 0",
                            }}
                          >
                            FinTrakr
                          </h1>
                          <div
                            style={{
                              width: "80px",
                              height: "80px",
                              background:
                                "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
                              borderRadius: "50%",
                              margin: "0 auto 32px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span style={{ color: "white", fontSize: "32px" }}>
                              ✉️
                            </span>
                          </div>
                          <h2
                            style={{
                              color: "white",
                              fontSize: "32px",
                              margin: "0 0 16px 0",
                            }}
                          >
                            Welcome to FinTrakr!
                          </h2>
                          <p
                            style={{
                              color: "#d1d5db",
                              fontSize: "18px",
                              margin: "0 0 32px 0",
                            }}
                          >
                            You're just one step away from tracking your
                            financial future
                          </p>
                          <div
                            style={{
                              background:
                                "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
                              borderRadius: "12px",
                              display: "inline-block",
                              padding: "16px 32px",
                              margin: "0 0 32px 0",
                            }}
                          >
                            <span
                              style={{
                                color: "white",
                                fontSize: "16px",
                                fontWeight: "600",
                              }}
                            >
                              Confirm Your Account →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  This is a simplified preview. Click "Preview Email" to see the
                  full template.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
