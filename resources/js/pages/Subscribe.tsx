import { useState, FormEvent } from 'react';
import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/portfolio-layout';

export default function Subscribe() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        // Simple validation
        if (!email) {
            setError('Please enter your email address');
            return;
        }
        
        if (!email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }
        
        // In a real application, you would send this data to your server
        console.log('Subscription data:', { name, email });
        
        // Show success message
        setSubmitted(true);
        setError('');
    };

    return (
        <PortfolioLayout title="Subscribe to Our Newsletter">
            <div className="bg-background py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mx-auto max-w-3xl">
                        <h1 className="mb-8 text-4xl font-bold text-primary">Subscribe to Our Newsletter</h1>
                        
                        {submitted ? (
                            <div className="rounded-lg bg-green-50 p-6 text-center">
                                <h2 className="mb-4 text-2xl font-semibold text-green-700">Thank You for Subscribing!</h2>
                                <p className="mb-6 text-lg text-green-600">
                                    We've received your subscription request. You'll start receiving our newsletter soon.
                                </p>
                                <button
                                    onClick={() => {
                                        setSubmitted(false);
                                        setEmail('');
                                        setName('');
                                    }}
                                    className="rounded-md bg-green-600 px-6 py-3 text-white hover:bg-green-700"
                                >
                                    Subscribe Another Email
                                </button>
                            </div>
                        ) : (
                            <>
                                <p className="mb-8 text-lg text-card-foreground">
                                    Stay up-to-date with our latest articles, projects, and company news. Subscribe to our newsletter to receive updates directly in your inbox.
                                </p>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {error && (
                                        <div className="rounded-md bg-red-50 p-4 text-red-700">
                                            {error}
                                        </div>
                                    )}
                                    
                                    <div>
                                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-card-foreground">
                                            Name (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full rounded-md border border-border bg-background px-4 py-2 text-card-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-card-foreground">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full rounded-md border border-border bg-background px-4 py-2 text-card-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="your.email@example.com"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="consent"
                                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                                            required
                                        />
                                        <label htmlFor="consent" className="ml-2 text-sm text-card-foreground">
                                            I agree to receive marketing emails and can unsubscribe at any time.
                                        </label>
                                    </div>
                                    
                                    <button
                                        type="submit"
                                        className="rounded-md bg-primary px-6 py-3 text-white hover:bg-primary/90"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                                
                                <div className="mt-12 rounded-lg bg-card p-6">
                                    <h2 className="mb-4 text-xl font-semibold text-primary">What to Expect</h2>
                                    <ul className="list-inside list-disc space-y-2 text-card-foreground">
                                        <li>Latest blog posts and articles</li>
                                        <li>Portfolio updates and case studies</li>
                                        <li>Industry insights and trends</li>
                                        <li>Company news and announcements</li>
                                        <li>Special offers and promotions</li>
                                    </ul>
                                    <p className="mt-4 text-sm text-muted-foreground">
                                        We respect your privacy and will never share your information with third parties. You can unsubscribe at any time.
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}
