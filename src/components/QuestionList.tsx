import React, { useState } from "react";
import { Question } from "../types";
import {
  ChevronDown,
  ChevronUp,
  Download,
  Copy,
  CheckCircle,
} from "lucide-react";

interface QuestionListProps {
  questions: Question[];
  jobTitle?: string;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, jobTitle }) => {
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedQuestions.includes(id)) {
      setExpandedQuestions(expandedQuestions.filter((qId) => qId !== id));
    } else {
      setExpandedQuestions([...expandedQuestions, id]);
    }
  };

  const handleCopyQuestion = (question: Question) => {
    const text = `Question: ${question.text}\n\nEvaluation Criteria:\n- Correct Answer: ${question.evaluationCriteria.correct}\n- Partial Answer: ${question.evaluationCriteria.partial}\n- Incorrect Answer: ${question.evaluationCriteria.incorrect}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(question.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const exportQuestions = () => {
    const exportData = {
      title: jobTitle || "Technical Interview Questions",
      date: new Date().toISOString(),
      questions: questions.map((q) => ({
        ...q,
        isExpanded: expandedQuestions.includes(q.id),
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${jobTitle || "interview-questions"}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Generated Questions</h2>
        <button
          className="btn btn-outline flex items-center"
          onClick={exportQuestions}
        >
          <Download size={18} className="mr-2" />
          Export Questions
        </button>
      </div>

      <div className="space-y-4">
        {questions &&
          questions?.length > 0 &&
          questions?.map((question: any, index: number) => {
            const isExpanded = expandedQuestions.includes(question.id);
            const isCopied = copiedId === question.id;

            console.log("%c Line:71 🍒 question", "color:#fca650", question);
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-md"
              >
                <div
                  className="flex justify-between items-center p-4 cursor-pointer bg-white"
                  onClick={() => toggleExpand(question?.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 font-medium mr-2">
                      Q{index + 1}.
                    </span>
                    {/* <h3 className="font-medium truncate m-0">{question?.text}</h3> */}
                    <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full flex items-center text-sm">
                     Question for {question?.category}
                    </div>
                  </div>
                  <div className="flex items-center ml-4">
                    {/* <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-800 mr-2">
                      {question?.category}
                    </span> */}
                    <span
                      className={`text-xs px-2 py-1 rounded-full mr-3 ${
                        question?.difficulty === "Basic"
                          ? "bg-green-100 text-green-800"
                          : question?.difficulty === "Intermediate"
                          ? "bg-blue-100 text-blue-800"
                          : question?.difficulty === "Advanced"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {question?.difficulty}
                    </span>
                    {isExpanded ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 border-t border-gray-200 bg-gray-50 animate-fade-in">
                    <h3 className="font-medium m-0">Q. {question?.text}</h3>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Evaluation Criteria
                      </h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <span className="block text-xs font-medium text-green-800 mb-1">
                            Correct Answer
                          </span>
                          <p className="text-sm text-gray-800">
                            {question?.evaluationCriteria?.correct}
                          </p>
                        </div>
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <span className="block text-xs font-medium text-yellow-800 mb-1">
                            Partial Answer
                          </span>
                          <p className="text-sm text-gray-800">
                            {question?.evaluationCriteria?.partial}
                          </p>
                        </div>
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <span className="block text-xs font-medium text-red-800 mb-1">
                            Incorrect Answer
                          </span>
                          <p className="text-sm text-gray-800">
                            {question?.evaluationCriteria?.incorrect}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <button
                        className="btn btn-outline py-2 px-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyQuestion(question);
                        }}
                      >
                        {isCopied ? (
                          <>
                            <CheckCircle
                              size={16}
                              className="mr-2 text-green-600"
                            />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy size={16} className="mr-2" />
                            Copy Question
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default QuestionList;
