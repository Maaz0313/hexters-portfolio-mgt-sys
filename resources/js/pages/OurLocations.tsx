import { Head } from '@inertiajs/react';
import PortfolioLayout from '@/layouts/portfolio-layout';

export default function OurLocations() {
    return (
        <PortfolioLayout title="Our Locations">
            <div className="bg-background py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="mb-8 text-4xl font-bold text-primary">Our Locations</h1>
                    
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-lg bg-card p-6 shadow-md">
                            <h2 className="mb-4 text-2xl font-semibold text-primary">Lahore, Pakistan</h2>
                            <p className="mb-4 text-card-foreground">
                                123 Main Street<br />
                                Lahore, Pakistan<br />
                                Phone: +92 311 846 5596<br />
                                Email: hexters2010@gmail.com
                            </p>
                            <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217897.19486578084!2d74.17411708385416!3d31.482635529201902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1652345678901!5m2!1sen!2s" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                        
                        <div className="rounded-lg bg-card p-6 shadow-md">
                            <h2 className="mb-4 text-2xl font-semibold text-primary">Remote Office</h2>
                            <p className="mb-4 text-card-foreground">
                                We have a global team working remotely from various locations around the world. Our team members collaborate across different time zones to provide the best service to our clients.
                            </p>
                            <p className="text-card-foreground">
                                Email: hexters2010@gmail.com<br />
                                Phone: +92 311 846 5596
                            </p>
                        </div>
                        
                        <div className="rounded-lg bg-card p-6 shadow-md">
                            <h2 className="mb-4 text-2xl font-semibold text-primary">Contact Hours</h2>
                            <p className="mb-4 text-card-foreground">
                                <strong>Monday - Friday:</strong><br />
                                9:00 AM - 6:00 PM (Pakistan Standard Time)
                            </p>
                            <p className="mb-4 text-card-foreground">
                                <strong>Saturday:</strong><br />
                                10:00 AM - 2:00 PM (Pakistan Standard Time)
                            </p>
                            <p className="text-card-foreground">
                                <strong>Sunday:</strong><br />
                                Closed
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-12">
                        <h2 className="mb-6 text-3xl font-semibold text-primary">Get in Touch</h2>
                        <p className="mb-8 text-lg text-card-foreground">
                            Have a question or want to discuss a project? Feel free to reach out to us using the contact information above or visit our <a href="/contact" className="text-primary underline">Contact page</a>.
                        </p>
                    </div>
                </div>
            </div>
        </PortfolioLayout>
    );
}
