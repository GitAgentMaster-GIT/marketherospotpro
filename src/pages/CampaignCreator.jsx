import { useState } from 'react';
import { Sparkles, Target, DollarSign, Users, Check } from 'lucide-react';

function CampaignCreator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    product: '',
    niche: '',
    budget: '',
    targetAudience: '',
    goals: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCampaign, setGeneratedCampaign] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedCampaign({
        name: `${formData.product} - ${formData.niche} Campaign`,
        adCopy: {
          headline: `Transform Your Life with ${formData.product}`,
          body: `Discover why thousands in the ${formData.niche} industry trust our solution. Limited time offer - Get started today!`,
          cta: 'Get Started Now'
        },
        targeting: {
          demographics: 'Adults 25-54, interested in ' + formData.niche,
          platforms: ['Facebook', 'Google Ads', 'LinkedIn'],
          budget: formData.budget
        },
        strategy: [
          'Launch awareness campaign on Facebook',
          'Retarget engaged users with conversion ads',
          'Implement email nurture sequence',
          'A/B test ad creatives weekly'
        ]
      });
      setIsGenerating(false);
      setStep(3);
    }, 3000);
  };

  const handleDeploy = () => {
    alert('Campaign deployed successfully! (In production, this would deploy to actual ad platforms)');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Campaign Creator</h1>
        <p className="text-gray-600">Let AI create a high-converting marketing campaign for your business</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {['Input Details', 'Generate Campaign', 'Review & Deploy'].map((label, idx) => (
          <div key={idx} className="flex items-center flex-1">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step > idx + 1 ? 'bg-green-500' : step === idx + 1 ? 'bg-primary-600' : 'bg-gray-300'
            } text-white font-bold`}>
              {step > idx + 1 ? <Check size={20} /> : idx + 1}
            </div>
            <div className="flex-1 h-1 mx-2 bg-gray-300">
              {step > idx + 1 && <div className="h-full bg-green-500"></div>}
            </div>
          </div>
        ))}
      </div>

      {/* Step 1: Input Form */}
      {step === 1 && (
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Tell Us About Your Business</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product or Service *
              </label>
              <input
                type="text"
                name="product"
                value={formData.product}
                onChange={handleInputChange}
                placeholder="e.g., Premium Coffee Beans, Fitness Coaching, Real Estate Services"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Niche/Industry *
              </label>
              <input
                type="text"
                name="niche"
                value={formData.niche}
                onChange={handleInputChange}
                placeholder="e.g., E-commerce, Health & Wellness, B2B Services"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Budget (USD) *
              </label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="e.g., $5,000"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience
              </label>
              <textarea
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                placeholder="Describe your ideal customer..."
                rows={3}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Goals
              </label>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleInputChange}
                placeholder="What do you want to achieve? (e.g., Generate 100 qualified leads per month)"
                rows={3}
                className="input-field"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!formData.product || !formData.niche || !formData.budget}
              className="btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Generation
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Generate */}
      {step === 2 && (
        <div className="card text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <Sparkles className="text-primary-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Ready to Create Your Campaign!</h2>
            <p className="text-gray-600">Our AI will analyze your business and generate a complete marketing campaign</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold mb-3">Your Campaign Will Include:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2"><Check className="text-green-500" size={20} /> Compelling ad copy & headlines</li>
              <li className="flex items-center gap-2"><Check className="text-green-500" size={20} /> Audience targeting strategy</li>
              <li className="flex items-center gap-2"><Check className="text-green-500" size={20} /> Multi-platform deployment plan</li>
              <li className="flex items-center gap-2"><Check className="text-green-500" size={20} /> Conversion optimization tactics</li>
            </ul>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-primary px-8 py-3 text-lg disabled:opacity-50"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <Sparkles className="animate-spin" size={20} />
                Generating Your Campaign...
              </span>
            ) : (
              'Generate Campaign with AI'
            )}
          </button>
        </div>
      )}

      {/* Step 3: Review & Deploy */}
      {step === 3 && generatedCampaign && (
        <div className="space-y-6">
          <div className="card bg-green-50 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <Check className="text-green-600" size={24} />
              <h2 className="text-2xl font-bold text-green-900">Campaign Generated Successfully!</h2>
            </div>
            <p className="text-green-700">Your AI-powered campaign is ready to deploy</p>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-4">Campaign Overview</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-gray-700 mb-2">Campaign Name</h4>
              <p className="text-gray-900">{generatedCampaign.name}</p>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-4">Ad Copy</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Headline</h4>
                <p className="text-lg font-medium text-gray-900">{generatedCampaign.adCopy.headline}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Body Text</h4>
                <p className="text-gray-900">{generatedCampaign.adCopy.body}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Call to Action</h4>
                <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold">
                  {generatedCampaign.adCopy.cta}
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-4">Targeting Strategy</h3>
            <div className="space-y-3">
              <p><span className="font-semibold">Demographics:</span> {generatedCampaign.targeting.demographics}</p>
              <p><span className="font-semibold">Platforms:</span> {generatedCampaign.targeting.platforms.join(', ')}</p>
              <p><span className="font-semibold">Budget:</span> {generatedCampaign.targeting.budget}/month</p>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-4">Recommended Strategy</h3>
            <ol className="space-y-2">
              {generatedCampaign.strategy.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setStep(1)} className="btn-secondary flex-1">
              Create Another Campaign
            </button>
            <button onClick={handleDeploy} className="btn-primary flex-1">
              Deploy Campaign
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CampaignCreator;



