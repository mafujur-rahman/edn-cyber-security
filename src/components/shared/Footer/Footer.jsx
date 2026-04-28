import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="relative w-full h-[600px] bg-[#303030] overflow-hidden">
            {/* Logo container with flex and padding */}
            <div className="flex items-start px-6 md:px-10 pt-6 md:pt-10">
                {/* The Graphic Icon Part */}
                <div className="w-56 h-56">
                    <Image
                        src="/images/home/logo/footer-logo.png"
                        alt="Logo Icon"
                        width={192}
                        height={192}
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Decorative vertical divider line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-[2px] h-full bg-[#1A1A1A]"></div>
        </footer>
    );
};

export default Footer;