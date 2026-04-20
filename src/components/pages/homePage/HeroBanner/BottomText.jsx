export default function BottomText() {
    return (
        <section className="w-full bg-[#1A1A1A] pb-20 pt-10">
            {/* Container aligned with Navbar/Logo padding (px-6 md:px-10) */}
            <div className="px-6 md:px-10 w-full">

                <div className="max-w-4xl">
                    {/* Subtitle: Smaller, wide tracking */}
                    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-[#666666] mb-2 font-medium">
                        Cyberattack Simulation
                    </p>

                    {/* Heading: Using a slight tracking-tight for that premium look */}
                    <h2 className="text-2xl md:text-[32px] font-normal text-white mb-16 tracking-tight leading-tight">
                        Most advanced cyber-attack simulations: <span className="opacity-80">Ethical Den</span>
                    </h2>
                </div>

                {/* The Gradient: This is designed to be a "Light Leak" */}
                <div className="relative w-full h-[100px] flex items-center justify-center pointer-events-none">

                    {/* 1. The Main Wide Glow (The "Aurora" base) */}
                    <div
                        className="absolute w-full h-[40px] blur-[50px] opacity-60"
                        style={{
                            background: 'linear-gradient(90deg, #00D1FF 0%, #00FF94 50%, #B7FF4B 100%)'
                        }}
                    ></div>

                    {/* 2. The Bright Core (The "Light Source") */}
                    <div
                        className="absolute w-[90%] h-[15px] blur-[20px] opacity-90"
                        style={{
                            background: 'linear-gradient(90deg, #00E0FF 0%, #00FFB2 50%, #CCFF80 100%)'
                        }}
                    ></div>

                    {/* 3. High-Intensity Center (Adds the "shimmer" effect) */}
                    <div
                        className="absolute w-[70%] h-[8px] blur-[10px] bg-white/20 rounded-full"
                    ></div>
                </div>
            </div>
        </section>
    );
}