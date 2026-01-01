import { Header } from "@/components/hero/header";
import { FooterSection } from "@/components/hero/footer";
import { FAQSection } from "@/components/hero/faq-section";

const FaqPage = () => {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
            <Header />
            <main className="flex-1">
                <FAQSection />
            </main>
            <div className="container mx-auto px-4">
                <FooterSection />
            </div>
        </div>
    )
}

export default FaqPage;