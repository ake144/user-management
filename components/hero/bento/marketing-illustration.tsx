import type React from "react"
import { Image as ImageIcon, Download, Palette, Layout } from "lucide-react"

const MarketingIllustration: React.FC = () => {
    return (
        <div
            className="w-full h-full p-6 flex flex-col items-center justify-center relative overflow-hidden bg-transparent"
            role="img"
            aria-label="Marketing Assets illustration showing creative studio and downloads"
        >
            {/* Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl" />
            </div>

            {/* Asset Grid */}
            <div className="w-full max-w-[320px] grid grid-cols-2 gap-3 relative z-10">
                {/* Main Banner Preview */}
                <div className="col-span-2 bg-card border border-border rounded-xl p-3 shadow-xl overflow-hidden group">
                    <div className="h-24 bg-gradient-to-br from-primary/20 via-purple-500/10 to-background rounded-lg flex items-center justify-center relative">
                        <ImageIcon className="w-8 h-8 text-primary/40" />
                        <div className="absolute bottom-2 right-2 flex gap-1">
                            <div className="w-4 h-4 rounded bg-white/10 backdrop-blur-md flex items-center justify-center">
                                <Download className="w-2 h-2 text-white" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-foreground">Summer_Promo_Banner.png</span>
                        <span className="text-[8px] text-muted-foreground">2.4 MB</span>
                    </div>
                </div>

                {/* Small Asset Previews */}
                <div className="bg-card border border-border rounded-xl p-2 shadow-lg flex items-center gap-2">
                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                        <Palette className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-bold text-foreground">Brand Kit</span>
                        <span className="text-[7px] text-muted-foreground">PDF</span>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-2 shadow-lg flex items-center gap-2">
                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                        <Layout className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-bold text-foreground">Templates</span>
                        <span className="text-[7px] text-muted-foreground">Figma</span>
                    </div>
                </div>
            </div>

            {/* Floating "New" Badge */}
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-[8px] font-bold px-2 py-0.5 rounded-full shadow-lg rotate-12">
                NEW ASSETS
            </div>
        </div>
    )
}

export default MarketingIllustration
