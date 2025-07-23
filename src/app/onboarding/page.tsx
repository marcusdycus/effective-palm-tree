"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  MapPin,
  DollarSign,
  Target,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  User,
  PiggyBank,
  Sparkles,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const STEPS = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Location", icon: MapPin },
  { id: 3, title: "Income", icon: DollarSign },
  { id: 4, title: "Goals", icon: Target },
];

const FINANCIAL_GOALS = [
  {
    id: "emergency_fund",
    label: "Build an emergency fund",
    description: "Save 3-6 months of expenses",
  },
  {
    id: "debt_payoff",
    label: "Pay off debt",
    description: "Eliminate credit cards, loans, etc.",
  },
  {
    id: "save_house",
    label: "Save for a house",
    description: "Down payment and closing costs",
  },
  {
    id: "retirement",
    label: "Retirement planning",
    description: "Long-term wealth building",
  },
  {
    id: "vacation",
    label: "Save for vacation",
    description: "Travel and experiences",
  },
  {
    id: "investment",
    label: "Start investing",
    description: "Build wealth through investments",
  },
  {
    id: "education",
    label: "Education fund",
    description: "College or professional development",
  },
  { id: "other", label: "Other financial goal", description: "Custom goal" },
];

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    city: "",
    state: "",
    monthlyIncome: "",
    incomeSource: "",
    currentSavings: "",
    selectedGoals: [] as string[],
    customGoal: "",
    monthlyBudget: "",
  });

  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGoalToggle = (goalId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedGoals: prev.selectedGoals.includes(goalId)
        ? prev.selectedGoals.filter((id) => id !== goalId)
        : [...prev.selectedGoals, goalId],
    }));
  };

  const handleSubmit = async () => {
    // Here you would submit the data to your backend
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("Error getting user:", userError);
      return;
    }
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        name: formData.firstName + " " + formData.lastName,
        age: formData.age,
        city: formData.city,
        state: formData.state,
        monthly_income: formData.monthlyIncome,
        income_source: formData.incomeSource,
        current_savings: formData.currentSavings,
        selected_goals: formData.selectedGoals,
        custom_goal: formData.customGoal,
        monthly_budget: formData.monthlyBudget,
        completed_onboarding: true,
      });
    // Redirect to dashboard after successful submission
    if (profileError) {
      console.error("Error submitting onboarding data:", profileError);
      return;
    }

    window.location.href = "/dashboard";
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.age;
      case 2:
        return formData.city && formData.state;
      case 3:
        return formData.monthlyIncome && formData.incomeSource;
      case 4:
        return formData.selectedGoals.length > 0;
      default:
        return false;
    }
  };

  const currentStepData = STEPS[currentStep - 1];

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold text-white">
                FinTrakr
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Let's set up your profile
            </h1>
            <p className="text-gray-400">
              Help us personalize your financial journey
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                      ${
                        currentStep >= step.id
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-500 text-white"
                          : "border-gray-600 text-gray-400"
                      }
                    `}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`
                        w-16 h-0.5 mx-2 transition-all duration-300
                        ${
                          currentStep > step.id
                            ? "bg-emerald-500"
                            : "bg-gray-600"
                        }
                      `}
                    />
                  )}
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2 bg-gray-800" />
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>
                Step {currentStep} of {STEPS.length}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
          </div>

          {/* Form Card */}
          <Card className="border-gray-700/50 bg-gray-900/60 backdrop-blur-xl shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                {currentStepData.icon && (
                  <currentStepData.icon className="w-6 h-6 text-emerald-400" />
                )}
                {currentStepData.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="firstName"
                        className="text-gray-300 mb-2 block"
                      >
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }))
                        }
                        className="bg-gray-800/50 border-gray-600 text-white focus:border-emerald-500"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="lastName"
                        className="text-gray-300 mb-2 block"
                      >
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                          }))
                        }
                        className="bg-gray-800/50 border-gray-600 text-white focus:border-emerald-500"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="age" className="text-gray-300 mb-2 block">
                      Age
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          age: e.target.value,
                        }))
                      }
                      className="bg-gray-800/50 border-gray-600 text-white focus:border-emerald-500"
                      placeholder="25"
                      min="18"
                      max="100"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Location */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="city" className="text-gray-300 mb-2 block">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                      className="bg-gray-800/50 border-gray-600 text-white focus:border-emerald-500"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-gray-300 mb-2 block">
                      State
                    </Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, state: value }))
                      }
                    >
                      <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white focus:border-emerald-500">
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {US_STATES.map((state) => (
                          <SelectItem
                            key={state}
                            value={state}
                            className="text-white hover:bg-gray-700"
                          >
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 3: Income */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label
                      htmlFor="monthlyIncome"
                      className="text-gray-300 mb-2 block"
                    >
                      Monthly Income (before taxes)
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="monthlyIncome"
                        type="number"
                        value={formData.monthlyIncome}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            monthlyIncome: e.target.value,
                          }))
                        }
                        className="pl-10 bg-gray-800/50 border-gray-600 text-white focus:border-emerald-500"
                        placeholder="5000"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="incomeSource"
                      className="text-gray-300 mb-2 block"
                    >
                      Primary Income Source
                    </Label>
                    <Select
                      value={formData.incomeSource}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          incomeSource: value,
                        }))
                      }
                    >
                      <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white focus:border-emerald-500">
                        <SelectValue placeholder="Select income source" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem
                          value="salary"
                          className="text-white hover:bg-gray-700"
                        >
                          Full-time Salary
                        </SelectItem>
                        <SelectItem
                          value="hourly"
                          className="text-white hover:bg-gray-700"
                        >
                          Hourly Wages
                        </SelectItem>
                        <SelectItem
                          value="freelance"
                          className="text-white hover:bg-gray-700"
                        >
                          Freelance/Contract
                        </SelectItem>
                        <SelectItem
                          value="business"
                          className="text-white hover:bg-gray-700"
                        >
                          Business Owner
                        </SelectItem>
                        <SelectItem
                          value="retirement"
                          className="text-white hover:bg-gray-700"
                        >
                          Retirement/Pension
                        </SelectItem>
                        <SelectItem
                          value="other"
                          className="text-white hover:bg-gray-700"
                        >
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="currentSavings"
                      className="text-gray-300 mb-2 block"
                    >
                      Current Savings (optional)
                    </Label>
                    <div className="relative">
                      <PiggyBank className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="currentSavings"
                        type="number"
                        value={formData.currentSavings}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            currentSavings: e.target.value,
                          }))
                        }
                        className="pl-10 bg-gray-800/50 border-gray-600 text-white focus:border-emerald-500"
                        placeholder="10000"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      This helps us provide better recommendations
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Goals */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-gray-300 mb-4 block">
                      What are your financial goals? (Select all that apply)
                    </Label>
                    <div className="grid gap-3">
                      {FINANCIAL_GOALS.map((goal) => (
                        <div
                          key={goal.id}
                          className={`
                            flex items-start space-x-3 p-4 rounded-lg border transition-all duration-200 cursor-pointer
                            ${
                              formData.selectedGoals.includes(goal.id)
                                ? "border-emerald-500 bg-emerald-500/10"
                                : "border-gray-600 bg-gray-800/30 hover:bg-gray-800/50"
                            }
                          `}
                          onClick={() => handleGoalToggle(goal.id)}
                        >
                          <Checkbox
                            checked={formData.selectedGoals.includes(goal.id)}
                            onChange={() => handleGoalToggle(goal.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <h4 className="text-white font-medium">
                              {goal.label}
                            </h4>
                            <p className="text-sm text-gray-400">
                              {goal.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {formData.selectedGoals.includes("other") && (
                    <div>
                      <Label
                        htmlFor="customGoal"
                        className="text-gray-300 mb-2 block"
                      >
                        Describe your custom goal
                      </Label>
                      <Textarea
                        id="customGoal"
                        value={formData.customGoal}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            customGoal: e.target.value,
                          }))
                        }
                        className="bg-gray-800/50 border-gray-600 text-white focus:border-emerald-500"
                        placeholder="Tell us about your specific financial goal..."
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700/50 disabled:opacity-50 bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep === STEPS.length ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!isStepValid()}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Complete Setup
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Skip Option */}
          <div className="text-center mt-6">
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Skip for now - I'll complete this later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
