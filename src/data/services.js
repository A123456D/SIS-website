import { Sun, Home, Tv, Camera, Wifi, Zap, Lightbulb, Shield, Volume2 } from 'lucide-react';

export const services = [
  {
    id: 'solar',
    icon: Sun,
    title: 'Renewable Energy',
    subtitle: 'Power When the Grid Fails',
    summary: 'Hybrid solar and lithium backup that keeps essentials online through power outages and grid failure.',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'from-orange-50 to-amber-50',
    image: '/assets/renewable-energy.png',
    description:
      'When the grid blinks, the essentials shouldn’t. We design hybrid solar and lithium systems that keep lights, connectivity, security, and key appliances alive—whether you’re powering a home, a commercial floor, or a rural site that can’t afford downtime.',
    features: [
      { icon: Zap, text: 'Hybrid solar & lithium backup' },
      { icon: Lightbulb, text: 'Priority circuits through outages' },
      { icon: Shield, text: 'Grid-failure resilience' },
    ],
    benefits: [
      'Stay online through power outages',
      'Lower monthly electricity costs',
      'Protect fridges, Wi‑Fi, CCTV & essentials',
      'Scale from backup-only to fuller solar coverage',
    ],
  },
  {
    id: 'automation',
    icon: Home,
    title: 'Home Automation',
    subtitle: 'Intelligent Living Spaces',
    summary: 'Lighting, climate, and security controlled as one smart environment.',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'from-teal-50 to-cyan-50',
    image: '/assets/home-automation.png',
    description:
      'Home automation integrates technology to control lighting, climate, entertainment systems, and appliances through a centralized system. Using sensors, smart devices, and wireless protocols, your home learns your preferences and responds intuitively.',
    features: [
      { icon: Lightbulb, text: 'Smart lighting control' },
      { icon: Zap, text: 'Climate management' },
      { icon: Shield, text: 'Automated security' },
    ],
    benefits: [
      'Control everything from your smartphone',
      'Voice-activated convenience',
      'Energy savings through intelligent scheduling',
      'Enhanced security and peace of mind',
    ],
  },
  {
    id: 'av',
    icon: Tv,
    title: 'Audio-Visual Design & Home Theatre',
    subtitle: 'Immersive Entertainment Spaces',
    summary: 'Media lounges and dedicated home theatres with cinema-grade picture and sound.',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'from-indigo-50 to-purple-50',
    image: '/assets/home-theatre.png',
    description:
      'From living-room upgrades to dedicated home theatres, we design and install complete audio-visual systems tailored to your space. Precision acoustics, 4K/8K displays, Dolby Atmos surround sound, and calibrated lighting turn any room into a true cinematic experience—whether you want a sleek media lounge or a full private cinema.',
    features: [
      { icon: Tv, text: 'Dedicated home theatre design' },
      { icon: Volume2, text: 'Dolby Atmos surround sound' },
      { icon: Lightbulb, text: '4K/8K displays & ambient lighting' },
    ],
    benefits: [
      'Custom home theatre planning & installation',
      'Cinema-quality picture and calibrated sound',
      'Acoustic treatment & seating layouts',
      'Multi-room audio and streaming integration',
    ],
  },
  {
    id: 'cctv',
    icon: Camera,
    title: 'CCTV & Security',
    subtitle: 'Advanced Protection Systems',
    summary: 'HD/4K cameras with remote alerts—and UPS options that survive power outages.',
    color: 'from-slate-600 to-slate-800',
    bgColor: 'from-slate-50 to-slate-100',
    image: '/assets/cctv-security.png',
    description:
      'Modern CCTV should keep watching when the power doesn’t. IP cameras with remote alerts, night vision, and optional UPS so the feed survives an outage—on an estate, a commercial yard, or a farm where every blind spot matters.',
    features: [
      { icon: Camera, text: 'HD/4K IP camera systems' },
      { icon: Shield, text: 'Remote monitoring & alerts' },
      { icon: Zap, text: 'UPS / outage-ready' },
    ],
    benefits: [
      '24/7 remote viewing from your phone',
      'Night vision & motion detection',
      'Cloud & local storage options',
      'Can integrate with home automation & backup power',
    ],
  },
  {
    id: 'agriculture',
    icon: Zap,
    title: 'Hybrid Power Systems',
    subtitle: 'Homes · Business · Rural',
    summary: 'Hybrid power that holds—on the estate, at the warehouse, and past the last streetlight.',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'from-yellow-50 to-orange-50',
    image: '/assets/hybrid-power.png',
    description:
      'Some sites sit far from easy fixes. We design hybrid systems that braid grid, solar, and battery backup—with surge protection and smart energy planning—so farms, commercial sites, and homes stay productive when the grid doesn’t.',
    features: [
      { icon: Zap, text: 'Hybrid high-voltage distribution' },
      { icon: Shield, text: 'Solar & battery backup integration' },
      { icon: Lightbulb, text: 'Surge & overload protection' },
      { icon: Sun, text: 'Outage & grid-failure resilient' },
    ],
    benefits: [
      'Scaled to the load in front of you—not a catalogue kit',
      'Aligned with SA electrical safety practice',
      'Less downtime in outages or peak demand',
      'Works with solar, generators, and smart energy setups',
    ],
  },
  {
    id: 'wifi',
    icon: Wifi,
    title: 'Rural Connectivity',
    subtitle: 'Internet for Remote Areas',
    summary: 'MikroTik-powered networks that bring stable internet to remote properties.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50',
    image: '/assets/rural-connectivity.png',
    description:
      "Living remotely doesn't mean living disconnected. We specialise in bringing reliable, high-speed internet to rural areas using MikroTik routers at the core of our networks—paired with fixed wireless, mesh coverage, and signal boosting tailored to your location.",
    features: [
      { icon: Wifi, text: 'MikroTik router networks' },
      { icon: Zap, text: 'Long-range wireless links' },
      { icon: Shield, text: 'Weatherproof outdoor gear' },
    ],
    benefits: [
      'Stable connectivity built on MikroTik hardware',
      'Whole-property WiFi and mesh coverage',
      'Reliable video conferencing & streaming',
      'Smart device and farm-system connectivity',
    ],
  },
];

export function getServiceById(id) {
  return services.find((s) => s.id === id) ?? null;
}
