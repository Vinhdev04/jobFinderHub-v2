// src/pages/AboutPage.jsx
import HeroSection from '@features/About/components/HeroSection';
import FeatureCards from '@features/About/components/FeatureCards';
import RoleCards from '@features/About/components/RoleCards';
import WorkflowSection from '@features/About/components/WorkflowSection';
import BenefitsSection from '@features/About/components/BenefitsSection';
import CTASection from '@features/About/components/CTASection';

export default function AboutPage() {
    return (
        <>
            <HeroSection />
            <RoleCards />
            <FeatureCards />
            <WorkflowSection />
            <BenefitsSection />
            <CTASection />
        </>
    );
}
