import React from 'react';
import ContactManager from '../components/ContactManager'; // Adjust the path as needed

export default function ContactManagerPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="container mx-auto">
                <ContactManager />
            </div>
        </div>
    );
}
