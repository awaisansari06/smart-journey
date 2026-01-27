import Link from 'next/link';
import React from 'react';

function FooterCallToAction() {
    return (
        <section className="bg-linear-to-r from-orange-500 via-pink-500 to-purple-600 py-20">
            <div className="mx-auto max-w-4xl px-6 text-center text-white">
                <h2 className="text-4xl font-bold">Ready to plan your next trip?</h2>
                <p className="mt-3 text-white/90 text-lg">
                    Join thousands of travelers who plan smarter with AI.
                </p>
                <div className="mt-8 flex justify-center">
                    <Link href="/create-new-trip">
                        <button className="rounded-full bg-white px-8 py-3 font-semibold text-black shadow-lg hover:opacity-95 hover:scale-105 transition-all">
                            Start Planning →
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default FooterCallToAction;
