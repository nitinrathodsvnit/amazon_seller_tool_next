import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, Clock, LineChart } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">AmazonFeeCalc</h1>
          <Button variant="outline">Sign Up</Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Calculate Amazon Seller Fees in Seconds
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Save time and maximize profits with our lightning-fast fee calculator and profit visualization tool
          </p>
          <Button size="lg" className="font-semibold">
            Try It Now <ArrowRight className="ml-2" />
          </Button>
        </section>

        {/* <section className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<Calculator className="w-12 h-12 text-primary" />}
            title="Instant Fee Calculation"
            description="Get referral, closing, and shipping fees calculated in under 10 seconds"
          />
          <FeatureCard
            icon={<Clock className="w-12 h-12 text-primary" />}
            title="Save Time"
            description="Reduce calculation time from 5 minutes to just seconds"
          />
          <FeatureCard
            icon={<LineChart className="w-12 h-12 text-primary" />}
            title="Profit Visualization"
            description="See how price affects profit with our interactive graph"
          />
        </section> */}

        <section className="text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Ready to optimize your Amazon selling strategy?
          </h3>
          <Button size="lg" variant="secondary" className="font-semibold">
            Get Started for Free
          </Button>
        </section>
      </main>

      <footer className="bg-gray-100 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © 2024 AmazonFeeCalc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// function FeatureCard({ icon, title, description }) {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md text-center">
//       <div className="mb-4">{icon}</div>
//       <h3 className="text-xl font-semibold mb-2">{title}</h3>
//       <p className="text-gray-600">{description}</p>
//     </div>
//   );
// }