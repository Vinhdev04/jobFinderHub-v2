// src/components/features/Hero/HeroSection.jsx

import React from 'react';
import { Building2 } from 'lucide-react';
import Button from '@components/common/Button/Button';
import HERO_DATA from '@data/heroData.js';
import { FEATURES } from '@data/featuresData.js';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <section className='hero-section'>
            <div className='hero-bg-pattern'></div>

            <div className='container'>
                <div className='hero-content'>
                    {/* Icon */}
                    <div className='hero-icon animate-bounce-slow'>
                        <Building2 className='icon' />
                    </div>

                    {/* Title */}
                    <h1 className='hero-title animate-fadeInUp'>
                        {HERO_DATA.title}
                    </h1>

                    {/* Subtitle */}
                    <h2
                        className='hero-subtitle animate-fadeInUp'
                        style={{ animationDelay: '0.1s' }}
                    >
                        {HERO_DATA.subtitle}
                    </h2>

                    {/* Description */}
                    <p
                        className='hero-description animate-fadeInUp'
                        style={{ animationDelay: '0.2s' }}
                    >
                        {HERO_DATA.description}
                    </p>

                    {/* Buttons */}
                    <div
                        className='hero-buttons animate-fadeInUp'
                        style={{ animationDelay: '0.3s' }}
                    >
                        {HERO_DATA.buttons.map((btn, idx) => {
                            const Icon = btn.icon;
                            return (
                                <Button
                                    key={idx}
                                    variant={
                                        btn.primary ? 'primary' : 'secondary'
                                    }
                                    size='lg'
                                    icon={Icon}
                                    iconPosition='left'
                                >
                                    {btn.text}
                                </Button>
                            );
                        })}
                    </div>
                </div>

                {/* Features Grid */}
                <div className='hero-features'>
                    {FEATURES.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={idx}
                                className='feature-card animate-fadeInUp'
                                style={{
                                    animationDelay: `${0.4 + idx * 0.1}s`
                                }}
                            >
                                <div className='feature-icon'>
                                    <Icon className='icon' />
                                </div>
                                <h3 className='feature-title'>
                                    {feature.title}
                                </h3>
                                <p className='feature-description'>
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
