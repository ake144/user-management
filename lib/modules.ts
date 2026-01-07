import {
    BookOpen,
    ShoppingBag,
    Video,
    Store,
    Film,
    Plane,
    Award,
    Rocket,
    Cpu,
    Globe2,
    Globe,
    ShieldCheck,
    TrendingUp,
    Zap,
    ShoppingCart,
    DollarSign,
    PlayCircle,
    Sparkles,
    MapPin,
    Users,
    Target
} from "lucide-react";

export const MODULES: Record<string, {
    title: string;
    description: string;
    icon: any;
    commission: string;
    features: { title: string; desc: string; icon: any }[];
    color: string;
    gradient: string;
    image?: string;
    isActive?: boolean;
    referralLink?: string;
}> = {
    "e-learning": {
        isActive: false,
        title: "E-Learning Suite",
        description: "Empower the next generation of learners. Promote our comprehensive library of tech and business courses.",
        icon: BookOpen,
        commission: "20%",
        features: [
            { title: "Lifetime Access", desc: "Students get forever access to course materials.", icon: Globe },
            { title: "Expert Instructors", desc: "Courses taught by industry leaders.", icon: ShieldCheck },
            { title: "High Conversion", desc: "Optimized landing pages ensure high sales.", icon: TrendingUp }
        ],
        color: "text-blue-500",

        gradient: "from-blue-500/20 via-cyan-500/10 to-transparent"
    },
    "e-commerce": {
        isActive: false,
        title: "E-Commerce Starter",
        description: "The ultimate launchpad for entrepreneurs. Everything needed to start an online store in minutes.",
        icon: ShoppingBag,
        commission: "15%",
        features: [
            { title: "Drag & Drop", desc: "No coding required store builder.", icon: Zap },
            { title: "Global Payments", desc: "Accept payments from anywhere.", icon: Globe },
            { title: "Inventory Sync", desc: "Real-time stock management.", icon: ShieldCheck }
        ],
        color: "text-purple-500",
        gradient: "from-purple-500/20 via-pink-500/10 to-transparent"
    },
    "video-generator": {
        isActive: false,
        title: "AI Video Generator",
        description: "Transform text into cinematic videos. The viral AI tool everyone is talking about.",
        icon: Video,
        commission: "25%",
        features: [
            { title: "4K Export", desc: "Crystal clear ultra-HD video quality.", icon: Video },
            { title: "Multi-Language", desc: "Auto-dubbing in 30+ languages.", icon: Globe },
            { title: "Viral Templates", desc: "Pre-made styles for TikTok & Reels.", icon: TrendingUp }
        ],
        color: "text-orange-500",
        gradient: "from-orange-500/20 via-red-500/10 to-transparent"
    },
    "adulian": {
        title: "Adulian",
        description: "The ultimate e-commerce platform for African entrepreneurs. Build, grow, and scale your online store with ease.",
        icon: Store,
        commission: "18%",
        isActive:true,
        features: [
            { title: "Product Management", desc: "Easy-to-use catalog and inventory system.", icon: ShoppingCart },
            { title: "Payment Processing", desc: "Accept mobile money and international payments.", icon: DollarSign },
            { title: "Store Analytics", desc: "Track sales, visitors, and customer behavior.", icon: TrendingUp }
        ],
        color: "text-orange-600",
        gradient: "from-orange-600/20 via-amber-500/10 to-transparent",
        referralLink:'https://adulian-black.vercel.app'
    },
    "hooraflix": {
        title: "Hooraflix",
        description: "Stream unlimited movies, series, and exclusive content. The Netflix of Africa with local and international hits.",
        icon: Film,
        isActive:true,
        commission: "22%",
        features: [
            { title: "HD Streaming", desc: "High-quality video playback on any device.", icon: PlayCircle },
            { title: "Multi-Device Access", desc: "Watch on TV, mobile, tablet, and desktop.", icon: Globe },
            { title: "Exclusive Content", desc: "Original shows and movies you can't find elsewhere.", icon: Sparkles }
        ],
        image: "/images/hoora.jpg",
        color: "text-red-500",
        gradient: "from-red-500/20 via-pink-500/10 to-transparent",
        referralLink:'https://hooraflix.esperanza.et'
    },
    "visit-ethiopia": {
        title: "Visit Ethiopia",
        description: "Discover the beauty of Ethiopia. Book authentic tours, experiences, and adventures through the cradle of civilization.",
        icon: Plane,
        commission: "15%",
        isActive:false,
        features: [
            { title: "Tour Packages", desc: "Curated trips to historic sites and natural wonders.", icon: MapPin },
            { title: "Local Guides", desc: "Expert guides who know the culture and history.", icon: Users },
            { title: "Cultural Experiences", desc: "Authentic Ethiopian cuisine, music, and traditions.", icon: Globe2 }
        ],
        color: "text-green-600",
        gradient: "from-green-600/20 via-teal-500/10 to-transparent"
    },
    "kefita-skill-academy": {
        title: "Kefita Skill Academy",
        description: "Master in-demand skills with expert-led courses. From coding to design, launch your tech career today.",
        icon: Award,
        commission: "20%",
        isActive:false,
        features: [
            { title: "Skill-Based Courses", desc: "Practical, job-ready training in tech and business.", icon: BookOpen },
            { title: "Certifications", desc: "Earn recognized credentials to boost your resume.", icon: Award },
            { title: "Career Support", desc: "Job placement assistance and portfolio reviews.", icon: Target }
        ],
        color: "text-blue-600",
        gradient: "from-blue-600/20 via-indigo-500/10 to-transparent"
    },
    "solidstart-academy": {
        title: "SolidStart Academy",
        description: "Build a solid foundation for your future. Comprehensive learning programs designed to launch your career.",
        icon: Rocket,
        commission: "20%",
        isActive:false,
        features: [
            { title: "Foundational Courses", desc: "Start from zero and master the fundamentals.", icon: BookOpen },
            { title: "Mentorship Program", desc: "One-on-one guidance from industry professionals.", icon: Users },
            { title: "Project-Based Learning", desc: "Build real projects to showcase your skills.", icon: Zap }
        ],
        color: "text-purple-600",
        gradient: "from-purple-600/20 via-violet-500/10 to-transparent"
    },
    "technova": {
        title: "Technova",
        description: "Cutting-edge technology solutions powered by AI. Automate your business and unlock next-level efficiency.",
        icon: Cpu,
        commission: "25%",
        isActive:false,
        features: [
            { title: "AI-Powered Tools", desc: "Smart automation for your workflows.", icon: Sparkles },
            { title: "Tech Solutions", desc: "Custom software and integrations.", icon: Cpu },
            { title: "24/7 Support", desc: "Expert technical support whenever you need it.", icon: ShieldCheck }
        ],
        color: "text-cyan-500",
        gradient: "from-cyan-500/20 via-blue-400/10 to-transparent"
    },
    "global-pathway-academy": {
        title: "Global Pathway Academy",
        description: "Your gateway to international opportunities. Study abroad programs, language courses, and global certifications.",
        icon: Globe2,
        commission: "20%",
        isActive:false,
        features: [
            { title: "International Programs", desc: "Study abroad and exchange opportunities.", icon: Globe },
            { title: "Language Courses", desc: "Learn English, French, Spanish, and more.", icon: BookOpen },
            { title: "Global Certifications", desc: "Internationally recognized qualifications.", icon: Award }
        ],
        color: "text-indigo-600",
        gradient: "from-indigo-600/20 via-purple-500/10 to-transparent"
    }
};
