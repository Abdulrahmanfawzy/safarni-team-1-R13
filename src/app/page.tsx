

import Navbar from '@/components/ui/Navbar'
import Categories from '@/features/home/components/Categories'
import HeroSection from "@/features/home/components/HeroSection"
import RecommendationSection from '@/features/home/components/RecommendationSection'
import React from 'react'

export default function page() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Categories />
      <RecommendationSection />
    </div>
  )
}
