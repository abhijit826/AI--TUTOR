
import { Resource } from "@/types/resources";
import { Video, FileText, BookOpen } from "lucide-react";

export const resources: Resource[] = [
  {
    id: "1",
    title: "Algebra Fundamentals",
    type: "Video Course",
    description: "Master the basics of algebra with our comprehensive video series",
    icon: <Video className="w-6 h-6" />,
    link: "#",
    difficulty: "Beginner",
    duration: "2.5 hours",
    tags: ["algebra", "basics", "equations"],
    views: 1234
  },
  {
    id: "2",
    title: "Geometry Handbook",
    type: "PDF Guide",
    description: "Complete guide to geometric concepts and problem-solving techniques",
    icon: <FileText className="w-6 h-6" />,
    link: "#",
    difficulty: "Intermediate",
    tags: ["geometry", "shapes", "formulas"],
    downloads: 567
  },
  {
    id: "3",
    title: "Calculus Practice Problems",
    type: "Interactive",
    description: "Collection of calculus problems with step-by-step solutions",
    icon: <BookOpen className="w-6 h-6" />,
    link: "#",
    difficulty: "Advanced",
    tags: ["calculus", "practice", "derivatives"],
    views: 890
  }
];
